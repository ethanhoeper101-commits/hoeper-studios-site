import { IconStarFilled } from "@tabler/icons-react";

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
    <section id="testimonials" className="py-40 md:py-52 px-8">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-base font-bold tracking-widest text-gold text-center mb-8">
          TESTIMONIALS
        </p>

        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center mb-32">
          What clients are saying
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-surface-card border border-border-subtle rounded-sm p-16 flex flex-col gap-9"
            >
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStarFilled key={i} size={32} className="text-gold" />
                ))}
              </div>

              <p className="text-white/90 italic text-xl leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div>
                <p className="text-white font-semibold text-xl">{t.name}</p>
                <p className="text-gray-muted text-lg mt-1.5">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
