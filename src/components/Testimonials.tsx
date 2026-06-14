import { IconStarFilled } from "@tabler/icons-react";
import FadeUp from "./FadeUp";
import SpotlightCard from "./SpotlightCard";

const testimonials = [
  {
    quote:
      "Ethan built us a site in less than a week and our phone hasn't stopped ringing. Best investment we've made for our business.",
    name: "Jake M.",
    location: "Tree Services — Meridian, ID",
    initials: "JM",
  },
  {
    quote:
      "I was skeptical at first but the free demo blew me away. Looked better than anything I'd seen from the big agencies — and at a fraction of the price.",
    name: "Rachel T.",
    location: "HVAC — Nampa, ID",
    initials: "RT",
  },
  {
    quote:
      "Professional, fast, and he actually listens. Our old site embarrassed us. Now we send every customer there first.",
    name: "Chris & Dana L.",
    location: "Landscaping — Caldwell, ID",
    initials: "CL",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-16 md:py-52 px-4 md:px-8 overflow-hidden"
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute top-1/4 -left-40 w-[800px] h-[800px] rounded-full opacity-[0.07] animate-drift-slower"
        style={{ background: "radial-gradient(circle at center, #C9A84C 0%, transparent 70%)" }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <FadeUp className="text-center">
          <span className="eyebrow center mb-6">TESTIMONIALS</span>
          <h2 className="font-display text-4xl md:text-7xl lg:text-8xl font-semibold text-white text-center mb-4 md:mb-6 tracking-tight">
            What clients are <span className="text-gold-gradient italic">saying</span>
          </h2>
          <div className="mb-12 md:mb-24 flex items-center justify-center gap-3 text-sm text-gray-muted">
            <span className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, j) => (
                <IconStarFilled key={j} size={16} />
              ))}
            </span>
            5.0 average from local business owners
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.12} className="flex">
              <SpotlightCard className="group relative w-full overflow-hidden bg-surface-card border border-border-subtle rounded-sm p-6 md:p-12 flex flex-col gap-5 md:gap-8 h-full">
                {/* decorative quote glyph */}
                <span className="pointer-events-none absolute -top-6 right-4 font-display italic font-black text-8xl md:text-9xl leading-none text-gold/[0.07] select-none transition-colors duration-500 group-hover:text-gold/[0.12]">
                  &rdquo;
                </span>

                <div className="relative flex gap-1.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <IconStarFilled key={j} size={22} className="text-gold" />
                  ))}
                </div>

                <p className="relative font-display italic text-white/90 text-lg md:text-2xl leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="relative flex items-center gap-4 pt-2 border-t border-white/5">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.08] font-display text-sm font-semibold text-gold">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-white font-semibold text-base md:text-lg">{t.name}</p>
                    <p className="text-gray-muted text-sm mt-0.5">{t.location}</p>
                  </div>
                </div>
              </SpotlightCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
