import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentIntentId = searchParams.get("payment_intent");

  if (!paymentIntentId) {
    return NextResponse.json(
      { error: "Missing payment_intent" },
      { status: 400 }
    );
  }

  try {
    // Expand latest_charge so we can read billing_details
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ["latest_charge"],
    });
    const charge = paymentIntent.latest_charge as Stripe.Charge | null;
    const billing = charge?.billing_details;

    return NextResponse.json({
      status: paymentIntent.status,
      email: billing?.email || paymentIntent.receipt_email || null,
      name: billing?.name || null,
      amount: paymentIntent.amount / 100,
    });
  } catch (error) {
    console.error("Confirm error:", error);
    return NextResponse.json(
      { error: "Failed to confirm payment" },
      { status: 500 }
    );
  }
}
