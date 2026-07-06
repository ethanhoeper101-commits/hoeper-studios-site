"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconLock } from "@tabler/icons-react";

export default function PortalLogin() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setStatus("error");
      setMessage(data.error ?? "Login failed. Try again.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-lg border border-gold/30 bg-gold/[0.06]">
            {/* gold H monogram */}
            <svg viewBox="0 0 64 64" width="30" height="30" aria-hidden>
              <g fill="#C9A84C">
                <rect x="19" y="15" width="8" height="34" rx="1.5" />
                <rect x="37" y="15" width="8" height="34" rx="1.5" />
                <rect x="14" y="33" width="31" height="7" rx="1.5" />
              </g>
            </svg>
          </span>
          <h1 className="mt-5 font-display text-2xl font-semibold text-white">
            Leads Portal
          </h1>
          <p className="mt-1 text-sm text-gray-muted">Hoeper Studios</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-sm border border-border-gold bg-surface-card/60 p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]"
        >
          <label
            htmlFor="portal-password"
            className="text-sm font-bold tracking-widest text-gold/80"
          >
            PASSWORD
          </label>
          <div className="relative">
            <IconLock
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/60"
            />
            <input
              id="portal-password"
              name="password"
              type="password"
              autoComplete="current-password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter portal password"
              className="w-full rounded-sm border border-white/10 bg-black/40 py-3.5 pl-11 pr-4 text-white placeholder-white/30 transition-colors focus:border-gold/60 focus:outline-none"
            />
          </div>

          {status === "error" && (
            <p role="alert" className="text-sm text-red-400">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !password}
            className="btn-gold btn-press mt-1 w-full rounded-sm bg-gold py-3.5 text-sm font-bold tracking-widest text-black disabled:opacity-60"
          >
            {status === "loading" ? "CHECKING…" : "ENTER PORTAL"}
          </button>
        </form>
      </div>
    </main>
  );
}
