import { IconStarFilled, IconQuote } from "@tabler/icons-react";
import FadeUp from "./FadeUp";
import SpotlightCard from "./SpotlightCard";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
  initials: string;
};

const featured: Testimonial = {
  quote:
    "Ethan built us a site in less than a week and our phone hasn't stopped ringing. Best investment we've made for our business.",
  name: "Jake M.",
  location: "Tree Services — Meridian, ID",
  initials: "JM",
};

const supporting: Testimonial[] = [
  {
    quote:
      "The free demo blew me away. Looked better than anything I'd seen from the big agencies — at a fraction of the price.",
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

function Stars({ size = 18 }: { size?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, j) => (
        <IconStarFilled key={j} size={size} className="text-gold" />
      ))}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.08] font-display text-sm font-semibold text-gold">
      {initials}
    </span>
  );
}

function SupportingCard({ t }: { t: Testimonial }) {
  return (
    <SpotlightCard className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-sm border border-border-subtle bg-surface-card p-6 md:p-8">
      <Stars size={16} />
      <p className="flex-1 font-display italic text-base md:text-xl leading-relaxed text-white/90">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 border-t border-white/5 pt-4">
        <Avatar initials={t.initials} />
        <div>
          <p className="text-sm font-semibold text-white md:text-base">{t.name}</p>
          <p className="mt-0.5 text-xs text-gray-muted md:text-sm">{t.location}</p>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-16 md:py-28 px-4 md:px-8 overflow-hidden"
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute top-1/4 -left-40 w-[800px] h-[800px] rounded-full opacity-[0.07] animate-drift-slower"
        style={{ background: "radial-gradient(circle at center, #C9A84C 0%, transparent 70%)" }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <FadeUp className="text-center">
          <span className="eyebrow center mb-6">TESTIMONIALS</span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-white text-center mb-4 md:mb-5 tracking-tight">
            What clients are <span className="text-gold-gradient italic">saying</span>
          </h2>
          <div className="mb-10 md:mb-14 flex items-center justify-center gap-3 text-sm text-gray-muted">
            <Stars size={16} />
            <span>5.0 average from local business owners</span>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-5 md:gap-6">
          {/* Featured testimonial */}
          <FadeUp direction="right" className="md:col-span-3 flex">
            <SpotlightCard className="group relative flex w-full flex-col justify-between gap-8 overflow-hidden rounded-sm border border-gold/40 p-7 md:p-12">
              {/* gold-tinted surface */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(150deg, rgba(201,168,76,0.12) 0%, rgba(16,16,16,0.6) 45%, #101010 100%)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(201,168,76,0.8), transparent)",
                }}
              />

              <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/30 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.2em] text-gold">
                  FEATURED REVIEW
                </span>
                <IconQuote
                  size={56}
                  className="text-gold/25 rotate-180"
                  stroke={1.4}
                />
              </div>

              <p className="relative font-display italic text-2xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.25] text-white">
                &ldquo;{featured.quote}&rdquo;
              </p>

              <div className="relative flex items-center gap-4">
                <Avatar initials={featured.initials} />
                <div className="flex-1">
                  <p className="text-base md:text-lg font-semibold text-white">{featured.name}</p>
                  <p className="mt-0.5 text-sm text-gray-muted">{featured.location}</p>
                </div>
                <Stars size={20} />
              </div>
            </SpotlightCard>
          </FadeUp>

          {/* Supporting testimonials */}
          <div className="md:col-span-2 flex flex-col gap-5 md:gap-6">
            {supporting.map((t, i) => (
              <FadeUp key={t.name} direction="left" delay={i * 0.12} className="flex flex-1">
                <SupportingCard t={t} />
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
