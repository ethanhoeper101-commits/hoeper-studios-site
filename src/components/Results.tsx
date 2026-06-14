"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
};

const stats: Stat[] = [
  { value: 7, suffix: "-day", label: "Average turnaround to a live site" },
  { value: 100, suffix: "%", label: "Custom built — never a template" },
  { value: 0, prefix: "$", label: "Upfront cost to see your demo" },
  { value: 24, suffix: "hr", label: "Typical reply time to every message" },
];

function CountUp({ value, prefix = "", suffix = "", decimals = 0 }: Stat) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplay(latest.toFixed(decimals));
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

const card: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Results() {
  return (
    <section className="relative px-4 md:px-8 pt-6 md:pt-6 pb-10 md:pb-16 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.5) 50%, transparent)",
        }}
      />
      <div className="relative max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-sm border border-border-subtle bg-border-subtle">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={card}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="group bg-surface-dark px-5 py-8 md:px-8 md:py-14 text-center transition-colors duration-500 hover:bg-surface-card"
            >
              <p className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold leading-none text-gold-gradient">
                <CountUp {...stat} />
              </p>
              <p className="mt-4 text-xs md:text-sm leading-relaxed text-gray-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
