import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    return decoded.includes(process.env.ADMIN_PASSWORD!);
  } catch {
    return false;
  }
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Expand charges so we can read billing_details
    const payments = await stripe.paymentIntents.list({
      limit: 100,
      expand: ["data.latest_charge"],
    });

    const completedPayments = payments.data.filter(
      (p) => p.status === "succeeded"
    );

    const sales = completedPayments.map((p) => {
      const charge = p.latest_charge as Stripe.Charge | null;
      const billing = charge?.billing_details;
      return {
        id: p.id,
        amount: p.amount / 100,
        currency: p.currency,
        status: p.status,
        email: billing?.email || p.receipt_email || "—",
        name: billing?.name || p.shipping?.name || "—",
        created: new Date(p.created * 1000).toISOString(),
        description: p.description || "E-Book Pre-Order",
      };
    });

    // Calculate metrics
    const totalRevenue = completedPayments.reduce(
      (sum, p) => sum + p.amount / 100,
      0
    );
    const orderCount = completedPayments.length;

    // This week's revenue
    const oneWeekAgo = Date.now() / 1000 - 7 * 24 * 60 * 60;
    const thisWeekPayments = completedPayments.filter(
      (p) => p.created > oneWeekAgo
    );
    const thisWeekRevenue = thisWeekPayments.reduce(
      (sum, p) => sum + p.amount / 100,
      0
    );
    const thisWeekOrders = thisWeekPayments.length;

    // Revenue by day (last 7 days)
    const revenueByDay: { date: string; amount: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStr = date.toISOString().split("T")[0];
      const dayLabel = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayTotal = completedPayments
        .filter((p) => {
          const pDate = new Date(p.created * 1000)
            .toISOString()
            .split("T")[0];
          return pDate === dayStr;
        })
        .reduce((sum, p) => sum + p.amount / 100, 0);
      revenueByDay.push({ date: dayLabel, amount: dayTotal });
    }

    return NextResponse.json({
      sales,
      metrics: {
        totalRevenue,
        orderCount,
        thisWeekRevenue,
        thisWeekOrders,
      },
      revenueByDay,
    });
  } catch (error) {
    console.error("Sales fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch sales data" },
      { status: 500 }
    );
  }
}