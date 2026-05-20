import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { businessName, businessType, email, phone, hadWebsite, goals } = body;

    if (!businessName || !businessType || !email || !phone || !hadWebsite || !goals) {
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

    await resend.emails.send({
      from: "Hoeper Studios Demo Form <demo@hoeperstudio.com>",
      to: "ethan@hoeperstudio.com",
      subject: `New Demo Request — ${businessName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0d0d0d; color: #fff; border-radius: 8px;">
          <h1 style="color: #C9A84C; font-size: 24px; margin-bottom: 24px;">New Free Demo Request</h1>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 40%;">Business Name</td>
              <td style="padding: 12px 0; color: #fff; font-size: 14px;">${businessName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Type of Business</td>
              <td style="padding: 12px 0; color: #fff; font-size: 14px;">${businessType}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
              <td style="padding: 12px 0; color: #fff; font-size: 14px;">${email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Phone</td>
              <td style="padding: 12px 0; color: #fff; font-size: 14px;">${phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Had a Website?</td>
              <td style="padding: 12px 0; color: #fff; font-size: 14px;">${hadWebsiteLabel[hadWebsite] ?? hadWebsite}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Website Goals</td>
              <td style="padding: 12px 0; color: #fff; font-size: 14px;">${goalsLabel[goals] ?? goals}</td>
            </tr>
          </table>
          <p style="margin-top: 32px; color: #9CA3AF; font-size: 12px;">Submitted via hoeperstudio.com</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
