"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    setLoading(false);
    if (res.ok) router.push("/auth/signin");
    else {
      const data = await res.json();
      setError(data?.error ?? "Reset failed");
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <section className="auth-panel">
          <h1>Set your new password</h1>
          <p>Choose a strong password to secure your account.</p>
          <p><strong>Once saved, sign in immediately and continue.</strong></p>
        </section>
        <section className="auth-form">
          <h2>Reset password</h2>
          <p className="auth-muted">Enter your new password.</p>
          <form onSubmit={handleSubmit} className="auth-actions">
            <label>
              New password
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Create a strong password" />
            </label>
            <button className="auth-button" disabled={loading || !token} type="submit">
              {loading ? "Saving..." : "Update password"}
            </button>
          </form>
          {error && <p className="auth-error">{error}</p>}
          {!token && <p className="auth-error">Reset token missing or invalid.</p>}
          <p className="auth-muted">
            Back to <Link className="auth-link" href="/auth/signin">Sign in</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
