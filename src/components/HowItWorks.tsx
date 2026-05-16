import { IconMessage, IconCode, IconRocket } from "@tabler/icons-react";

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
    <section id="how-it-works" className="py-32 md:py-40 px-8">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-sm font-bold tracking-widest text-gold text-center mb-6">
          HOW IT WORKS
        </p>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-24">
          From idea to live in days, not months
        </h2>

        <div className="border border-border-gold rounded-sm grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-gold">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="p-12 lg:p-16 flex flex-col gap-7">
                <p className="text-sm font-bold tracking-widest text-gold">
                  STEP {step.number}
                </p>
                <Icon size={48} className="text-gold" stroke={1.5} />
                <h3 className="text-3xl font-bold text-white">{step.title}</h3>
                <p className="text-gray-muted text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
