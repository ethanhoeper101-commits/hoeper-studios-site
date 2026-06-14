"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "PRICING", href: "#pricing" },
  { label: "DEMO", href: "#demo" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-gold/15 bg-black/90 backdrop-blur-xl shadow-[0_8px_30px_-10px_rgba(0,0,0,0.8)]"
          : "border-white/5 bg-black/60 backdrop-blur-md"
      }`}
    >
      <div
        className={`max-w-[1400px] mx-auto px-3 md:px-8 flex items-center justify-between gap-3 md:gap-6 transition-all duration-300 ${
          scrolled ? "h-14 md:h-20" : "h-14 md:h-28"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex-shrink-0 py-1">
          <Image
            src="/logo-transparent.png"
            alt="Hoeper Studios"
            width={400}
            height={112}
            className={`w-auto object-contain transition-all duration-300 ${
              scrolled ? "h-9 md:h-16" : "h-10 md:h-24"
            }`}
            priority
          />
        </a>

        {/* Centered nav links */}
        <div className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold tracking-widest text-white/80 hover:text-gold transition-colors px-6 py-3 border border-gold/20 hover:border-gold/70 hover:bg-gold/[0.04] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#demo"
          className="btn-gold flex-shrink-0 text-xs font-bold tracking-wide px-3 py-2 md:text-sm md:tracking-widest md:px-8 md:py-4 bg-gold hover:bg-gold-light text-black transition-colors rounded-sm"
        >
          GET FREE DEMO
        </a>
      </div>
    </nav>
  );
}
