import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const {
      yourName,
      businessName,
      businessType,
      email,
      phone,
      city,
      currentWebsite,
      hadWebsite,
      goals,
      message,
    } = body;

    if (
      !yourName ||
      !businessName ||
      !businessType ||
      !email ||
      !phone ||
      !city ||
      !hadWebsite ||
      !goals
    ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const hadWebsiteLabel: Record<string, string> = {
      "yes-happy": "Yes, and I liked it",
      "yes-unhappy": "Yes, but it didn't work well",
      no: "No, this would be my first",
    };

    const goalsLabel: Record<string, string> = {
      leads: "Generate more leads and calls",
      credibility: "Look professional and build trust",
      bookings: "Accept online bookings",
      reviews: "Get more Google reviews",
      all: "All of the above",
    };

    const row = (label: string, value: string, last = false) => `
      <tr style="border-bottom: ${last ? "none" : "1px solid #222"};">
        <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 38%; vertical-align: top;">${label}</td>
        <td style="padding: 12px 0; color: #fff; font-size: 14px; vertical-align: top;">${value}</td>
      </tr>`;

    await resend.emails.send({
      from: "Hoeper Studios Demo Form <notifications@hoeperstudio.com>",
      to: "ethan@hoeperstudio.com",
      replyTo: email,
      subject: `New Demo Request — ${yourName} · ${businessName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0d0d0d; color: #fff; border-radius: 8px;">
          <h1 style="color: #C9A84C; font-size: 24px; margin-bottom: 4px;">New Free Demo Request</h1>
          <p style="color: #9CA3AF; font-size: 13px; margin: 0 0 24px;">${yourName} from ${businessName} — ${city}</p>
          <table style="width: 100%; border-collapse: collapse;">
            ${row("Name", yourName)}
            ${row("Business Name", businessName)}
            ${row("Type of Business", businessType)}
            ${row("Email", email)}
            ${row("Phone", phone)}
            ${row("City / Service Area", city)}
            ${row("Current Website", currentWebsite ? currentWebsite : "—")}
            ${row("Had a Website?", hadWebsiteLabel[hadWebsite] ?? hadWebsite)}
            ${row("Website Goals", goalsLabel[goals] ?? goals)}
            ${row("Notes", message ? String(message).replace(/\n/g, "<br>") : "—", true)}
          </table>
          <p style="margin-top: 32px; color: #9CA3AF; font-size: 12px;">Submitted via hoeperstudio.com — reply directly to reach ${yourName}.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
