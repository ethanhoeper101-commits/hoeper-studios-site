"use client";

import Image from "next/image";

const links = [
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "PRICING", href: "#pricing" },
  { label: "DEMO", href: "#demo" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-8 h-28 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Hoeper Studios"
            width={360}
            height={100}
            className="h-20 w-auto object-contain"
            priority
          />
        </a>

        {/* Centered nav links */}
        <div className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold tracking-widest text-white/80 hover:text-gold transition-colors px-6 py-3 border border-gold/30 hover:border-gold/70 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#demo"
          className="flex-shrink-0 text-sm font-bold tracking-widest px-8 py-4 bg-gold hover:bg-gold-light text-black transition-colors rounded-sm"
        >
          GET FREE DEMO
        </a>
      </div>
    </nav>
  );
}
