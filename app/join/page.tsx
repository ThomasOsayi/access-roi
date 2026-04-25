import type { Metadata } from "next";
import Link from "next/link";
import InterestForm from "@/components/InterestForm";

export const metadata: Metadata = {
  title: "Join the List — Access ROI",
  description:
    "Get first access when the e-book drops, a free sample chapter, and early merch drop notifications.",
};

export default function JoinPage() {
  return (
    <section className="join-section">
      <div className="container">
        <nav className="crumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <span style={{ color: "var(--green)" }}>Join the List</span>
        </nav>
        <div className="join-grid">
          <div className="join-content">
            <div className="eyebrow join-eyebrow">The Interest List</div>
            <h1>
              Get on the
              <br />
              <span className="italic">list.</span>
            </h1>
            <p>
              Not ready to pre-order? Cool. Drop your info and we&apos;ll keep
              you in the loop, with new chapters, merch drops, free worksheets,
              and
              first access when the e-book goes live.
            </p>

            <div className="join-perks">
              <div className="perk">
                <div className="perk-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M3 6L10 11L17 6M3 5H17C17.5523 5 18 5.44772 18 6V14C18 14.5523 17.5523 15 17 15H3C2.44772 15 2 14.5523 2 14V6C2 5.44772 2.44772 5 3 5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="perk-body">
                  <h4>First access at launch</h4>
                  <p>
                    Know the second the e-book goes live, before anyone else.
                  </p>
                </div>
              </div>
              <div className="perk">
                <div className="perk-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M14 2L18 6M18 6L14 10M18 6H6C3.79086 6 2 7.79086 2 10V14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="perk-body">
                  <h4>Free sample chapter</h4>
                  <p>
                    We&apos;ll send Chapter 1, &quot;The Sticker Price Lie,&quot;
                    straight to your inbox.
                  </p>
                </div>
              </div>
              <div className="perk">
                <div className="perk-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="14"
                      height="14"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7 10L9 12L13 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="perk-body">
                  <h4>Early drop access</h4>
                  <p>
                    Merch drops and limited runs, and you get the heads up 24
                    hours early.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <InterestForm />
        </div>
      </div>
    </section>
  );
}