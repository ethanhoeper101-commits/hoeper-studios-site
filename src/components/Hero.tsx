"use client";

import { motion, type Variants } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";

const niches = [
  "TREE SERVICES",
  "PLUMBING",
  "CHIROPRACTORS",
  "HVAC",
  "LANDSCAPING",
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden pt-20 md:pt-0"
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
        className="relative z-10 max-w-[1400px] mx-auto px-8 text-center"
      >
        {/* Animated gold rule */}
        <motion.div variants={item} className="flex items-center justify-center mb-6 md:mb-8">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="h-px w-36 bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={item} className="mb-5 md:mb-8">
          <span className="block text-xl md:text-4xl font-medium text-white/90 leading-snug mb-2 md:mb-4 tracking-tight">
            Your business deserves a website that
          </span>
          <span className="block font-display italic font-semibold text-5xl md:text-8xl lg:text-[8.5rem] leading-[0.95] text-gold-gradient">
            actually works.
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
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-7 md:mb-9"
        >
          <a
            href="#demo"
            className="btn-gold w-full sm:w-auto text-base font-bold tracking-widest px-12 py-5 md:px-12 md:py-5 bg-gold hover:bg-gold-light text-black transition-colors rounded-sm shadow-[0_10px_40px_-12px_rgba(201,168,76,0.6)]"
          >
            GET YOUR FREE DEMO
          </a>
          <a
            href="#pricing"
            className="w-full sm:w-auto text-base font-bold tracking-widest px-12 py-5 md:px-12 md:py-5 border border-gold/50 hover:border-gold text-gold hover:bg-gold/5 transition-colors rounded-sm"
          >
            SEE PRICING
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.p
          variants={item}
          className="text-gold/70 text-sm md:text-base tracking-[0.2em] mb-7 md:mb-9"
        >
          FAST TURNAROUND &nbsp;·&nbsp; SEO OPTIMIZED &nbsp;·&nbsp; NO CONTRACTS
        </motion.p>

        {/* Niche pills */}
        <motion.div variants={item} className="flex flex-wrap justify-center gap-3 md:gap-4">
          {niches.map((niche) => (
            <span
              key={niche}
              className="text-xs md:text-sm font-bold tracking-widest text-gold/80 border border-gold/25 hover:border-gold/60 hover:text-gold bg-gold/[0.03] px-4 py-2 md:px-5 md:py-2.5 rounded-full transition-colors"
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
