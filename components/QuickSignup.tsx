"use client";

import { useState } from "react";
import Link from "next/link";

export default function QuickSignup() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          source: "quick-signup",
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setSubmitted(true);
    } catch {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="qs-success">
        <div className="qs-success-icon">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M4 11L9 16L18 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h4>You&apos;re on the list.</h4>
          <p>Check your inbox for Chapter 1.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="qs-form" onSubmit={handleSubmit}>
      <div className="qs-fields">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="qs-input"
        />
        <input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="qs-input"
        />
        <button
          type="submit"
          className="qs-submit"
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "..." : "Join"}
          {!loading && (
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7H13M13 7L7 1M13 7L7 13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="qs-footer">
        <span>No spam · Unsubscribe any time</span>
        <Link href="/join" className="qs-more-link">
          Want to tell us more? →
        </Link>
      </div>
    </form>
  );
}