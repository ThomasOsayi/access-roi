"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/ebook/success`,
        payment_method_data: {
          billing_details: {
            name,
            email,
          },
        },
      },
    });

    if (submitError) {
      setError(submitError.message || "Payment failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="pf-field">
        <label className="pf-label" htmlFor="pf-name">
          Full name
        </label>
        <input
          id="pf-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jordan Smith"
          required
          className="pf-input"
        />
      </div>

      <div className="pf-field">
        <label className="pf-label" htmlFor="pf-email">
          Email
        </label>
        <input
          id="pf-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          className="pf-input"
        />
        <span className="pf-hint">Receipt and PDF download link sent here</span>
      </div>

      <div className="pf-field">
        <label className="pf-label">Payment details</label>
        <div className="pf-stripe-wrap">
          <PaymentElement
            options={{
              layout: "tabs",
            }}
          />
        </div>
      </div>

      {error && <div className="pf-error">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="pf-submit"
      >
        {loading ? (
          <span className="pf-loading">
            <svg className="pf-spinner" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="31.4 31.4"
              />
            </svg>
            Processing...
          </span>
        ) : (
          <>
            Pay $29.00
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7H13M13 7L7 1M13 7L7 13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </>
        )}
      </button>

      <div className="pf-footer">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M11 7V5.5C11 3.567 9.433 2 7.5 2C5.567 2 4 3.567 4 5.5V7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
          <rect x="3" y="7" width="10" height="8" rx="1" fill="currentColor" />
        </svg>
        256-bit encryption · Powered by Stripe
      </div>
    </form>
  );
}

export default function CustomCheckout() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);

  if (!clientSecret && !loadError) {
    fetch("/api/checkout", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setLoadError(true);
        }
      })
      .catch(() => setLoadError(true));
  }

  if (loadError) {
    return (
      <div className="pf-load-error">
        <p>Unable to load payment form. Please refresh or try again later.</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="pf-loading-state">
        <svg className="pf-spinner" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="31.4 31.4"
          />
        </svg>
        <span>Loading secure checkout...</span>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#00D26A",
            colorBackground: "#0E3033",
            colorText: "#F5F1E8",
            colorTextSecondary: "#D8D1BC",
            colorTextPlaceholder: "rgba(216, 209, 188, 0.4)",
            colorDanger: "#C85835",
            fontFamily: "'Archivo', sans-serif",
            fontSizeBase: "0.9375rem",
            borderRadius: "4px",
            spacingUnit: "4px",
          },
          rules: {
            ".Input": {
              border: "1px solid #1A4448",
              padding: "0.85rem 1rem",
              transition: "border-color 0.2s, box-shadow 0.2s",
            },
            ".Input:focus": {
              borderColor: "#00D26A",
              boxShadow: "0 0 0 3px rgba(0, 210, 106, 0.1)",
            },
            ".Tab": {
              border: "1px solid #1A4448",
              backgroundColor: "#0E3033",
            },
            ".Tab:hover": {
              borderColor: "rgba(245, 241, 232, 0.2)",
            },
            ".Tab--selected": {
              borderColor: "#00D26A",
              backgroundColor: "rgba(0, 210, 106, 0.08)",
            },
            ".Label": {
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#D8D1BC",
            },
          },
        },
      }}
    >
      <PaymentForm />
    </Elements>
  );
}