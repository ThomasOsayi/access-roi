import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're In — Access ROI",
  description: "Your pre-order is confirmed.",
};

export default function SuccessPage() {
  return (
    <section className="success-page">
      <div className="container">
        <div className="success-inner">
          <div className="success-icon">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <path
                d="M8 18L15 25L28 11"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1>
            You&apos;re <span className="italic">in.</span>
          </h1>
          <p className="success-sub">
            Your pre-order is confirmed. We&apos;ll email you the PDF the
            second the book goes live. Check your inbox for a receipt from
            Stripe.
          </p>
          <div className="success-details">
            <div className="success-detail">
              <span className="success-label">What you bought</span>
              <span>Know Before You Owe, E-Book</span>
            </div>
            <div className="success-detail">
              <span className="success-label">Price</span>
              <span>$29.00 (launch price)</span>
            </div>
            <div className="success-detail">
              <span className="success-label">Delivery</span>
              <span>PDF via email, Q2 2026</span>
            </div>
          </div>
          <div className="success-actions">
            <Link href="/" className="btn-primary">
              Back to Home
              <svg
                className="arrow"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M1 7H13M13 7L7 1M13 7L7 13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
            <Link href="/shop" className="btn-secondary" style={{ color: "var(--ink)", borderColor: "var(--ink)" }}>
              Browse the Merch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}