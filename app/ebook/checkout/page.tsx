import type { Metadata } from "next";
import Link from "next/link";
import CustomCheckout from "@/components/EmbeddedCheckout";

export const metadata: Metadata = {
  title: "Checkout — Access ROI",
  description: "Complete your pre-order for Know Before You Owe.",
};

export default function CheckoutPage() {
  return (
    <section className="checkout-page">
      <div className="container">
        <nav className="crumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/ebook">E-Book</Link>
          <span>/</span>
          <span style={{ color: "var(--green)" }}>Checkout</span>
        </nav>
        <div className="checkout-grid">
          <div className="checkout-summary">
            <div className="eyebrow checkout-summary-eyebrow">
              Your Order
            </div>
            <h1>
              Almost <span className="italic">there.</span>
            </h1>

            <div className="checkout-item">
              <div className="checkout-item-info">
                <h3>Know Before You Owe</h3>
                <p>E-Book Pre-Order · 214 pages · PDF</p>
              </div>
              <div className="checkout-item-price">$29</div>
            </div>

            <div className="checkout-perks">
              <div className="checkout-perk">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L7 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Instant PDF on launch day
              </div>
              <div className="checkout-perk">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L7 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                6 worksheets included
              </div>
              <div className="checkout-perk">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L7 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Free updates for life
              </div>
              <div className="checkout-perk">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L7 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                30-day money-back guarantee
              </div>
            </div>

            <div className="checkout-secure">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11 7V5.5C11 3.567 9.433 2 7.5 2C5.567 2 4 3.567 4 5.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                <rect x="3" y="7" width="10" height="8" rx="1" fill="currentColor" />
              </svg>
              Secure checkout powered by Stripe
            </div>
          </div>

          <div className="checkout-form-wrap">
            <CustomCheckout />
          </div>
        </div>
      </div>
    </section>
  );
}