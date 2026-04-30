import type { Metadata } from "next";
import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";

export const metadata: Metadata = {
  title: "College Survival Guide — Access ROI E-Book",
  description:
    "A practical framework for making smarter college decisions through cost, tradeoffs, and return on investment. Pre-order for $29.",
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
                The Playbook · E-Book Version
              </div>
              <h1>
                College
                <br />
                Survival <span className="italic">Guide.</span>
              </h1>
              <p>
                A practical framework for making smarter college decisions
                through cost, tradeoffs, and return on investment. Written by
                MyLék McDowell, MBA — Founder of Access ROI.
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
                      <path d="M3 9L7 13L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Instant PDF delivery on launch day
                  </div>
                  <div className="price-feat">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9L7 13L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Resource directory included
                  </div>
                  <div className="price-feat">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9L7 13L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Free updates for life
                  </div>
                  <div className="price-feat">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9L7 13L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
              <h3>The system is working as designed.</h3>
              <p>
                It&apos;s not broken — it&apos;s built to keep you uninformed.
                This book pulls back the curtain on how college pricing
                actually works.
              </p>
            </div>
            <div className="why-card">
              <div className="why-num">02</div>
              <h3>Five numbers decide your future.</h3>
              <p>
                Not your GPA, not your essays. Five financial numbers that
                actually determine whether college pays off. Most students
                never see them.
              </p>
            </div>
            <div className="why-card">
              <div className="why-num">03</div>
              <h3>You can negotiate — and win.</h3>
              <p>
                There&apos;s a script for the conversation no one teaches you.
                This book hands it to you, with timing moves that can cut
                your bill in half.
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
              The full <span className="italic">table of contents.</span>
            </h2>
            <p>
              Every chapter is built to give you a clear, actionable edge
              in the college decision.
            </p>
          </div>

          <ul className="chapter-list">
            {[
              {
                num: "Foreword",
                title: "Before We Begin",
                desc: "Setting the stage for a smarter approach to the biggest financial decision of your life.",
              },
              {
                num: "Mission",
                title: "Why I Wrote This For You",
                desc: "The personal story behind Access ROI and why this information can't wait.",
              },
              {
                num: "CH 01",
                title: "The System Is Not Broken, It's Working Exactly As Designed",
                desc: "How the college pricing machine actually works — and why it depends on you not knowing.",
              },
              {
                num: "CH 02",
                title: "The Five Numbers That Actually Decide Your Financial Future",
                desc: "Forget GPA and rankings. These are the numbers that determine whether college pays off.",
              },
              {
                num: "CH 03",
                title: "The Negotiation Script They Don't Want You To Have",
                desc: "Word-for-word scripts and strategies for the financial aid conversation no one teaches.",
              },
              {
                num: "CH 04",
                title: "Four Timing Moves That Can Cut Your College Bill in Half — Legally",
                desc: "Strategic timing decisions that can save you tens of thousands without cutting corners.",
              },
              {
                num: "CH 05",
                title: "Graduate With Options, Not Obligations",
                desc: "How to structure your college path so you leave with freedom, not a 30-year IOU.",
              },
              {
                num: "Next Step",
                title: "The Knowledge Is Yours. Now Use It.",
                desc: "Your action plan for putting everything in this book to work starting today.",
              },
              {
                num: "Resources",
                title: "Every Tool, Website, and Program In One Place",
                desc: "A complete directory of calculators, aid programs, negotiation templates, and more.",
              },
              {
                num: "Glossary",
                title: "Terms You Need to Know",
                desc: "Every financial aid and college planning term explained in plain English.",
              },
            ].map((ch) => (
              <li key={ch.num} className="chapter-row">
                <div className="chapter-num">{ch.num}</div>
                <div className="chapter-body">
                  <h4 className="chapter-title">{ch.title}</h4>
                  <p>{ch.desc}</p>
                </div>
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
                a: "PDF on launch, designed for reading on both phone and desktop. EPUB version coming shortly after.",
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