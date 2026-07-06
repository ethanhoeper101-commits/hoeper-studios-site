import { NextResponse } from "next/server";
import { createLead, isRedisConfigured } from "@/lib/redis";

export const runtime = "nodejs";

// Hosts allowed to submit the form. Covers prod, Vercel previews, and local dev.
const ALLOWED_HOSTS = ["hoeperstudio.com", "www.hoeperstudio.com"];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true; // some legitimate clients omit Origin
  try {
    const host = new URL(origin).host;
    return (
      ALLOWED_HOSTS.includes(host) ||
      host.endsWith(".vercel.app") ||
      host.startsWith("localhost")
    );
  } catch {
    return false;
  }
}

// Best-effort in-memory rate limit (per warm instance): 5 requests / 10 min per IP.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  try {
    // 1. Reject cross-origin submissions
    if (!isAllowedOrigin(req.headers.get("origin"))) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. Throttle abusive IPs
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();

    // 3. Honeypot — if the hidden field is filled, it's a bot. Pretend success.
    if (body.company) {
      return NextResponse.json({ success: true });
    }

    const lead = {
      yourName: str(body.yourName),
      businessName: str(body.businessName),
      businessType: str(body.businessType),
      email: str(body.email),
      phone: str(body.phone),
      city: str(body.city),
      currentWebsite: str(body.currentWebsite),
      hadWebsite: str(body.hadWebsite),
      goals: str(body.goals),
      message: str(body.message),
    };

    if (
      !lead.yourName ||
      !lead.businessName ||
      !lead.businessType ||
      !lead.email ||
      !lead.phone ||
      !lead.city ||
      !lead.hadWebsite ||
      !lead.goals
    ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!isRedisConfigured()) {
      console.error("Lead received but storage is not configured.");
      return NextResponse.json({ error: "Storage unavailable" }, { status: 503 });
    }

    await createLead(lead);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
