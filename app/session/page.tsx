import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book a 1:1 Session — Access ROI",
  description:
    "45-minute strategy call to walk through your aid letters, major options, and career paths. Leave with a ranked decision matrix. $149.",
};

const AGENDA = [
  {
    time: "00:00 — 05:00",
    title: "Context & goals",
    desc: "Quick intro, confirm your target schools, majors, and career interests from your intake form. Align on what \"success\" looks like for this call.",
  },
  {
    time: "05:00 — 20:00",
    title: "Your numbers, live",
    desc: "We walk through your real aid letters together. Sticker price, net price, grant vs. loan split, and what you're actually signing up for — line by line.",
  },
  {
    time: "20:00 — 35:00",
    title: "ROI comparison",
    desc: "Side-by-side comparison of your school × major combinations against starting salary, break-even, and 10-year earnings — using BLS data and live cost models.",
  },
  {
    time: "35:00 — 45:00",
    title: "The game plan",
    desc: "Your next 3 moves. Negotiation scripts for aid offices, backup schools worth adding, and any red flags we found. You leave with a clear plan.",
  },
  {
    time: "+ 48hrs",
    title: "The scorecard lands",
    desc: "We send your custom ROI scorecard — a one-page decision matrix ranking every path, with notes. Show it to your parents. Use it to decide.",
  },
];

const YES_LIST = [
  "A senior or junior with real aid letters in hand (or about to receive them)",
  "A parent trying to help your kid make a six-figure decision",
  "Stuck between 2-4 specific schools and want the math, not vibes",
  "Thinking about trade school, gap year, or transferring and want to compare paths",
  "Ready to negotiate your aid offer and want a script to use",
];

const NO_LIST = [
  "Just want general \"should I go to college?\" advice — grab the e-book first",
  "Haven't applied anywhere yet and are still 2+ years from college",
  "Looking for help writing application essays or personal statements",
  "Want someone to tell you where to go — we don't do that, we do math",
];

export default function SessionPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="sess-hero">
        <div className="container">
          <nav className="crumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span style={{ color: "var(--green)" }}>Book a 1:1 Session</span>
          </nav>
          <div className="sess-grid">
            <div>
              <div className="eyebrow sess-hero-eyebrow">
                1:1 Strategy · 45 minutes
              </div>
              <h1>
                Your numbers,
                <br />
                <span className="italic">on the table.</span>
              </h1>
              <p>
                Skip the DMs. Book a 45-minute strategy call to walk through
                your actual aid letters, major options, and career paths — and
                leave with a ranked decision matrix you can show your parents.
              </p>
              <a href="#book-now" className="btn-primary">
                See availability
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
              </a>
            </div>

            {/* SESSION CARD */}
            <div className="sess-card">
              <div className="sess-card-head">
                <div>
                  <div className="sess-card-type">Strategy Call</div>
                  <h3>
                    The ROI
                    <br />
                    Deep Dive
                  </h3>
                </div>
                <div className="sess-card-price">
                  <div className="sess-card-amount">$149</div>
                  <div className="sess-card-per">per session</div>
                </div>
              </div>
              <ul className="sess-includes">
                {[
                  "45 minutes of live 1:1 strategy, via Zoom",
                  "Pre-call intake: send your aid letters ahead",
                  "Custom ROI scorecard within 48 hours",
                  "Recording of the call, yours to keep",
                  "Parents welcome to join (no extra charge)",
                ].map((item) => (
                  <li key={item}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M3 9L7 13L15 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#book-now"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Book Your Call
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
              </a>
              <div className="sess-meta">
                <span>
                  <span className="dot" />
                  Slots open this week
                </span>
                <span>Powered by Calendly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ AGENDA ============ */}
      <section className="agenda">
        <div className="container">
          <div className="agenda-head">
            <div className="eyebrow" style={{ color: "var(--green-deep)" }}>
              What The 45 Minutes Looks Like
            </div>
            <h2>
              A structured call,
              <br />
              not a <span className="italic">vibe check.</span>
            </h2>
          </div>
          <div className="agenda-timeline">
            {AGENDA.map((block) => (
              <div key={block.time} className="agenda-block">
                <div className="agenda-time">{block.time}</div>
                <div className="agenda-content">
                  <h4>{block.title}</h4>
                  <p>{block.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHO THIS IS FOR ============ */}
      <section className="who">
        <div className="container">
          <div className="who-inner">
            <div className="who-head">
              <div className="eyebrow" style={{ color: "var(--green)" }}>
                Is This For You?
              </div>
              <h2>
                A real talk,
                <br />
                before you <span className="italic">book.</span>
              </h2>
            </div>
            <div className="who-grid">
              <div className="who-col yes">
                <h3>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M4 11L9 16L18 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Book if you&apos;re...
                </h3>
                <ul>
                  {YES_LIST.map((item) => (
                    <li key={item}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8L7 12L13 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="who-col no">
                <h3>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M5 5L17 17M5 17L17 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Skip it if you...
                </h3>
                <ul>
                  {NO_LIST.map((item) => (
                    <li key={item}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M5 5L11 11M5 11L11 5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CALENDLY PLACEHOLDER ============ */}
      <section className="calendly-section" id="book-now">
        <div className="container">
          <div className="calendly-head">
            <div className="eyebrow" style={{ color: "var(--green-deep)" }}>
              Book Your Slot
            </div>
            <h2>
              Pick a time that <span className="italic">works.</span>
            </h2>
            <p>
              Calls run Monday–Thursday, 4–8pm PT. Pick a slot, you&apos;ll get
              a Zoom link and intake form by email.
            </p>
          </div>
          <div className="calendly-embed">
            {/*
              Replace this placeholder with the real Calendly embed:
              
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/accessroi/strategy"
                style={{ minWidth: "320px", height: "600px" }}
              />
              <script
                type="text/javascript"
                src="https://assets.calendly.com/assets/external/widget.js"
                async
              />
            */}
            <div className="calendly-placeholder">
              <div className="calendly-logo-c">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3>Calendly booking widget goes here</h3>
              <p>
                Once the Calendly account is connected, this block embeds the
                live calendar with available slots, timezone detection, and the
                intake form.
              </p>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink"
              >
                Preview on Calendly
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
              </a>
              <div className="calendly-note-text">
                Embed script: assets.calendly.com/widget.js
              </div>
            </div>
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
              45 Minutes
            </div>
            <h2>
              One call.
              <br />
              One <span className="italic">real plan.</span>
            </h2>
            <p>
              The college decision is six figures. Spend 45 minutes with someone
              who runs the math for a living.
            </p>
            <div className="final-cta-buttons">
              <a href="#book-now" className="btn-primary">
                Book Your Session — $149
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
              </a>
              <Link href="/ebook" className="btn-secondary">
                Start with the E-Book first
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}