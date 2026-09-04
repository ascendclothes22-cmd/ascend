"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Lock, ShieldAlert, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

export function AdminLoginForm({
  locked,
  usingDevDefault,
}: {
  locked: boolean;
  usingDevDefault: boolean;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!password) {
      setError("Please enter the admin password.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.assign("/admin");
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Incorrect password.");
      setLoading(false);
    } catch {
      setError("Could not reach the server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ascend-black px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <p className="text-2xl font-heading font-bold tracking-[0.3em] text-ascend-white">
            ASCEND
          </p>
          <p className="text-[10px] font-heading tracking-[0.5em] text-ascend-accent mt-1">
            ADMIN PANEL
          </p>
        </div>

        {locked ? (
          <div className="glass p-8 text-center">
            <span className="mx-auto w-12 h-12 rounded-full bg-amber-400/10 flex items-center justify-center mb-5">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
            </span>
            <h1 className="text-lg font-heading font-bold tracking-wide mb-3">
              Admin access disabled
            </h1>
            <p className="text-xs leading-relaxed text-ascend-gray mb-4">
              The <code className="text-ascend-white">ADMIN_PASSWORD</code>{" "}
              environment variable is not set, so the admin panel is locked to
              prevent unauthorized access. No password will work until it is
              configured.
            </p>
            <div className="text-left bg-amber-400/5 border border-amber-400/20 rounded-lg p-3 mb-6">
              <p className="text-[11px] leading-relaxed text-amber-400/90 font-semibold uppercase tracking-wider mb-1.5">
                How to unlock
              </p>
              <ol className="text-[11px] leading-relaxed text-ascend-gray list-decimal list-inside space-y-1">
                <li>Open the project on Vercel</li>
                <li>
                  Project → Settings → Environment Variables
                </li>
                <li>
                  Add <code className="text-ascend-white">ADMIN_PASSWORD</code>{" "}
                  with a strong password
                </li>
                <li>Redeploy (Deployments → ⋯ → Redeploy)</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="glass p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-9 h-9 rounded-full bg-ascend-accent/10 flex items-center justify-center">
                <Lock className="w-4 h-4 text-ascend-accent" />
              </span>
              <div>
                <h1 className="text-lg font-heading font-bold tracking-wide">
                  Admin Login
                </h1>
                <p className="text-xs text-ascend-gray">
                  Restricted area — authorized access only.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-heading uppercase tracking-wider text-ascend-gray mb-2"
                >
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-ascend-white placeholder-white/20 focus:outline-none focus:border-ascend-accent transition-colors"
                />
              </div>

              {error && (
                <p className="text-xs text-red-400" role="alert">
                  {error}
                </p>
              )}

              {usingDevDefault && (
                <p className="text-[11px] leading-relaxed text-amber-400/80 bg-amber-400/5 border border-amber-400/20 rounded-lg p-3">
                  Local development: no ADMIN_PASSWORD is set, so the built-in
                  default is active (ascend2024). Set the ADMIN_PASSWORD env
                  var to use your own.
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-ascend-accent text-black font-heading font-bold uppercase tracking-wider text-sm px-6 py-3.5 rounded-lg hover:bg-ascend-accent/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>
        )}

        <a
          href="/"
          className="mt-6 flex items-center justify-center gap-2 text-xs font-heading uppercase tracking-wider text-ascend-gray hover:text-ascend-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to store
        </a>
      </motion.div>
    </div>
  );
}
