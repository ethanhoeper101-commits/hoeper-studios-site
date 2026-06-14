"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { IconChevronDown, IconStarFilled } from "@tabler/icons-react";

const niches = [
  "TREE SERVICES",
  "PLUMBING",
  "CHIROPRACTORS",
  "HVAC",
  "LANDSCAPING",
  "ROOFING",
];

// Rotating promise words in the headline — kept short so they never wrap
const rotators = ["works.", "wins jobs.", "earns trust.", "gets calls."];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % rotators.length), 2600);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] md:min-h-[90vh] flex items-start md:items-center justify-center overflow-hidden pt-24 md:pt-24 md:pb-16"
    >
      {/* ── Atmospheric gradient-mesh background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[1200px] h-[1200px] rounded-full opacity-20 animate-drift-slower"
          style={{
            background:
              "radial-gradient(circle at center, #C9A84C 0%, transparent 68%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[520px] rounded-full animate-glow-pulse"
          style={{
            background:
              "radial-gradient(ellipse at center, #C9A84C 0%, transparent 62%)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-32 w-[900px] h-[900px] rounded-full opacity-[0.12] animate-drift-slow"
          style={{
            background:
              "radial-gradient(circle at center, #E2C97E 0%, transparent 70%)",
          }}
        />
        {/* faint dotted grid for texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(201,168,76,0.9) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 text-center"
      >
        {/* Availability badge */}
        <motion.div variants={item} className="flex justify-center mb-7 md:mb-9">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-gold/[0.04] px-4 py-2 text-[11px] md:text-xs font-bold tracking-[0.22em] text-gold/90 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse_dot absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            BOOKING 3 NEW IDAHO BUSINESSES THIS MONTH
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={item} className="mb-6 md:mb-8">
          <span className="block text-xl md:text-4xl font-medium text-white/90 leading-snug mb-2 md:mb-4 tracking-tight">
            Your business deserves a website that
          </span>
          <span className="relative block h-[3.8rem] md:h-[7.5rem] lg:h-[8.5rem]">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotators[index]}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -28, filter: "blur(8px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 block whitespace-nowrap font-display italic font-semibold text-5xl md:text-8xl lg:text-[7.5rem] leading-[1.06] pb-2 md:pb-3 text-gold-shimmer"
              >
                {rotators[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Pain point */}
        <motion.p
          variants={item}
          className="font-display italic text-gray-muted text-lg md:text-2xl mb-9 md:mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Still losing customers to competitors with a better online presence?
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 mb-6 md:mb-8"
        >
          <a
            href="#demo"
            className="btn-gold btn-press w-full sm:w-auto text-base font-bold tracking-widest px-12 py-5 bg-gold hover:bg-gold-light text-black rounded-sm shadow-[0_10px_40px_-12px_rgba(201,168,76,0.6)]"
          >
            GET YOUR FREE DEMO
          </a>
          <a
            href="#pricing"
            className="btn-ghost w-full sm:w-auto text-base font-bold tracking-widest px-12 py-5 border border-gold/50 hover:border-gold text-gold hover:bg-gold/5 rounded-sm"
          >
            SEE PRICING
          </a>
        </motion.div>

        {/* Social proof + trust signals */}
        <motion.div
          variants={item}
          className="flex flex-col items-center gap-3 mb-8 md:mb-9"
        >
          <span className="flex items-center gap-3 text-sm text-white/70">
            <span className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStarFilled key={i} size={15} />
              ))}
            </span>
            <span className="font-medium">
              Loved by local crews across the Treasure Valley
            </span>
          </span>
          <span className="text-gold/70 text-xs md:text-sm tracking-[0.2em]">
            FAST TURNAROUND &nbsp;·&nbsp; SEO READY &nbsp;·&nbsp; NO CONTRACTS
          </span>
        </motion.div>

        {/* Niche pills */}
        <motion.div variants={item} className="flex flex-wrap justify-center gap-3 md:gap-4">
          {niches.map((niche) => (
            <span
              key={niche}
              className="chip-gold text-xs md:text-sm font-bold tracking-widest text-gold/80 px-4 py-2 md:px-5 md:py-2.5 rounded-full"
            >
              {niche}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#how-it-works"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-gold/50 hover:text-gold transition-colors"
        aria-label="Scroll to how it works"
      >
        <span className="text-[10px] font-bold tracking-[0.3em]">SCROLL</span>
        <IconChevronDown size={18} className="animate-bounce-down" />
      </motion.a>
    </section>
  );
}
