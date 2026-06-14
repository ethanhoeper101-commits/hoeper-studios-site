"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCheck, IconLock, IconClockHour4, IconCircleCheck } from "@tabler/icons-react";
import FadeUp from "./FadeUp";
import CustomSelect, { SelectOption } from "./CustomSelect";

const inputClass =
  "w-full bg-black/40 border border-white/10 focus:border-gold/60 focus:outline-none text-white text-base md:text-xl px-4 md:px-8 py-4 md:py-6 rounded-sm placeholder-white/30 transition-colors";

const inputErrorClass =
  "w-full bg-black/40 border border-red-500/60 focus:border-red-500/80 focus:outline-none text-white text-base md:text-xl px-4 md:px-8 py-4 md:py-6 rounded-sm placeholder-white/30 transition-colors";

const labelClass = "block text-sm font-bold tracking-widest text-gold/80 mb-4";

const errorMsgClass = "mt-2 text-sm text-red-400";

const websiteOptions: SelectOption[] = [
  { value: "yes-happy", label: "Yes, and I liked it" },
  { value: "yes-unhappy", label: "Yes, but it didn't work well" },
  { value: "no", label: "No, this would be my first" },
];

const goalOptions: SelectOption[] = [
  { value: "leads", label: "Generate more leads and calls" },
  { value: "credibility", label: "Look professional and build trust" },
  { value: "bookings", label: "Accept online bookings" },
  { value: "reviews", label: "Get more Google reviews" },
  { value: "all", label: "All of the above" },
];

const reassurances = [
  { icon: IconLock, label: "No spam, ever" },
  { icon: IconClockHour4, label: "Reply within 24 hours" },
  { icon: IconCircleCheck, label: "No cost, no commitment" },
];

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

  function handleSelect(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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
        <div className="text-center">
          <span className="eyebrow center mb-6">FREE DEMO</span>
          <h2 className="font-display text-4xl md:text-7xl font-semibold text-white text-center mb-5 tracking-tight leading-[1.15] pb-1">
            I&apos;ll build a free demo of
            <span className="text-gold-gradient italic"> your website.</span>
          </h2>
          <p className="text-gray-muted text-center text-base md:text-xl mb-10 md:mb-14">
            No cost. No commitment. You only pay if you love it.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6 rounded-sm border border-gold/40 bg-surface-card/60 backdrop-blur-sm p-10 md:p-16 text-center shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
                className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-gold/10"
              >
                <IconCheck size={42} className="text-gold" stroke={2.5} />
              </motion.span>
              <h3 className="font-display text-3xl md:text-5xl font-semibold text-white">
                Request received.
              </h3>
              <p className="max-w-md text-base md:text-lg text-gray-muted">
                Thanks for reaching out. I&apos;ll review your details and be in touch within
                24 hours to start building your free demo.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-5 md:gap-8 rounded-sm border border-border-gold bg-surface-card/50 backdrop-blur-sm p-6 md:p-12 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-10">
                <div>
                  <label className={labelClass} htmlFor="businessName">BUSINESS NAME</label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    autoComplete="organization"
                    aria-invalid={!!errors.businessName}
                    placeholder="Acme Tree Service"
                    value={formData.businessName}
                    onChange={handleChange}
                    className={ic("businessName")}
                  />
                  {errors.businessName && <p role="alert" className={errorMsgClass}>{errors.businessName}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="businessType">TYPE OF BUSINESS</label>
                  <input
                    id="businessType"
                    name="businessType"
                    type="text"
                    autoComplete="off"
                    aria-invalid={!!errors.businessType}
                    placeholder="Tree Services, HVAC, Plumbing…"
                    value={formData.businessType}
                    onChange={handleChange}
                    className={ic("businessType")}
                  />
                  {errors.businessType && <p role="alert" className={errorMsgClass}>{errors.businessType}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="email">EMAIL ADDRESS</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    aria-invalid={!!errors.email}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={ic("email")}
                  />
                  {errors.email && <p role="alert" className={errorMsgClass}>{errors.email}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="phone">PHONE NUMBER</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    aria-invalid={!!errors.phone}
                    placeholder="(208) 555-0100"
                    value={formData.phone}
                    onChange={handleChange}
                    className={ic("phone")}
                  />
                  {errors.phone && <p role="alert" className={errorMsgClass}>{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="hadWebsite">HAD A WEBSITE BEFORE?</label>
                <CustomSelect
                  id="hadWebsite"
                  name="hadWebsite"
                  value={formData.hadWebsite}
                  options={websiteOptions}
                  placeholder="Select one…"
                  error={!!errors.hadWebsite}
                  onChange={handleSelect}
                />
                {errors.hadWebsite && <p role="alert" className={errorMsgClass}>{errors.hadWebsite}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="goals">WHAT DO YOU WANT YOUR WEBSITE TO DO?</label>
                <CustomSelect
                  id="goals"
                  name="goals"
                  value={formData.goals}
                  options={goalOptions}
                  placeholder="Select your main goal…"
                  error={!!errors.goals}
                  onChange={handleSelect}
                />
                {errors.goals && <p role="alert" className={errorMsgClass}>{errors.goals}</p>}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-gold btn-press w-full py-5 md:py-6 bg-gold hover:bg-gold-light text-black text-base md:text-lg font-bold tracking-widest rounded-sm disabled:opacity-60 shadow-[0_10px_40px_-12px_rgba(201,168,76,0.5)]"
              >
                {status === "loading" ? "SENDING…" : "SEND MY FREE DEMO REQUEST"}
              </button>

              {status === "error" && (
                <p className="text-red-400 text-lg text-center">
                  Something went wrong. Try emailing ethan@hoeperstudio.com directly.
                </p>
              )}

              {/* Reassurance row */}
              <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 pt-1">
                {reassurances.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 text-sm text-gray-muted"
                  >
                    <Icon size={16} className="text-gold" stroke={1.7} />
                    {label}
                  </span>
                ))}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </FadeUp>
    </section>
  );
}
