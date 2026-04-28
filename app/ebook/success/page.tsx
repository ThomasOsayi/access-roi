import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're In — Access ROI",
  description: "Your pre-order is confirmed.",
};

export default function SuccessPage() {
  return (
    <div className="sp-bg">
      <section className="sp-page">
        {/* CHECKMARK */}
        <div className="sp-check-ring">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M10 20L17 27L30 13"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* HEADLINE */}
        <div className="sp-headline">
          <h1>
            You&apos;re <span className="sp-green">in.</span>
          </h1>
        </div>
        <p className="sp-sub">
          Your pre-order is locked. We&apos;ll email you the PDF the second the
          book goes live. A receipt from Stripe is already in your inbox.
        </p>

        {/* ORDER CARD */}
        <div className="sp-card">
          <div className="sp-card-header">
            <div className="sp-card-tag">Order Confirmed</div>
          </div>
          <div className="sp-card-product">
            <div className="sp-book-mini">
              <span>Know Before You Owe</span>
            </div>
            <div className="sp-product-info">
              <h3>Know Before You Owe</h3>
              <p>E-Book Pre-Order · 214 pages · PDF</p>
            </div>
            <div className="sp-product-price">$29</div>
          </div>
          <div className="sp-card-details">
            <div className="sp-detail-row">
              <span className="sp-detail-label">Format</span>
              <span className="sp-detail-value">PDF + 6 worksheets</span>
            </div>
            <div className="sp-detail-row">
              <span className="sp-detail-label">Delivery</span>
              <span className="sp-detail-value">
                Email on launch, Q2 2026
              </span>
            </div>
            <div className="sp-detail-row">
              <span className="sp-detail-label">Guarantee</span>
              <span className="sp-detail-value sp-detail-green">
                30-day money back
              </span>
            </div>
          </div>
        </div>

        {/* WHAT HAPPENS NEXT */}
        <div className="sp-next">
          <div className="sp-next-title">What happens next</div>
          <div className="sp-steps-row">
            <div className="sp-step">
              <div className="sp-step-num">01</div>
              <h4>Check your inbox</h4>
              <p>A receipt from Stripe just landed. Save it.</p>
            </div>
            <div className="sp-step">
              <div className="sp-step-num">02</div>
              <h4>We finish the book</h4>
              <p>
                Final edits are underway. You&apos;re in the first batch.
              </p>
            </div>
            <div className="sp-step">
              <div className="sp-step-num">03</div>
              <h4>PDF hits your email</h4>
              <p>Launch day, instant delivery. No action needed from you.</p>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="sp-actions">
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
          <Link href="/shop" className="sp-btn-outline">
            Browse the Merch
          </Link>
        </div>

        <div className="sp-footer-note">
          Questions? Reach out at hello@accessroi.com
        </div>
      </section>
    </div>
  );
}