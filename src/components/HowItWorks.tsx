import { IconMessage, IconCode, IconRocket, IconArrowRight } from "@tabler/icons-react";
import FadeUp from "./FadeUp";
import SpotlightCard from "./SpotlightCard";

const steps = [
  {
    number: "01",
    icon: IconMessage,
    title: "We talk",
    description:
      "Tell me about your business and what you want your website to do. No jargon, no pressure — just a real conversation.",
  },
  {
    number: "02",
    icon: IconCode,
    title: "I build your demo",
    description:
      "A real working demo built for your business — no templates, no cost, no commitment required. You see it before you decide.",
  },
  {
    number: "03",
    icon: IconRocket,
    title: "You go live",
    description:
      "Love it? We go live. I handle hosting, edits, and maintenance so you can focus on the work you do best.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 md:py-28 px-4 md:px-8 overflow-hidden">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.08] animate-drift-slow"
        style={{ background: "radial-gradient(circle at center, #C9A84C 0%, transparent 70%)" }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <FadeUp className="text-center">
          <span className="eyebrow center mb-6">HOW IT WORKS</span>
          <h2 className="font-display text-4xl md:text-7xl lg:text-8xl font-semibold text-white text-center mb-4 md:mb-6 leading-[1.12] pb-1 tracking-tight">
            From idea to live in
            <span className="text-gold-gradient italic"> days, not months</span>
          </h2>
          <p className="text-gray-muted text-base md:text-lg max-w-2xl mx-auto mb-10 md:mb-16">
            Three simple steps. Zero risk. You don&apos;t pay a cent until you&apos;ve seen
            exactly what you&apos;re getting.
          </p>
        </FadeUp>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* connector line behind the cards (desktop) */}
          <div className="pointer-events-none absolute top-[4.5rem] left-[16%] right-[16%] hidden md:block">
            <div className="hairline-gold" />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeUp key={step.number} delay={i * 0.12} className="flex">
                <SpotlightCard className="group relative w-full overflow-hidden rounded-sm border border-border-gold bg-surface-card/60 p-6 md:p-12 lg:p-14 flex flex-col gap-5 md:gap-7">
                  {/* ghost numeral */}
                  <span className="pointer-events-none absolute -top-6 right-2 md:right-4 font-display font-black italic text-7xl md:text-9xl leading-none text-gold/[0.06] select-none transition-colors duration-500 group-hover:text-gold/[0.1]">
                    {step.number}
                  </span>

                  <p className="relative text-xs font-bold tracking-[0.3em] text-gold">
                    STEP {step.number}
                  </p>

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-sm border border-gold/30 bg-gold/[0.06] transition-all duration-500 group-hover:border-gold/60 group-hover:bg-gold/[0.12] group-hover:scale-[1.06]">
                    <Icon size={36} className="text-gold" stroke={1.5} />
                  </div>

                  <h3 className="relative font-display text-2xl md:text-4xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="relative text-base md:text-xl text-gray-muted leading-relaxed">
                    {step.description}
                  </p>
                </SpotlightCard>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp delay={0.1} className="mt-10 md:mt-14 flex justify-center">
          <a
            href="#demo"
            className="btn-ghost group inline-flex items-center gap-3 rounded-sm border border-gold/40 px-9 py-4 text-sm font-bold tracking-widest text-gold hover:border-gold hover:bg-gold/5"
          >
            START WITH A FREE DEMO
            <IconArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
