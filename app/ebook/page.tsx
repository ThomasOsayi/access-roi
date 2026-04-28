import type { Metadata } from "next";
import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";

export const metadata: Metadata = {
  title: "Know Before You Owe — The Access ROI E-Book",
  description:
    "214 pages, 6 chapters, every worksheet you need to run your own ROI before you sign a student loan. Pre-order for $29.",
};

export default function EbookPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="ebook-hero">
        <div className="container">
          <nav className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span style={{ color: "var(--green)" }}>The E-Book</span>
          </nav>
          <div className="ebook-grid">
            {/* BOOK MOCKUP */}
            <div className="book-wrap">
              <div className="book">
                <div className="preorder-badge">Pre-Order Live</div>
                <div className="book-pages" />
                <img
                  src="/products/ebook-cover.jpg"
                  alt="College Survival Guide — Access ROI E-Book"
                  className="book-cover-img"
                />
              </div>
            </div>

            {/* PRICE CARD */}
            <div className="ebook-content">
              <div className="eyebrow ebook-eyebrow-header">
                The Playbook · 214 Pages · 6 Chapters
              </div>
              <h1>
                Know
                <br />
                Before You <span className="italic">Owe.</span>
              </h1>
              <p>
                A field guide to running the numbers on your education, built
                from real student cases, BLS salary data, and aid-letter
                translations. No fluff. No brochures. Just the math you
                should&apos;ve seen before you signed anything.
              </p>

              <div className="price-card">
                <div className="price-top">
                  <div className="price-left">
                    <span className="price-amount">$29</span>
                    <span className="price-strike">$49</span>
                    <span className="price-tag">Launch −40%</span>
                  </div>
                  <div className="price-note">Pre-order · Ships Q2 2026</div>
                </div>
                <div className="price-features">
                  <div className="price-feat">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M3 9L7 13L15 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Instant PDF delivery on launch day
                  </div>
                  <div className="price-feat">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M3 9L7 13L15 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    6 downloadable worksheets included
                  </div>
                  <div className="price-feat">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M3 9L7 13L15 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Free updates for life
                  </div>
                  <div className="price-feat">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M3 9L7 13L15 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    30-day money-back guarantee
                  </div>
                </div>
                <CheckoutButton
                  label="Pre-Order Now, $29"
                  style={{ width: "100%", justifyContent: "center" }}
                />
                <div className="gumroad-note">
                  Secure checkout · Powered by Stripe
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY ============ */}
      <section className="why">
        <div className="container">
          <div className="why-head">
            <div className="eyebrow" style={{ color: "var(--green-deep)" }}>
              Why This Book Exists
            </div>
            <h2>
              Three things no one
              <br />
              tells you <span className="italic">in high school.</span>
            </h2>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-num">01</div>
              <h3>Sticker price is fiction.</h3>
              <p>
                The number on the brochure isn&apos;t what you&apos;ll pay, but
                most students never learn how to read the real aid letter until
                it&apos;s too late to negotiate.
              </p>
            </div>
            <div className="why-card">
              <div className="why-num">02</div>
              <h3>Your major matters more than your school.</h3>
              <p>
                Two students at the same university graduate with a 4x salary
                gap. The difference isn&apos;t prestige, it&apos;s the major.
                We show you the math.
              </p>
            </div>
            <div className="why-card">
              <div className="why-num">03</div>
              <h3>Break-even is a real number.</h3>
              <p>
                Every path has a year where the degree pays for itself. If that
                year is 12, 18, or never, you deserve to know before you sign.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CHAPTERS ============ */}
      <section className="chapters">
        <div className="container">
          <div className="chapters-head">
            <div className="eyebrow" style={{ color: "var(--green)" }}>
              What&apos;s Inside
            </div>
            <h2>
              Six chapters.
              <br />
              Every <span className="italic">worksheet</span> you need.
            </h2>
            <p>
              Each chapter ends with a fill-in-the-blank worksheet you can walk
              through with your parents at the kitchen table.
            </p>
          </div>

          <ul className="chapter-list">
            {[
              {
                num: "CH 01",
                title: "The Sticker Price Lie",
                desc: "How to read a real aid letter, and negotiate it up.",
                pages: "p. 12 to 36",
              },
              {
                num: "CH 02",
                title: "Majors by the Numbers",
                desc: "Starting salary vs. ceiling, every major benchmarked against BLS data.",
                pages: "p. 38 to 72",
              },
              {
                num: "CH 03",
                title: "The Break-Even Framework",
                desc: "The formula that tells you exactly when your degree pays for itself.",
                pages: "p. 74 to 106",
              },
              {
                num: "CH 04",
                title: "State School, Trade School, or Skip",
                desc: "Every alternative path ranked by 10-year earnings potential.",
                pages: "p. 108 to 144",
              },
              {
                num: "CH 05",
                title: "Negotiating Aid, Yes, You Can",
                desc: "Scripts, templates, and timing for the conversation no one teaches.",
                pages: "p. 146 to 186",
              },
              {
                num: "CH 06",
                title: "The 10-Year Letter",
                desc: "Why to write a letter to your future self before you sign anything.",
                pages: "p. 188 to 214",
              },
            ].map((ch) => (
              <li key={ch.num} className="chapter-row">
                <div className="chapter-num">{ch.num}</div>
                <div className="chapter-body">
                  <h4 className="chapter-title">{ch.title}</h4>
                  <p>{ch.desc}</p>
                </div>
                <div className="chapter-pages">{ch.pages}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="faq">
        <div className="container">
          <div className="faq-head">
            <div className="eyebrow" style={{ color: "var(--green-deep)" }}>
              Pre-Order FAQ
            </div>
            <h2>
              Common <span className="italic">questions.</span>
            </h2>
          </div>
          <div className="faq-list">
            {[
              {
                q: "When will I get the e-book?",
                a: "The e-book ships in Q2 2026. You'll get an email with your download link the moment it's live, no need to check back, no spam.",
              },
              {
                q: "Why pre-order if it's not ready?",
                a: "Pre-orders lock in the launch price ($29 vs. the regular $49) and make sure you're first in line when it drops. Plus, it helps us know how many copies to prep, a real vote of confidence.",
              },
              {
                q: "What if I change my mind?",
                a: "Full refund, any time before launch, no questions asked. After launch, you still get a 30-day money-back guarantee.",
              },
              {
                q: "Is this only for students in the U.S.?",
                a: "The frameworks (break-even, ROI, major-to-salary) apply anywhere. The specific aid-letter and tuition numbers are U.S.-focused, but international readers have found it useful.",
              },
              {
                q: 'Do I need to be "good at math"?',
                a: "No. Every formula in the book is explained in plain English first, then shown with numbers. If you can run a budget, you can run an ROI calc.",
              },
              {
                q: "What format is the book?",
                a: "PDF on launch, designed for reading on both phone and desktop. Printable worksheets included. EPUB version coming shortly after.",
              },
            ].map((item) => (
              <details key={item.q} className="faq-item">
                <summary className="faq-q">{item.q}</summary>
                <div className="faq-a">{item.a}</div>
              </details>
            ))}
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
              Lock It In
            </div>
            <h2>
              $29 now. $49 at launch.
              <br />
              Your <span className="italic">move.</span>
            </h2>
            <p>
              Pre-order closes when the book ships. After that, the price goes
              up. Everyone who pre-orders gets the PDF the second it&apos;s
              live.
            </p>
            <div className="final-cta-buttons">
              <CheckoutButton label="Pre-Order, $29" />
              <Link href="/join" className="btn-secondary">
                Not ready? Join the list
              </Link>
            </div>
            <div className="final-cta-note">
              Instant PDF on launch · 30-day money back · Secure checkout via
              Stripe
            </div>
          </div>
        </div>
      </section>
    </>
  );
}