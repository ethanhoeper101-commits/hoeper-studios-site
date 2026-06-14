"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconPlus } from "@tabler/icons-react";
import FadeUp from "./FadeUp";

const faqs = [
  {
    q: "Is the demo really free?",
    a: "Completely. I build a real, working demo of your website for your business at no cost and no obligation. You only pay if you love it and want to go live. There's no catch — it's how I earn your trust.",
  },
  {
    q: "How long until my site is live?",
    a: "Most sites go live within about a week of approving your demo. Simple sites can be faster. I'll give you a clear timeline up front so you're never left guessing.",
  },
  {
    q: "Do I have to sign a contract?",
    a: "No contracts, ever. Hosting and maintenance are month-to-month, and you can cancel anytime. I'd rather keep your business by doing great work than by locking you in.",
  },
  {
    q: "What if I need changes later?",
    a: "Small edits are included with your hosting. Need new pages, photos, or seasonal updates? Just message me — I handle the technical side so you can stay focused on the job.",
  },
  {
    q: "Will it actually help me get more customers?",
    a: "That's the whole point. Every site is built to look credible, load fast, and make it effortless for visitors to call, book, or request a quote — the things that actually turn clicks into paying jobs.",
  },
  {
    q: "I'm not tech-savvy. Is that a problem?",
    a: "Not at all — that's exactly who I build for. You don't touch anything technical. We talk like normal people, I handle hosting, updates, and the details, and you get a site that just works.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06] animate-drift-slow"
        style={{ background: "radial-gradient(circle at center, #C9A84C 0%, transparent 70%)" }}
      />

      <div className="relative max-w-[900px] mx-auto">
        <FadeUp className="text-center">
          <span className="eyebrow center mb-6">QUESTIONS</span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-white text-center mb-4 md:mb-6 tracking-tight">
            Everything you&apos;re <span className="text-gold-gradient italic">wondering</span>
          </h2>
          <p className="text-gray-muted text-center text-base md:text-lg mb-10 md:mb-14">
            Straight answers. No fine print.
          </p>
        </FadeUp>

        <div className="flex flex-col gap-3 md:gap-4">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <FadeUp key={faq.q} delay={i * 0.05}>
                <div
                  className={`rounded-sm border bg-surface-card/60 transition-colors duration-300 ${
                    isOpen ? "border-gold/45" : "border-border-subtle hover:border-gold/25"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 md:px-8 md:py-7 text-left"
                  >
                    <span className="font-display text-lg md:text-2xl font-medium text-white">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isOpen
                          ? "border-gold/60 bg-gold/10 text-gold"
                          : "border-gold/25 text-gold/70"
                      }`}
                    >
                      <IconPlus size={18} stroke={2} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-6 md:px-8 md:pb-8 text-base md:text-lg leading-relaxed text-gray-muted">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp delay={0.1}>
          <div className="mt-10 md:mt-14 text-center">
            <p className="text-gray-muted mb-5">Still have a question?</p>
            <a
              href="#demo"
              className="btn-gold btn-press inline-flex items-center justify-center rounded-sm bg-gold px-9 py-4 text-sm font-bold tracking-widest text-black shadow-[0_10px_40px_-12px_rgba(201,168,76,0.5)]"
            >
              ASK ME ANYTHING — START FREE
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
