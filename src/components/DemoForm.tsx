"use client";

import { useState } from "react";
import FadeUp from "./FadeUp";

const inputClass =
  "w-full bg-black/40 border border-white/10 focus:border-gold/60 focus:outline-none text-white text-base md:text-xl px-4 md:px-8 py-4 md:py-6 rounded-sm placeholder-white/30 transition-colors";

const inputErrorClass =
  "w-full bg-black/40 border border-red-500/60 focus:border-red-500/80 focus:outline-none text-white text-base md:text-xl px-4 md:px-8 py-4 md:py-6 rounded-sm placeholder-white/30 transition-colors";

const labelClass = "block text-sm font-bold tracking-widest text-gold/80 mb-4";

const errorMsgClass = "mt-2 text-sm text-red-400";

type FormData = {
  businessName: string;
  businessType: string;
  email: string;
  phone: string;
  hadWebsite: string;
  goals: string;
};

const emptyForm: FormData = {
  businessName: "",
  businessType: "",
  email: "",
  phone: "",
  hadWebsite: "",
  goals: "",
};

function validate(data: FormData): Partial<Record<keyof FormData, string>> {
  const errors: Partial<Record<keyof FormData, string>> = {};

  if (!data.businessName.trim()) {
    errors.businessName = "Business name is required.";
  }

  if (!data.businessType.trim()) {
    errors.businessType = "Type of business is required.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = "Enter a valid email address (e.g. name@example.com).";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (/[a-zA-Z]/.test(data.phone)) {
    errors.phone = "Phone number cannot contain letters.";
  } else if (data.phone.replace(/\D/g, "").length !== 10) {
    errors.phone = "Enter a 10-digit US phone number.";
  }

  if (!data.hadWebsite) {
    errors.hadWebsite = "Please select an option.";
  }

  if (!data.goals) {
    errors.goals = "Please select your main goal.";
  }

  return errors;
}

export default function DemoForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user edits it
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData(emptyForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function ic(name: keyof FormData) {
    return errors[name] ? inputErrorClass : inputClass;
  }

  return (
    <section id="demo" className="relative py-16 md:py-52 px-4 md:px-8 overflow-hidden">
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1400px] h-[1000px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle at center, #C9A84C 0%, transparent 65%)",
        }}
      />

      <FadeUp className="relative z-10 max-w-[1000px] mx-auto">
        <p className="text-base font-bold tracking-widest text-gold text-center mb-8">
          FREE DEMO
        </p>

        <h2 className="text-3xl md:text-7xl font-bold text-white text-center mb-6">
          I&apos;ll build a free demo of your website.
        </h2>
        <p className="text-gray-muted text-center text-base md:text-xl mb-8 md:mb-20">
          No cost. No commitment. You only pay if you love it.
        </p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 md:gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-10">
            <div>
              <label className={labelClass} htmlFor="businessName">BUSINESS NAME</label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                placeholder="Acme Tree Service"
                value={formData.businessName}
                onChange={handleChange}
                className={ic("businessName")}
              />
              {errors.businessName && <p className={errorMsgClass}>{errors.businessName}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="businessType">TYPE OF BUSINESS</label>
              <input
                id="businessType"
                name="businessType"
                type="text"
                placeholder="Tree Services, HVAC, Plumbing…"
                value={formData.businessType}
                onChange={handleChange}
                className={ic("businessType")}
              />
              {errors.businessType && <p className={errorMsgClass}>{errors.businessType}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="email">EMAIL ADDRESS</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={ic("email")}
              />
              {errors.email && <p className={errorMsgClass}>{errors.email}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="phone">PHONE NUMBER</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(208) 555-0100"
                value={formData.phone}
                onChange={handleChange}
                className={ic("phone")}
              />
              {errors.phone && <p className={errorMsgClass}>{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="hadWebsite">HAD A WEBSITE BEFORE?</label>
            <select
              id="hadWebsite"
              name="hadWebsite"
              value={formData.hadWebsite}
              onChange={handleChange}
              className={ic("hadWebsite") + " appearance-none cursor-pointer"}
            >
              <option value="" disabled>Select one…</option>
              <option value="yes-happy">Yes, and I liked it</option>
              <option value="yes-unhappy">Yes, but it didn&apos;t work well</option>
              <option value="no">No, this would be my first</option>
            </select>
            {errors.hadWebsite && <p className={errorMsgClass}>{errors.hadWebsite}</p>}
          </div>

          <div>
            <label className={labelClass} htmlFor="goals">WHAT DO YOU WANT YOUR WEBSITE TO DO?</label>
            <select
              id="goals"
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              className={ic("goals") + " appearance-none cursor-pointer"}
            >
              <option value="" disabled>Select your main goal…</option>
              <option value="leads">Generate more leads and calls</option>
              <option value="credibility">Look professional and build trust</option>
              <option value="bookings">Accept online bookings</option>
              <option value="reviews">Get more Google reviews</option>
              <option value="all">All of the above</option>
            </select>
            {errors.goals && <p className={errorMsgClass}>{errors.goals}</p>}
          </div>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full py-5 md:py-8 bg-gold hover:bg-gold-light text-black text-base md:text-lg font-bold tracking-widest rounded-sm transition-colors disabled:opacity-60"
          >
            {status === "loading"
              ? "SENDING…"
              : status === "success"
              ? "REQUEST SENT!"
              : "SEND MY FREE DEMO REQUEST"}
          </button>

          {status === "error" && (
            <p className="text-red-400 text-lg text-center">
              Something went wrong. Try emailing ethan@hoeperstudio.com directly.
            </p>
          )}

          <p className="text-gray-muted text-lg text-center">
            I&apos;ll be in touch within 24 hours.
          </p>
        </form>
      </FadeUp>
    </section>
  );
}
