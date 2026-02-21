"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", { redirect: false, email, password });
    setLoading(false);
    if (res?.ok) router.push("/credits");
    else alert("Sign in failed");
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <section className="auth-panel">
          <h1>Sooryx Energy</h1>
          <p>Track your solar credits, monitor usage, and manage your clean energy investment.</p>
          <p><strong>Built for Indian homeowners and solar prosumers.</strong></p>
        </section>
        <section className="auth-form">
          <h2>Welcome back</h2>
          <p className="auth-muted">View your solar credits and transactions.</p>
          <div className="auth-actions">
            {process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED === "true" && (
              <>
                <button className="auth-google" onClick={() => signIn("google")} type="button">
                  Continue with Google
                </button>
                <div className="auth-divider">or</div>
              </>
            )}
            <form onSubmit={handleSubmit} className="auth-actions">
              <label>
                Email
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@sooryx.com" />
              </label>
              <label>
                Password
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" />
              </label>
              <button className="auth-button" disabled={loading} type="submit">
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
          <p className="auth-muted">
            New here? <Link className="auth-link" href="/auth/register">Create an account</Link>
          </p>
          <p className="auth-muted">
            Forgot your password? <Link className="auth-link" href="/auth/forgot">Reset it</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
