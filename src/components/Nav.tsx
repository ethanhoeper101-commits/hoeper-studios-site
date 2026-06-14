"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

const links = [
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "PRICING", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "DEMO", href: "#demo" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-gold/15 bg-black/90 backdrop-blur-xl shadow-[0_8px_30px_-10px_rgba(0,0,0,0.8)]"
          : "border-white/5 bg-black/50 backdrop-blur-md"
      }`}
    >
      <div
        className={`max-w-[1400px] mx-auto px-3 md:px-8 flex items-center justify-between gap-3 md:gap-6 transition-all duration-300 ${
          scrolled ? "h-14 md:h-20" : "h-14 md:h-28"
        }`}
      >
        {/* Logo */}
        <a href="#hero" className="flex-shrink-0 py-1" aria-label="Hoeper Studios — home">
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

        {/* Centered nav links (desktop) */}
        <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-bold tracking-widest text-white/75 hover:text-gold transition-colors px-5 py-3"
            >
              {link.label}
              <span className="pointer-events-none absolute left-5 right-5 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-light transition-transform duration-300 ease-out-expo group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* CTA */}
          <a
            href="#demo"
            className="btn-gold btn-press hidden sm:inline-flex text-xs font-bold tracking-wide px-4 py-2.5 md:text-sm md:tracking-widest md:px-8 md:py-4 bg-gold hover:bg-gold-light text-black rounded-sm shadow-[0_10px_30px_-12px_rgba(201,168,76,0.6)]"
          >
            GET FREE DEMO
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-sm border border-gold/30 text-gold transition-colors hover:border-gold/70 hover:bg-gold/[0.05]"
          >
            {menuOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-gold/10 bg-black/95 backdrop-blur-xl"
          >
            <div className="flex flex-col px-5 py-4">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.05, duration: 0.3 }}
                  className="flex items-center justify-between border-b border-white/5 py-4 text-base font-bold tracking-widest text-white/80"
                >
                  {link.label}
                  <span className="text-gold/50">↗</span>
                </motion.a>
              ))}
              <a
                href="#demo"
                onClick={() => setMenuOpen(false)}
                className="btn-gold mt-5 w-full rounded-sm bg-gold py-4 text-center text-sm font-bold tracking-widest text-black"
              >
                GET YOUR FREE DEMO
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
