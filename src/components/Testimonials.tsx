import { IconStarFilled } from "@tabler/icons-react";
import FadeUp from "./FadeUp";

const testimonials = [
  {
    quote:
      "Ethan built us a site in less than a week and our phone hasn't stopped ringing. Best investment we've made for our business.",
    name: "Jake M.",
    location: "Tree Services — Meridian, ID",
  },
  {
    quote:
      "I was skeptical at first but the free demo blew me away. Looked better than anything I'd seen from the big agencies — and at a fraction of the price.",
    name: "Rachel T.",
    location: "HVAC — Nampa, ID",
  },
  {
    quote:
      "Professional, fast, and he actually listens. Our old site embarrassed us. Now we send every customer there first.",
    name: "Chris & Dana L.",
    location: "Landscaping — Caldwell, ID",
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
        <FadeUp>
          <p className="text-sm font-bold tracking-[0.3em] text-gold text-center mb-6">
            TESTIMONIALS
          </p>

          <h2 className="font-display text-4xl md:text-7xl lg:text-8xl font-semibold text-white text-center mb-8 md:mb-28 tracking-tight">
            What clients are <span className="text-gold-gradient italic">saying</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.1} className="flex">
              <div className="card-lift group relative w-full overflow-hidden bg-surface-card border border-border-subtle rounded-sm p-6 md:p-12 flex flex-col gap-5 md:gap-8 h-full">
                {/* decorative quote glyph */}
                <span className="pointer-events-none absolute -top-6 right-4 font-display italic font-black text-8xl md:text-9xl leading-none text-gold/[0.07] select-none">
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

                <div className="relative">
                  <p className="text-white font-semibold text-base md:text-lg">{t.name}</p>
                  <p className="text-gray-muted text-sm md:text-base mt-1">{t.location}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
