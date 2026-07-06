import crypto from "crypto";
import { cookies } from "next/headers";

export const PORTAL_COOKIE = "hs_portal";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function isPortalConfigured(): boolean {
  return Boolean(process.env.PORTAL_PASSWORD && process.env.PORTAL_SESSION_SECRET);
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function checkPassword(input: string): boolean {
  const expected = process.env.PORTAL_PASSWORD ?? "";
  if (!expected) return false;
  return timingSafeEqual(input, expected);
}

export function signSession(): string {
  const secret = process.env.PORTAL_SESSION_SECRET ?? "";
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS });
  const payloadB64 = b64url(payload);
  const sig = b64url(
    crypto.createHmac("sha256", secret).update(payloadB64).digest()
  );
  return `${payloadB64}.${sig}`;
}

export function verifySession(token: string | undefined): boolean {
  if (!token) return false;
  const secret = process.env.PORTAL_SESSION_SECRET ?? "";
  if (!secret) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sig] = parts;
  const expected = b64url(
    crypto.createHmac("sha256", secret).update(payloadB64).digest()
  );
  if (!timingSafeEqual(sig, expected)) return false;
  try {
    const payload = JSON.parse(
      Buffer.from(payloadB64.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString()
    ) as { exp?: number };
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function isAuthed(): boolean {
  const token = cookies().get(PORTAL_COOKIE)?.value;
  return verifySession(token);
}

export const SESSION_MAX_AGE = SESSION_TTL_MS / 1000;
