"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

type Sale = {
  id: string;
  name: string;
  email: string;
  amount: number;
  status: string;
  created: string;
  description: string;
};

type Signup = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  stage: string;
  interests: string[];
  source: string;
  createdAt: string | null;
};

type SalesData = {
  sales: Sale[];
  metrics: {
    totalRevenue: number;
    orderCount: number;
    thisWeekRevenue: number;
    thisWeekOrders: number;
  };
  revenueByDay: { date: string; amount: number }[];
};

type SignupsData = {
  signups: Signup[];
  metrics: {
    totalSignups: number;
    thisWeekSignups: number;
    fromFullForm: number;
    fromQuickSignup: number;
    byRole: Record<string, number>;
    byInterest: Record<string, number>;
  };
};

type Session = {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  duration: string;
  amount: number;
  status: string;
  eventName: string;
};

type SessionsData = {
  connected: boolean;
  sessions: Session[];
  metrics: {
    totalBooked: number;
    upcoming: number;
    completed: number;
    cancelled: number;
    totalRevenue: number;
    avgPerSession: number;
    thisWeekSessions?: number;
    thisWeekRevenue?: number;
    nextSession?: {
      name: string;
      date: string;
      time: string;
    } | null;
  };
};

function CalendlyConnect({ onConnected }: { onConnected: () => void }) {
  const [token, setToken] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiToken: token }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to connect");
        setSaving(false);
        return;
      }

      onConnected();
    } catch {
      setError("Something went wrong. Try again.");
      setSaving(false);
    }
  }

  return (
    <div className="admin-connect-banner">
      <div className="admin-connect-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="15" r="2" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </div>
      <div className="admin-connect-content">
        <h3>Connect Calendly to unlock live data</h3>
        <p>
          Go to{" "}
          <a
            href="https://calendly.com/integrations"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#D4A843", textDecoration: "underline" }}
          >
            Calendly → Integrations → API
          </a>
          , generate a Personal Access Token, and paste it below.
        </p>
        <form onSubmit={handleConnect} className="admin-connect-form">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your Calendly API token..."
            required
            className="admin-connect-input"
          />
          <button
            type="submit"
            className="admin-connect-btn"
            disabled={saving}
            style={{ opacity: saving ? 0.7 : 1 }}
          >
            {saving ? "Verifying..." : "Connect"}
            {!saving && (
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </form>
        {error && (
          <div className="admin-connect-error">{error}</div>
        )}
      </div>
    </div>
  );
}

function PasswordChange() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (newPw !== confirm) {
      setError("New passwords don't match.");
      return;
    }
    if (newPw.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: current,
          newPassword: newPw,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to change password");
        setSaving(false);
        return;
      }

      setSuccess(true);
      setCurrent("");
      setNewPw("");
      setConfirm("");
      setTimeout(() => {
        setSuccess(false);
        setOpen(false);
      }, 2000);
    } catch {
      setError("Something went wrong.");
    }
    setSaving(false);
  }

  if (!open) {
    return (
      <button
        className="admin-pw-toggle"
        onClick={() => setOpen(true)}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        Change Password
      </button>
    );
  }

  return (
    <div className="admin-pw-form-wrap">
      <form onSubmit={handleSubmit} className="admin-pw-form">
        <div className="admin-pw-field">
          <label>Current password</label>
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
          />
        </div>
        <div className="admin-pw-field">
          <label>New password</label>
          <input
            type="password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <div className="admin-pw-field">
          <label>Confirm new password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        {error && <div className="admin-pw-error">{error}</div>}
        {success && <div className="admin-pw-success">Password updated!</div>}
        <div className="admin-pw-actions">
          <button
            type="submit"
            className="admin-connect-btn"
            disabled={saving}
            style={{ opacity: saving ? 0.7 : 1 }}
          >
            {saving ? "Saving..." : "Update Password"}
          </button>
          <button
            type="button"
            className="admin-btn-outline"
            onClick={() => { setOpen(false); setError(null); }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"sales" | "signups" | "sessions">("sales");
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [signupsData, setSignupsData] = useState<SignupsData | null>(null);
  const [sessionsData, setSessionsData] = useState<SessionsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Check if already authed on load
  useEffect(() => {
    fetch("/api/admin/sales")
      .then((res) => {
        if (res.ok) setAuthed(true);
      })
      .finally(() => setChecking(false));
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Sales and sessions still go through API routes (Stripe / Calendly)
      const [salesRes, sessionsRes] = await Promise.all([
        fetch("/api/admin/sales"),
        fetch("/api/admin/sessions"),
      ]);
      if (salesRes.ok) setSalesData(await salesRes.json());
      if (sessionsRes.ok) setSessionsData(await sessionsRes.json());

      // Signups read directly from Firestore (client SDK works in browser)
      const q = query(
        collection(db, "signups"),
        orderBy("createdAt", "desc"),
        limit(200)
      );
      const snapshot = await getDocs(q);

      const signups: Signup[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          role: data.role || "",
          stage: data.stage || "",
          interests: data.interests || [],
          source: data.source || "full-form",
          createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        };
      });

      const totalSignups = signups.length;

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const thisWeekSignups = signups.filter(
        (s) => s.createdAt && new Date(s.createdAt) > oneWeekAgo
      ).length;

      const fromFullForm = signups.filter((s) => s.source === "full-form").length;
      const fromQuickSignup = signups.filter(
        (s) => s.source === "quick-signup"
      ).length;

      const byRole: Record<string, number> = {};
      signups.forEach((s) => {
        if (s.role) byRole[s.role] = (byRole[s.role] || 0) + 1;
      });

      const byInterest: Record<string, number> = {};
      signups.forEach((s) => {
        if (Array.isArray(s.interests)) {
          s.interests.forEach((interest) => {
            byInterest[interest] = (byInterest[interest] || 0) + 1;
          });
        }
      });

      setSignupsData({
        signups,
        metrics: {
          totalSignups,
          thisWeekSignups,
          fromFullForm,
          fromQuickSignup,
          byRole,
          byInterest,
        },
      });
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAuthed(true);
      } else {
        setLoginError("Wrong password. Try again.");
      }
    } catch {
      setLoginError("Something went wrong.");
    }
    setLoginLoading(false);
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthed(false);
    setSalesData(null);
    setSignupsData(null);
    setSessionsData(null);
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatCurrency(n: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n);
  }

  // Loading check
  if (checking) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
      </div>
    );
  }

  // ============ LOGIN SCREEN ============
  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <div className="admin-login-accent" />
          <div className="admin-login-logo">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <path d="M22 14V10.5C22 6.91015 19.0899 4 15.5 4C11.9101 4 9 6.91015 9 10.5V14" stroke="#00D26A" strokeWidth="3" strokeLinecap="square" />
              <rect x="6" y="14" width="20" height="16" rx="1" fill="#00D26A" />
              <circle cx="16" cy="21" r="2" fill="#0A2426" />
              <rect x="15" y="21" width="2" height="5" fill="#0A2426" />
            </svg>
            Access ROI
          </div>
          <h1>Admin Dashboard</h1>
          <p>Enter the admin password to continue.</p>
          <form onSubmit={handleLogin}>
            <div className="admin-login-field">
              <label htmlFor="admin-pw">Password</label>
              <input
                id="admin-pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoFocus
              />
            </div>
            {loginError && <div className="admin-login-error">{loginError}</div>}
            <button
              type="submit"
              className="admin-login-btn"
              disabled={loginLoading}
              style={{ opacity: loginLoading ? 0.7 : 1 }}
            >
              {loginLoading ? "Checking..." : "Log In"}
              {!loginLoading && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </form>
          <Link href="/" className="admin-login-back">← Back to site</Link>
        </div>
      </div>
    );
  }

  // ============ DASHBOARD ============
  const maxRevenue = salesData
    ? Math.max(...salesData.revenueByDay.map((d) => d.amount), 1)
    : 1;

  const filteredSales = salesData?.sales.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const filteredSignups = signupsData?.signups.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="admin-dash">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <Link href="/" className="admin-sidebar-logo">
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
            <path d="M22 14V10.5C22 6.91015 19.0899 4 15.5 4C11.9101 4 9 6.91015 9 10.5V14" stroke="#00D26A" strokeWidth="3" strokeLinecap="square" />
            <rect x="6" y="14" width="20" height="16" rx="1" fill="#00D26A" />
            <circle cx="16" cy="21" r="2" fill="#0A2426" />
            <rect x="15" y="21" width="2" height="5" fill="#0A2426" />
          </svg>
          Access ROI
        </Link>

        <div className="admin-sidebar-label">Dashboard</div>
        <ul className="admin-sidebar-nav">
          <li>
            <button
              className={activeTab === "sales" ? "active" : ""}
              onClick={() => { setActiveTab("sales"); setSearch(""); }}
            >
              <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" /><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" /><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" /><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" /></svg>
              Overview
            </button>
          </li>
          <li>
            <button
              className={activeTab === "signups" ? "active" : ""}
              onClick={() => { setActiveTab("signups"); setSearch(""); }}
            >
              <svg viewBox="0 0 24 24" fill="none"><path d="M16 21V19C16 16.7909 14.2091 15 12 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" /><path d="M20 8V14M17 11H23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              Signups
            </button>
          </li>
          <li>
            <button
              className={activeTab === "sessions" ? "active" : ""}
              onClick={() => { setActiveTab("sessions"); setSearch(""); }}
            >
              <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              Sessions
            </button>
          </li>
        </ul>

        <div className="admin-sidebar-label">Links</div>
        <ul className="admin-sidebar-nav">
          <li>
            <Link href="/">
              <svg viewBox="0 0 24 24" fill="none"><path d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M15 3H21V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 14L21 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              View Site
            </Link>
          </li>
          <li>
            <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none"><path d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M15 3H21V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 14L21 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              Stripe Dashboard
            </a>
          </li>
        </ul>

        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-user">
            <div className="admin-sidebar-avatar">M</div>
            <div className="admin-sidebar-info">
              <div className="admin-sidebar-name">MyLék</div>
              <div className="admin-sidebar-role">Admin</div>
            </div>
            <button className="admin-sidebar-logout" onClick={handleLogout}>
              Log out
            </button>
          </div>
          <PasswordChange />
        </div>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        {/* HEADER */}
        <div className="admin-header">
          <div>
            <h1>
              Welcome back, <span className="admin-green">MyLék.</span>
            </h1>
            <p>Here&apos;s what&apos;s happening with Access ROI.</p>
          </div>
          <div className="admin-header-actions">
            <button className="admin-btn-outline" onClick={fetchData} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* METRICS */}
        {activeTab === "sales" && (
          <div className="admin-metrics">
            <div className="admin-metric green">
              <div className="admin-metric-label">Total Revenue</div>
              <div className="admin-metric-value">
                {salesData ? formatCurrency(salesData.metrics.totalRevenue) : "—"}
              </div>
              {salesData && salesData.metrics.thisWeekOrders > 0 && (
                <span className="admin-metric-change up">
                  ↑ {formatCurrency(salesData.metrics.thisWeekRevenue)} this week
                </span>
              )}
            </div>
            <div className="admin-metric cream">
              <div className="admin-metric-label">E-Book Pre-Orders</div>
              <div className="admin-metric-value">
                {salesData?.metrics.orderCount ?? "—"}
              </div>
              {salesData && salesData.metrics.thisWeekOrders > 0 && (
                <span className="admin-metric-change up">
                  ↑ {salesData.metrics.thisWeekOrders} new this week
                </span>
              )}
            </div>
            <div className="admin-metric gold">
              <div className="admin-metric-label">Interest Signups</div>
              <div className="admin-metric-value">
                {signupsData?.metrics.totalSignups ?? "—"}
              </div>
              {signupsData && signupsData.metrics.thisWeekSignups > 0 && (
                <span className="admin-metric-change up">
                  ↑ {signupsData.metrics.thisWeekSignups} this week
                </span>
              )}
            </div>
            <div className="admin-metric rust">
              <div className="admin-metric-label">Sessions Booked</div>
              <div className="admin-metric-value">
                {sessionsData?.connected ? sessionsData.metrics.totalBooked : "—"}
              </div>
              {sessionsData?.connected && sessionsData.metrics.thisWeekSessions ? (
                <span className="admin-metric-change up">
                  ↑ {sessionsData.metrics.thisWeekSessions} this week
                </span>
              ) : (
                !sessionsData?.connected && <span className="admin-metric-note">Connect Calendly API</span>
              )}
            </div>
          </div>
        )}

        {activeTab === "signups" && (
          <div className="admin-metrics">
            <div className="admin-metric green">
              <div className="admin-metric-label">Total Signups</div>
              <div className="admin-metric-value">
                {signupsData?.metrics.totalSignups ?? "—"}
              </div>
              {signupsData && signupsData.metrics.thisWeekSignups > 0 && (
                <span className="admin-metric-change up">
                  ↑ {signupsData.metrics.thisWeekSignups} this week
                </span>
              )}
            </div>
            <div className="admin-metric blue">
              <div className="admin-metric-label">From Full Form</div>
              <div className="admin-metric-value">
                {signupsData?.metrics.fromFullForm ?? "—"}
              </div>
            </div>
            <div className="admin-metric gold">
              <div className="admin-metric-label">Quick Signups</div>
              <div className="admin-metric-value">
                {signupsData?.metrics.fromQuickSignup ?? "—"}
              </div>
            </div>
            <div className="admin-metric cream">
              <div className="admin-metric-label">Conversion Rate</div>
              <div className="admin-metric-value">
                {salesData && signupsData && signupsData.metrics.totalSignups > 0
                  ? `${Math.round((salesData.metrics.orderCount / signupsData.metrics.totalSignups) * 100)}%`
                  : "—"}
              </div>
              <span className="admin-metric-note">Signups → Pre-Orders</span>
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="admin-metrics">
            <div className="admin-metric green">
              <div className="admin-metric-label">Session Revenue</div>
              <div className="admin-metric-value">
                {sessionsData?.connected
                  ? formatCurrency(sessionsData.metrics.totalRevenue)
                  : "—"}
              </div>
              {sessionsData?.connected && sessionsData.metrics.thisWeekRevenue ? (
                <span className="admin-metric-change up">
                  ↑ {formatCurrency(sessionsData.metrics.thisWeekRevenue)} this week
                </span>
              ) : null}
            </div>
            <div className="admin-metric blue">
              <div className="admin-metric-label">Total Booked</div>
              <div className="admin-metric-value">
                {sessionsData?.connected ? sessionsData.metrics.totalBooked : "—"}
              </div>
              {sessionsData?.connected && sessionsData.metrics.thisWeekSessions ? (
                <span className="admin-metric-change up">
                  ↑ {sessionsData.metrics.thisWeekSessions} this week
                </span>
              ) : null}
            </div>
            <div className="admin-metric gold">
              <div className="admin-metric-label">Upcoming</div>
              <div className="admin-metric-value">
                {sessionsData?.connected ? sessionsData.metrics.upcoming : "—"}
              </div>
              {sessionsData?.connected && sessionsData.metrics.nextSession && (
                <span className="admin-metric-note">
                  Next: {sessionsData.metrics.nextSession.time}
                </span>
              )}
            </div>
            <div className="admin-metric cream">
              <div className="admin-metric-label">Avg. Per Session</div>
              <div className="admin-metric-value">
                {sessionsData?.connected && sessionsData.metrics.avgPerSession > 0
                  ? formatCurrency(sessionsData.metrics.avgPerSession)
                  : "—"}
              </div>
              <span className="admin-metric-note">45 min advisory call</span>
            </div>
          </div>
        )}

        {/* SALES CHARTS */}
        {activeTab === "sales" && salesData && (
          <div className="admin-charts">
            <div className="admin-chart-card">
              <div className="admin-chart-header">
                <div className="admin-chart-title">Revenue (last 7 days)</div>
              </div>
              <div className="admin-chart-bars">
                {salesData.revenueByDay.map((day) => (
                  <div key={day.date} className="admin-bar-group">
                    <div
                      className="admin-bar"
                      style={{
                        height: `${maxRevenue > 0 ? (day.amount / maxRevenue) * 100 : 0}%`,
                        minHeight: day.amount > 0 ? "4px" : "0",
                      }}
                      title={formatCurrency(day.amount)}
                    />
                    <div className="admin-bar-label">{day.date}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="admin-chart-card">
              <div className="admin-chart-header">
                <div className="admin-chart-title">Revenue by Source</div>
              </div>
              <ul className="admin-breakdown">
                <li className="admin-breakdown-item">
                  <div className="admin-breakdown-left">
                    <div className="admin-breakdown-dot" style={{ background: "var(--green)" }} />
                    <div>
                      <div className="admin-breakdown-name">E-Book Pre-Orders</div>
                      <div className="admin-breakdown-count">
                        {salesData.metrics.orderCount} orders
                      </div>
                    </div>
                  </div>
                  <div className="admin-breakdown-value">
                    {formatCurrency(salesData.metrics.totalRevenue)}
                  </div>
                </li>
                <li className="admin-breakdown-item">
                  <div className="admin-breakdown-left">
                    <div className="admin-breakdown-dot" style={{ background: "#D4A843" }} />
                    <div>
                      <div className="admin-breakdown-name">1:1 Sessions</div>
                      <div className="admin-breakdown-count">Via Calendly</div>
                    </div>
                  </div>
                  <div className="admin-breakdown-value">—</div>
                </li>
                <li className="admin-breakdown-item">
                  <div className="admin-breakdown-left">
                    <div className="admin-breakdown-dot" style={{ background: "var(--cream-mid)" }} />
                    <div>
                      <div className="admin-breakdown-name">Merch</div>
                      <div className="admin-breakdown-count">Via Shopify</div>
                    </div>
                  </div>
                  <div className="admin-breakdown-value">—</div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* SIGNUPS BREAKDOWNS */}
        {activeTab === "signups" && signupsData && (
          <div className="admin-charts">
            <div className="admin-chart-card">
              <div className="admin-chart-header">
                <div className="admin-chart-title">Signups by Role</div>
              </div>
              <div className="admin-role-bars">
                {Object.entries(signupsData.metrics.byRole)
                  .sort(([, a], [, b]) => b - a)
                  .map(([role, count]) => {
                    const max = Math.max(
                      ...Object.values(signupsData.metrics.byRole)
                    );
                    return (
                      <div key={role} className="admin-role-row">
                        <div className="admin-role-label">{role}</div>
                        <div className="admin-role-track">
                          <div
                            className="admin-role-fill"
                            style={{
                              width: `${max > 0 ? (count / max) * 100 : 0}%`,
                            }}
                          />
                        </div>
                        <div className="admin-role-count">{count}</div>
                      </div>
                    );
                  })}
                {Object.keys(signupsData.metrics.byRole).length === 0 && (
                  <div className="admin-empty-small">No role data yet</div>
                )}
              </div>
            </div>
            <div className="admin-chart-card">
              <div className="admin-chart-header">
                <div className="admin-chart-title">Interested In</div>
              </div>
              <ul className="admin-breakdown">
                {Object.entries(signupsData.metrics.byInterest)
                  .sort(([, a], [, b]) => b - a)
                  .map(([interest, count]) => (
                    <li key={interest} className="admin-breakdown-item">
                      <div className="admin-breakdown-left">
                        <div
                          className="admin-breakdown-dot"
                          style={{
                            background:
                              interest === "ebook"
                                ? "var(--green)"
                                : interest === "sessions"
                                  ? "#D4A843"
                                  : interest === "webinars"
                                    ? "#5BA8FF"
                                    : "var(--cream-mid)",
                          }}
                        />
                        <div className="admin-breakdown-name">
                          {interest === "ebook"
                            ? "The E-Book"
                            : interest === "sessions"
                              ? "1:1 Sessions"
                              : interest === "webinars"
                                ? "Free Webinars"
                                : interest === "merch"
                                  ? "Merch Drops"
                                  : interest}
                        </div>
                      </div>
                      <div className="admin-breakdown-value">{count}</div>
                    </li>
                  ))}
                {Object.keys(signupsData.metrics.byInterest).length === 0 && (
                  <li className="admin-breakdown-item">
                    <div className="admin-breakdown-name">No interest data yet</div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* TABS */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === "sales" ? "active" : ""}`}
            onClick={() => { setActiveTab("sales"); setSearch(""); }}
          >
            Recent Sales
            <span className="admin-tab-count">{salesData?.metrics.orderCount ?? 0}</span>
          </button>
          <button
            className={`admin-tab ${activeTab === "signups" ? "active" : ""}`}
            onClick={() => { setActiveTab("signups"); setSearch(""); }}
          >
            Signups
            <span className="admin-tab-count">{signupsData?.metrics.totalSignups ?? 0}</span>
          </button>
          <button
            className={`admin-tab ${activeTab === "sessions" ? "active" : ""}`}
            onClick={() => { setActiveTab("sessions"); setSearch(""); }}
          >
            Sessions
            <span className="admin-tab-count">—</span>
          </button>
        </div>

        {/* SALES TABLE */}
        {activeTab === "sales" && (
          <div className="admin-table-wrap">
            <div className="admin-table-header">
              <div className="admin-table-title">E-Book Pre-Orders</div>
              <input
                type="text"
                className="admin-table-search"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="admin-empty">
                        {salesData ? "No sales found." : "Loading..."}
                      </td>
                    </tr>
                  ) : (
                    filteredSales.map((sale) => (
                      <tr key={sale.id}>
                        <td className="admin-td-name">{sale.name}</td>
                        <td className="admin-td-email">{sale.email}</td>
                        <td className="admin-td-amount">{formatCurrency(sale.amount)}</td>
                        <td>
                          <span className={`admin-status ${sale.status === "succeeded" ? "paid" : "pending"}`}>
                            {sale.status === "succeeded" ? "Paid" : "Pending"}
                          </span>
                        </td>
                        <td className="admin-td-date">{formatDate(sale.created)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="admin-table-footer">
              <span>Showing {filteredSales.length} of {salesData?.sales.length ?? 0} orders</span>
            </div>
          </div>
        )}

        {/* SIGNUPS TABLE */}
        {activeTab === "signups" && (
          <div className="admin-table-wrap">
            <div className="admin-table-header">
              <div className="admin-table-title">Interest List Signups</div>
              <input
                type="text"
                className="admin-table-search"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Stage</th>
                    <th>Interests</th>
                    <th>Source</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSignups.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="admin-empty">
                        {signupsData ? "No signups yet." : "Loading..."}
                      </td>
                    </tr>
                  ) : (
                    filteredSignups.map((signup) => (
                      <tr key={signup.id}>
                        <td className="admin-td-name">
                          {signup.firstName} {signup.lastName}
                        </td>
                        <td className="admin-td-email">{signup.email}</td>
                        <td>{signup.role || "—"}</td>
                        <td>{signup.stage || "—"}</td>
                        <td>
                          <div className="admin-interest-tags">
                            {signup.interests.map((i) => (
                              <span key={i} className="admin-interest-tag">{i}</span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <span className={`admin-status ${signup.source === "quick-signup" ? "new" : "confirmed"}`}>
                            {signup.source === "quick-signup" ? "Quick" : "Full Form"}
                          </span>
                        </td>
                        <td className="admin-td-date">
                          {signup.createdAt ? formatDate(signup.createdAt) : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="admin-table-footer">
              <span>
                Showing {filteredSignups.length} of {signupsData?.metrics.totalSignups ?? 0} signups
                {signupsData && ` · ${signupsData.metrics.fromFullForm} full form · ${signupsData.metrics.fromQuickSignup} quick`}
              </span>
            </div>
          </div>
        )}

        {/* SESSIONS TAB */}
        {activeTab === "sessions" && (
          <>
            {/* Connect Banner - only show if not connected */}
            {sessionsData && !sessionsData.connected && (
              <CalendlyConnect onConnected={fetchData} />
            )}

            {/* Upcoming Sessions */}
            {sessionsData?.connected && (
              <div className="admin-upcoming-section">
                <div className="admin-upcoming-title">Upcoming Sessions</div>
                <div className="admin-upcoming-grid">
                  {sessionsData.sessions
                    .filter((s) => s.status === "upcoming")
                    .slice(0, 3)
                    .map((session, i) => (
                      <div
                        key={session.id}
                        className={`admin-upcoming-card ${i === 0 ? "next" : ""}`}
                      >
                        <div className="admin-upcoming-top">
                          <div className="admin-upcoming-date">
                            {new Date(session.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <span
                            className={`admin-upcoming-badge ${i === 0 ? "next-up" : "confirmed"}`}
                          >
                            {i === 0 ? "Next Up" : "Confirmed"}
                          </span>
                        </div>
                        <div className="admin-upcoming-name">{session.name}</div>
                        <div className="admin-upcoming-email">{session.email}</div>
                        <div className="admin-upcoming-details">
                          <div className="admin-upcoming-detail">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                            {session.time}
                          </div>
                          <div className="admin-upcoming-detail">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                              <path d="M8 12H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                            {session.duration}
                          </div>
                          {session.amount > 0 && (
                            <div className="admin-upcoming-detail">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                              </svg>
                              {formatCurrency(session.amount)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  {sessionsData.sessions.filter((s) => s.status === "upcoming").length === 0 && (
                    <div className="admin-upcoming-card empty">
                      <div className="admin-upcoming-empty">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <p>No upcoming sessions</p>
                        <span>New bookings will appear here automatically</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sessions Table */}
            <div className="admin-table-wrap">
              <div className="admin-table-header">
                <div className="admin-table-title">All Sessions</div>
                {sessionsData?.connected && (
                  <input
                    type="text"
                    className="admin-table-search"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                )}
              </div>
              <div className="admin-table-scroll">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Email</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Duration</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!sessionsData?.connected ? (
                      <tr>
                        <td colSpan={7} className="admin-empty">
                          Connect Calendly to see session data here.
                        </td>
                      </tr>
                    ) : sessionsData.sessions
                        .filter(
                          (s) =>
                            s.name.toLowerCase().includes(search.toLowerCase()) ||
                            s.email.toLowerCase().includes(search.toLowerCase())
                        )
                        .length === 0 ? (
                      <tr>
                        <td colSpan={7} className="admin-empty">
                          No sessions found.
                        </td>
                      </tr>
                    ) : (
                      sessionsData.sessions
                        .filter(
                          (s) =>
                            s.name.toLowerCase().includes(search.toLowerCase()) ||
                            s.email.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((session) => (
                          <tr key={session.id}>
                            <td className="admin-td-name">{session.name}</td>
                            <td className="admin-td-email">{session.email}</td>
                            <td className="admin-td-date">{formatDate(session.date)}</td>
                            <td className="admin-td-date">{session.time}</td>
                            <td>{session.duration}</td>
                            <td className="admin-td-amount">
                              {session.amount > 0 ? formatCurrency(session.amount) : "—"}
                            </td>
                            <td>
                              <span
                                className={`admin-status ${session.status}`}
                              >
                                {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
              {sessionsData?.connected && (
                <div className="admin-table-footer">
                  <span>
                    {sessionsData.sessions.length} sessions ·{" "}
                    {sessionsData.metrics.completed} completed ·{" "}
                    {sessionsData.metrics.upcoming} upcoming
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}