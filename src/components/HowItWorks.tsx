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
    <section id="how-it-works" className="py-40 md:py-52 px-8">
      <div className="max-w-[1400px] mx-auto">
        <FadeUp>
          <p className="text-base font-bold tracking-widest text-gold text-center mb-8">
            HOW IT WORKS
          </p>

          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center mb-32">
            From idea to live in days, not months
          </h2>
        </FadeUp>

        <div className="border border-border-gold rounded-sm grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-gold">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeUp key={step.number} delay={i * 0.1}>
                <div className="p-16 lg:p-20 flex flex-col gap-8">
                  <p className="text-base font-bold tracking-widest text-gold">
                    STEP {step.number}
                  </p>
                  <Icon size={64} className="text-gold" stroke={1.5} />
                  <h3 className="text-4xl font-bold text-white">{step.title}</h3>
                  <p className="text-gray-muted text-xl leading-relaxed">
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
