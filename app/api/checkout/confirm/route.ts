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
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return NextResponse.json({
      status: paymentIntent.status,
      email: paymentIntent.receipt_email || paymentIntent.shipping?.name || null,
      name: paymentIntent.shipping?.name || null,
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
