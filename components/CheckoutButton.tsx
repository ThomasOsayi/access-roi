"use client";

import { useState } from "react";

export default function CheckoutButton({
  label = "Pre-Order Now, $29",
  className = "btn-primary",
  style,
}: {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned");
        setLoading(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={className}
      style={{ ...style, opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer" }}
    >
      {loading ? "Redirecting..." : label}
      {!loading && (
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
      )}
    </button>
  );
}