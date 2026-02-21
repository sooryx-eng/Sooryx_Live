"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/auth/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <section className="auth-panel">
          <h1>Recover your account</h1>
          <p>We'll send a secure reset link to restore access to your Sooryx account.</p>
          <p><strong>Links expire after 30 minutes for your security.</strong></p>
        </section>
        <section className="auth-form">
          <h2>Reset password</h2>
          <p className="auth-muted">Enter your email and we'll send you a reset link.</p>
          <form onSubmit={handleSubmit} className="auth-actions">
            <label>
              Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@sooryx.com" />
            </label>
            <button className="auth-button" disabled={loading} type="submit">
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
          {sent && <p className="auth-muted">If that email exists, a reset link has been sent.</p>}
          <p className="auth-muted">
            Back to <Link className="auth-link" href="/auth/signin">Sign in</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
