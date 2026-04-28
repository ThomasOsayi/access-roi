import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2900,
      currency: "usd",
      description: "Know Before You Owe — E-Book Pre-Order",
      metadata: {
        product: "ebook-preorder",
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}