"use client";

import { useState } from "react";

export default function InterestForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to ConvertKit, Mailchimp, or Firebase
    setSubmitted(true);
  }

  return (
    <div className="form-card">
      <div className="form-card-accent" />
      <div className="form-head">
        <div className="form-tag">
          <span className="form-tag-dot" />
          Interest Form · Takes 60 seconds
        </div>
        <h3>Tell us about you.</h3>
        <p>
          This helps us send you the right stuff, no spam, unsubscribe any
          time.
        </p>
      </div>

      {!submitted ? (
        <form className="form-body" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="field">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Jordan"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Smith"
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@email.com"
              required
            />
          </div>

          <div className="form-row">
            <div className="field">
              <label htmlFor="role">I&apos;m a...</label>
              <select id="role" name="role" required>
                <option value="">Select one</option>
                <option>High school student</option>
                <option>College student</option>
                <option>Parent / guardian</option>
                <option>Counselor / educator</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="stage">Stage</label>
              <select id="stage" name="stage" required>
                <option value="">Select one</option>
                <option>Just exploring</option>
                <option>Picking schools</option>
                <option>Got my aid letters</option>
                <option>Enrolled, reconsidering</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>I&apos;m interested in... (pick any)</label>
            <div className="checkbox-group">
              <label className="check">
                <input type="checkbox" name="interests" value="ebook" />
                The e-book
              </label>
              <label className="check">
                <input type="checkbox" name="interests" value="merch" />
                Merch drops
              </label>
              <label className="check">
                <input type="checkbox" name="interests" value="sessions" />
                1:1 sessions
              </label>
              <label className="check">
                <input type="checkbox" name="interests" value="worksheets" />
                Free worksheets
              </label>
            </div>
          </div>

          <button type="submit" className="btn-primary form-submit">
            Join the List
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
          </button>
          <div className="form-disclaimer">
            Your info stays with us · No spam · Unsubscribe any time
          </div>
        </form>
      ) : (
        <div className="form-success">
          <div className="success-icon">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M6 14L12 20L22 8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3>You&apos;re on the list.</h3>
          <p>
            Check your inbox, we just sent you Chapter 1 as a thank-you. See
            you at launch.
          </p>
        </div>
      )}
    </div>
  );
}