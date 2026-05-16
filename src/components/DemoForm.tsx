"use client";

import { useState } from "react";

const inputClass =
  "w-full bg-black/40 border border-white/10 focus:border-gold/60 focus:outline-none text-white text-lg px-6 py-5 rounded-sm placeholder-white/30 transition-colors";

const labelClass = "block text-xs font-bold tracking-widest text-gold/80 mb-3";

export default function DemoForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    phone: "",
    hadWebsite: "",
    goals: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ businessName: "", businessType: "", phone: "", hadWebsite: "", goals: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="demo" className="relative py-32 md:py-40 px-8 overflow-hidden">
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1100px] h-[800px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle at center, #C9A84C 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-[860px] mx-auto">
        <p className="text-sm font-bold tracking-widest text-gold text-center mb-6">
          FREE DEMO
        </p>

        <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-5">
          I&apos;ll build a free demo of your website.
        </h2>
        <p className="text-gray-muted text-center text-lg mb-16">
          No cost. No commitment. You only pay if you love it.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className={labelClass} htmlFor="businessName">BUSINESS NAME</label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                required
                placeholder="Acme Tree Service"
                value={formData.businessName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="businessType">TYPE OF BUSINESS</label>
              <input
                id="businessType"
                name="businessType"
                type="text"
                required
                placeholder="Tree Services, HVAC, Plumbing…"
                value={formData.businessType}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="phone">PHONE NUMBER</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="(208) 555-0100"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="hadWebsite">HAD A WEBSITE BEFORE?</label>
              <select
                id="hadWebsite"
                name="hadWebsite"
                required
                value={formData.hadWebsite}
                onChange={handleChange}
                className={inputClass + " appearance-none cursor-pointer"}
              >
                <option value="" disabled>Select one…</option>
                <option value="yes-happy">Yes, and I liked it</option>
                <option value="yes-unhappy">Yes, but it didn&apos;t work well</option>
                <option value="no">No, this would be my first</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="goals">WHAT DO YOU WANT YOUR WEBSITE TO DO?</label>
            <select
              id="goals"
              name="goals"
              required
              value={formData.goals}
              onChange={handleChange}
              className={inputClass + " appearance-none cursor-pointer"}
            >
              <option value="" disabled>Select your main goal…</option>
              <option value="leads">Generate more leads and calls</option>
              <option value="credibility">Look professional and build trust</option>
              <option value="bookings">Accept online bookings</option>
              <option value="reviews">Get more Google reviews</option>
              <option value="all">All of the above</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full py-6 bg-gold hover:bg-gold-light text-black text-base font-bold tracking-widest rounded-sm transition-colors disabled:opacity-60"
          >
            {status === "loading"
              ? "SENDING…"
              : status === "success"
              ? "REQUEST SENT!"
              : "SEND MY FREE DEMO REQUEST"}
          </button>

          {status === "error" && (
            <p className="text-red-400 text-base text-center">
              Something went wrong. Try emailing ethan@hoeperstudio.com directly.
            </p>
          )}

          <p className="text-gray-muted text-base text-center">
            I&apos;ll be in touch within 24 hours.
          </p>
        </form>
      </div>
    </section>
  );
}
