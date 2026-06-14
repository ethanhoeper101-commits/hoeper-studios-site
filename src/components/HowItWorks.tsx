import { IconMessage, IconCode, IconRocket } from "@tabler/icons-react";
import FadeUp from "./FadeUp";

const steps = [
  {
    number: "01",
    icon: IconMessage,
    title: "We talk",
    description:
      "Tell me about your business and what you want your website to do. No jargon, no pressure.",
  },
  {
    number: "02",
    icon: IconCode,
    title: "I build your demo",
    description:
      "A real working demo built for your business — no templates, no cost, no commitment required.",
  },
  {
    number: "03",
    icon: IconRocket,
    title: "You go live",
    description:
      "Love it? We go live. I handle hosting, edits, and maintenance so you can focus on your work.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 md:py-52 px-4 md:px-8 overflow-hidden">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.08] animate-drift-slow"
        style={{ background: "radial-gradient(circle at center, #C9A84C 0%, transparent 70%)" }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <FadeUp>
          <p className="text-sm font-bold tracking-[0.3em] text-gold text-center mb-6">
            HOW IT WORKS
          </p>

          <h2 className="font-display text-4xl md:text-7xl lg:text-8xl font-semibold text-white text-center mb-8 md:mb-28 leading-[1.12] pb-1 tracking-tight">
            From idea to live in
            <span className="text-gold-gradient italic"> days, not months</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeUp key={step.number} delay={i * 0.1} className="flex">
                <div className="card-lift group relative w-full overflow-hidden rounded-sm border border-border-gold bg-surface-card/60 p-6 md:p-12 lg:p-14 flex flex-col gap-5 md:gap-7">
                  {/* ghost numeral */}
                  <span className="pointer-events-none absolute -top-6 right-2 md:right-4 font-display font-black italic text-7xl md:text-9xl leading-none text-gold/[0.06] select-none">
                    {step.number}
                  </span>

                  <p className="relative text-xs font-bold tracking-[0.3em] text-gold">
                    STEP {step.number}
                  </p>

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-sm border border-gold/30 bg-gold/[0.06] transition-colors group-hover:border-gold/60">
                    <Icon size={36} className="text-gold" stroke={1.5} />
                  </div>

                  <h3 className="relative font-display text-2xl md:text-4xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="relative text-base md:text-xl text-gray-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
