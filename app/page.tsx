import Link from "next/link";
import Ticker from "@/components/Ticker";

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-kicker eyebrow">
                For students who want the math, not the marketing
              </div>
              <h1>
                Don&apos;t go to college
                <br />
                <span className="italic serif">blind.</span>
              </h1>
              <p className="hero-sub">
                Before you sign a $200K promissory note, run the numbers. Access
                ROI is the field guide to picking an education path that actually
                pays — built for the kitchen table, not the admissions brochure.
              </p>
              <div className="hero-cta-row">
                <Link href="/ebook" className="btn-primary">
                  Pre-Order the E-Book
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
                <Link href="/join" className="btn-secondary">
                  Join the interest list
                </Link>
              </div>
              <div className="hero-trust">
                <div className="hero-trust-item">
                  <div className="hero-trust-num">214</div>
                  <div className="hero-trust-label">Pages · 6 chapters</div>
                </div>
                <div className="hero-trust-item">
                  <div className="hero-trust-num">$29</div>
                  <div className="hero-trust-label">Pre-order price</div>
                </div>
                <div className="hero-trust-item">
                  <div className="hero-trust-num">Q2 &apos;26</div>
                  <div className="hero-trust-label">Ships this spring</div>
                </div>
              </div>
            </div>

            {/* 3D BOOK MOCKUP */}
            <div className="book-wrap">
              <div className="book">
                <div className="preorder-badge">Pre-Order Live</div>
                <div className="book-pages" />
                <div className="book-cover">
                  <div className="book-eyebrow">The Access ROI Playbook</div>
                  <div>
                    <div className="book-title">
                      Know
                      <br />
                      Before
                      <br />
                      You <span className="italic">Owe.</span>
                    </div>
                    <div className="book-sub">
                      A FIELD GUIDE · 214 PAGES · 2026 ED.
                    </div>
                  </div>
                  <div className="book-author">
                    <div className="book-author-label">Written By</div>
                    <div className="book-author-name">The Access ROI Team</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TICKER ============ */}
      <Ticker />

      {/* ============ STATS ============ */}
      <section className="stats">
        <div className="container">
          <div className="stats-head">
            <div className="eyebrow" style={{ color: "var(--green-deep)" }}>
              The Problem
            </div>
            <h2>
              They hand you a catalog.
              <br />
              They should hand you a{" "}
              <span className="underline">spreadsheet</span>.
            </h2>
            <p>
              Most students pick a school before they ever see the numbers. The
              bill comes due anyway.
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-cell">
              <div className="stat-num">
                $1.74<span className="accent">T</span>
              </div>
              <div className="stat-label">
                Total U.S. student loan debt outstanding
              </div>
              <div className="stat-source">Federal Reserve · 2025</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">
                43.2<span className="accent">M</span>
              </div>
              <div className="stat-label">
                Americans carrying federal student loans
              </div>
              <div className="stat-source">Dept. of Education</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">
                40<span className="accent">%</span>
              </div>
              <div className="stat-label">
                Undergrads who never finish their degree
              </div>
              <div className="stat-source">NCES Longitudinal Study</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">
                $37<span className="accent">K</span>
              </div>
              <div className="stat-label">
                Average debt per graduating borrower
              </div>
              <div className="stat-source">Education Data Initiative</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THREE PATHS ============ */}
      <section className="paths">
        <div className="container">
          <div className="paths-head">
            <div className="eyebrow" style={{ color: "var(--green)" }}>
              Three Ways In
            </div>
            <h2>
              Pick your <span className="italic">entry point.</span>
            </h2>
            <p>
              Whether you&apos;re pre-ordering the book, repping the philosophy,
              or booking a 1:1 — start where it fits.
            </p>
          </div>
          <div className="paths-grid">
            <Link href="/ebook" className="path-card">
              <div className="path-tag">01 · Primary</div>
              <div className="path-icon">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 4H20V20H4V4Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M4 8H20"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M8 4V20"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>
              <h3>Pre-Order the E-Book</h3>
              <p>
                214 pages. Six chapters. Every worksheet you need to run your own
                ROI before you sign a loan. $29 for launch, hosted on Gumroad —
                instant delivery when it ships.
              </p>
              <span className="path-link">
                Pre-order now{" "}
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
              </span>
            </Link>

            <Link href="/shop" className="path-card">
              <div className="path-tag">02 · Merch</div>
              <div className="path-icon">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 4L4 7V20H20V7L18 4H6Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3>Shop the Merch</h3>
              <p>
                Assets over Liabilities. Options over Obligations. Wear the
                philosophy. Printed on-demand — every piece ships direct, no
                inventory games.
              </p>
              <span className="path-link">
                View the drop{" "}
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
              </span>
            </Link>

            <Link href="/session" className="path-card">
              <div className="path-tag">03 · 1:1</div>
              <div className="path-icon">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M14 20V18C14 15.7909 11.3137 14 8 14C4.68629 14 2 15.7909 2 18V20"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 11L18 13L22 9"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Book a 1:1 Session</h3>
              <p>
                Skip the DMs. Book a 45-minute strategy call to walk through
                your actual numbers — schools, majors, aid offers — and leave
                with a ranked decision matrix.
              </p>
              <span className="path-link">
                See availability{" "}
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
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ MANIFESTO ============ */}
      <section className="manifesto">
        <div className="container">
          <div className="manifesto-inner">
            <div className="manifesto-mark">
              <span className="line" />
              <span>The Philosophy</span>
              <span className="line" />
            </div>
            <h2>
              <span className="italic serif">Options</span>{" "}
              <span className="pill">over</span>
              <br />
              <span className="serif">Obligations.</span>
            </h2>
            <p className="manifesto-body">
              An obligation is a path you took because someone told you to. An
              option is one you took because the numbers worked.{" "}
              <span className="em">
                We&apos;re not anti-college — we&apos;re anti-guessing.
              </span>{" "}
              The goal isn&apos;t to talk you out of your dream school;
              it&apos;s to make sure it&apos;s actually a dream and not a
              30-year IOU.
            </p>
            <Link href="/ebook" className="btn-ink">
              Start with the E-Book
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
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="final-cta">
        <div className="container">
          <div className="final-cta-inner">
            <div
              className="eyebrow"
              style={{ color: "var(--green)", marginBottom: "1.5rem" }}
            >
              Your move
            </div>
            <h2>
              Before you pick a school,
              <br />
              pick a <span className="italic">number.</span>
            </h2>
            <p>
              Be first in line when the e-book drops. Pre-order now and lock in
              the launch price — we&apos;ll email you the moment it&apos;s live.
            </p>
            <div className="final-cta-buttons">
              <Link href="/ebook" className="btn-primary">
                Pre-Order — $29
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
              <Link href="/join" className="btn-secondary">
                Or just join the list
              </Link>
            </div>
            <div className="final-cta-note">
              Instant PDF on launch · 30-day money back · Launch price ends at
              drop
            </div>
          </div>
        </div>
      </section>
    </>
  );
}