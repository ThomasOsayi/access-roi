"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);

  useEffect(() => {
    async function recordPreorder() {
      if (!paymentIntentId) {
        setStatus("error");
        return;
      }

      try {
        // Confirm payment + get customer info from Stripe via API route
        const res = await fetch(
          `/api/checkout/confirm?payment_intent=${paymentIntentId}`
        );

        if (!res.ok) {
          setStatus("error");
          return;
        }

        const data = await res.json();

        if (data.status !== "succeeded") {
          setStatus("error");
          return;
        }

        setCustomerEmail(data.email);

        // Add to signups list with source: "preorder"
        // Guard against duplicates by storing payment ID — if user refreshes, we skip
        const alreadyRecorded = sessionStorage.getItem(
          `preorder_recorded_${paymentIntentId}`
        );

        if (!alreadyRecorded && data.email) {
          await addDoc(collection(db, "signups"), {
            firstName: data.name?.split(" ")[0] || "",
            lastName: data.name?.split(" ").slice(1).join(" ") || "",
            email: data.email,
            role: "",
            stage: "",
            interests: ["ebook"],
            source: "preorder",
            createdAt: serverTimestamp(),
          });
          sessionStorage.setItem(`preorder_recorded_${paymentIntentId}`, "1");
        }

        setStatus("success");
      } catch (err) {
        console.error("Success page error:", err);
        setStatus("error");
      }
    }

    recordPreorder();
  }, [paymentIntentId]);

  return (
    <section className="success-page">
      <div className="container">
        {status === "loading" && (
          <div className="success-card">
            <div className="admin-spinner" />
            <p>Confirming your order...</p>
          </div>
        )}

        {status === "success" && (
          <div className="success-card">
            <div className="success-icon">
              <svg width="40" height="40" viewBox="0 0 28 28" fill="none">
                <path
                  d="M6 14L12 20L22 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1>
              You&apos;re <span className="italic">in.</span>
            </h1>
            <p className="success-lead">
              Your pre-order is confirmed. We just sent a receipt to{" "}
              <strong>{customerEmail || "your email"}</strong>.
            </p>
            <div className="success-next">
              <h3>What happens now</h3>
              <ul>
                <li>You&apos;ll get the PDF the moment it launches.</li>
                <li>Free updates for life — no extra charges.</li>
                <li>You&apos;re on the list for launch-day bonuses.</li>
              </ul>
            </div>
            <div className="success-actions">
              <Link href="/" className="btn-primary">
                Back to home
              </Link>
              <Link href="/ebook" className="btn-secondary">
                E-book details
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="success-card">
            <h1>Something went wrong.</h1>
            <p>
              We couldn&apos;t confirm your order. If you were charged, your
              payment is safe — please email us and we&apos;ll sort it out.
            </p>
            <Link href="/ebook" className="btn-primary">
              Back to e-book
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="success-page" />}>
      <SuccessContent />
    </Suspense>
  );
}