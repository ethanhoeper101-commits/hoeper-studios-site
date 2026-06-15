import { IconMail, IconMapPin, IconArrowUpRight, IconPhone } from "@tabler/icons-react";
import FadeUp from "./FadeUp";

const footerLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Free demo", href: "#demo" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative border-t border-gold/10 bg-black pt-16 md:pt-24 pb-32 md:pb-14 px-6 md:px-8 overflow-hidden"
    >
      {/* faded wordmark */}
      <p
        className="pointer-events-none absolute -bottom-4 md:-bottom-10 left-1/2 -translate-x-1/2 font-display font-black italic whitespace-nowrap text-[22vw] leading-none text-white/[0.03] select-none"
        aria-hidden
      >
        HOEPER
      </p>

      <div className="relative max-w-[1400px] mx-auto">
        <FadeUp>
          {/* Big closing CTA */}
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="font-display text-3xl md:text-6xl font-semibold text-white leading-[1.12] tracking-tight">
              Ready to stop losing jobs to a{" "}
              <span className="text-gold-gradient italic">better-looking</span> competitor?
            </h2>
            <a
              href="#demo"
              className="btn-gold btn-press mt-8 inline-flex items-center gap-3 rounded-sm bg-gold px-10 py-5 text-sm md:text-base font-bold tracking-widest text-black shadow-[0_14px_50px_-16px_rgba(201,168,76,0.7)]"
            >
              GET YOUR FREE DEMO
              <IconArrowUpRight size={18} stroke={2.2} />
            </a>
          </div>
        </FadeUp>

        <div className="hairline-gold mb-10 md:mb-14" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-display text-2xl md:text-3xl font-semibold text-white">
              Hoeper Studios
            </p>
            <p className="mt-3 max-w-xs mx-auto md:mx-0 text-sm leading-relaxed text-gray-muted">
              Premium websites for local service businesses — designed to look credible and
              built to bring in real work.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="flex flex-col items-center gap-3 md:items-start">
            <p className="mb-1 text-xs font-bold tracking-[0.25em] text-gold/70">EXPLORE</p>
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <p className="mb-1 text-xs font-bold tracking-[0.25em] text-gold/70">GET IN TOUCH</p>
            <a
              href="tel:+12089998744"
              className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-gold"
            >
              <IconPhone size={16} className="text-gold" stroke={1.7} />
              (208) 999-8744
            </a>
            <a
              href="mailto:ethan@hoeperstudio.com"
              className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-gold"
            >
              <IconMail size={16} className="text-gold" stroke={1.7} />
              ethan@hoeperstudio.com
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-white/70">
              <IconMapPin size={16} className="text-gold" stroke={1.7} />
              Star, Idaho · serving the Treasure Valley
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm font-bold tracking-[0.25em] text-gold">BASED IN IDAHO</p>
          <p className="text-sm text-white/30">© 2026 Hoeper Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
