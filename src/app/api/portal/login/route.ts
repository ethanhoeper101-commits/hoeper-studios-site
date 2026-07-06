import { NextResponse } from "next/server";
import {
  checkPassword,
  isPortalConfigured,
  signSession,
  PORTAL_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/portal-auth";

export const runtime = "nodejs";

// Throttle login attempts: 8 per 15 min per IP.
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;
const attempts = new Map<string, number[]>();

function tooManyAttempts(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_ATTEMPTS;
}

export async function POST(req: Request) {
  if (!isPortalConfigured()) {
    return NextResponse.json({ error: "Portal not configured" }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooManyAttempts(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  let password = "";
  try {
    const body = await req.json();
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(PORTAL_COOKIE, signSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
