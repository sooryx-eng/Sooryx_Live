"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    setLoading(false);
    if (res.ok) router.push("/auth/signin");
    else {
      const data = await res.json();
      setError(data?.error ?? "Registration failed");
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <section className="auth-panel">
          <h1>Power your energy journey</h1>
          <p>Join Sooryx to track solar credits, monitor generation, and take control of your clean energy.</p>
          <p><strong>Sign up in minutes and start today.</strong></p>
        </section>
        <section className="auth-form">
          <h2>Create account</h2>
          <p className="auth-muted">Start tracking your solar credits in just a few seconds.</p>
          <div className="auth-actions">
            {process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED === "true" && (
              <>
                <button className="auth-google" onClick={() => window.location.href = "/api/auth/signin/google"} type="button">
                  Continue with Google
                </button>
                <div className="auth-divider">or</div>
              </>
            )}
            <form onSubmit={handleSubmit} className="auth-actions">
              <label>
                Full name
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Rajesh Kumar" />
              </label>
              <label>
                Email
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@sooryx.com" />
              </label>
              <label>
                Password
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Create a secure password" />
              </label>
              <button className="auth-button" disabled={loading} type="submit">
                {loading ? "Creating..." : "Create account"}
              </button>
            </form>
          </div>
          {error && <p className="auth-error">{error}</p>}
          <p className="auth-muted">
            Already have an account? <Link className="auth-link" href="/auth/signin">Sign in</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
