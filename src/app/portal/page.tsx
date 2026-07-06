import type { Metadata } from "next";
import { isAuthed, isPortalConfigured } from "@/lib/portal-auth";
import { isRedisConfigured, listLeads } from "@/lib/redis";
import PortalLogin from "./PortalLogin";
import PortalDashboard from "./PortalDashboard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Leads Portal — Hoeper Studios",
  robots: { index: false, follow: false },
};

function SetupNotice({ items }: { items: string[] }) {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md rounded-sm border border-border-gold bg-surface-card/60 p-8 text-center">
        <h1 className="font-display text-2xl font-semibold text-white">
          Portal not configured yet
        </h1>
        <p className="mt-3 text-sm text-gray-muted">
          Add the following in your Vercel project settings, then redeploy:
        </p>
        <ul className="mt-5 flex flex-col gap-2 text-left">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-sm border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm text-gold"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default async function PortalPage() {
  const missing: string[] = [];
  if (!isPortalConfigured()) {
    missing.push("PORTAL_PASSWORD", "PORTAL_SESSION_SECRET");
  }
  if (!isRedisConfigured()) {
    missing.push("KV_REST_API_URL", "KV_REST_API_TOKEN");
  }
  if (missing.length > 0) {
    return <SetupNotice items={missing} />;
  }

  if (!isAuthed()) {
    return <PortalLogin />;
  }

  const leads = await listLeads();
  return <PortalDashboard leads={leads} />;
}
