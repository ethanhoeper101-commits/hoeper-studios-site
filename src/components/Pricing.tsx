import { IconCheck } from "@tabler/icons-react";

const plans = [
  {
    name: "Starter",
    price: "$500",
    billing: "one time",
    hosting: "$50/mo hosting",
    badge: null,
    popular: false,
    features: [
      "5-page professional website",
      "Mobile ready",
      "Google Business setup",
      "Hosting and maintenance",
      "Small edits included",
      "Logo design add-on +$100–150",
    ],
  },
  {
    name: "Growth",
    price: "$750",
    billing: "one time",
    hosting: "$50/mo hosting",
    badge: "MOST POPULAR",
    popular: true,
    features: [
      "Everything in Starter",
      "Logo design included",
      "Contact form and quote request",
      "Click-to-call button",
      "Automated review requests",
      "Before and after photo gallery",
    ],
  },
  {
    name: "Pro",
    price: "$1,000",
    billing: "one time",
    hosting: "$75–100/mo hosting",
    badge: null,
    popular: false,
    features: [
      "Everything in Growth",
      "Online booking via Calendly",
      "4 custom features",
      "Estimate calculator",
      "Seasonal text campaigns",
      "Job completion review requests",
      "3 months free hosting",
      "Monthly performance check-in",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-40 md:py-52 px-8 bg-surface-dark">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-base font-bold tracking-widest text-gold text-center mb-8">
          PRICING
        </p>

        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center mb-6">
          Simple, transparent packages
        </h2>
        <p className="text-gray-muted text-center text-xl mb-32">
          No hidden fees. No long-term contracts. Cancel anytime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col rounded-sm bg-surface-card relative"
              style={{
                border: plan.popular
                  ? "1px solid rgba(201,168,76,0.7)"
                  : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gold text-black text-xs font-bold tracking-widest px-4 py-1.5 rounded-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-12 flex-1 flex flex-col">
                <h3 className="text-base font-bold tracking-widest text-gold mb-10">
                  {plan.name.toUpperCase()}
                </h3>

                <div className="mb-3">
                  <span className="text-7xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-muted text-lg ml-3">{plan.billing}</span>
                </div>
                <p className="text-gold/70 text-lg tracking-wide mb-12">
                  + {plan.hosting}
                </p>

                <ul className="flex flex-col gap-6 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-4 text-xl text-white">
                      <IconCheck size={24} className="text-gold flex-shrink-0 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-12 pb-12">
                <a
                  href="#demo"
                  className="block w-full text-center text-base font-bold tracking-widest py-5 rounded-sm transition-colors"
                  style={
                    plan.popular
                      ? { background: "#C9A84C", color: "#000" }
                      : { border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C" }
                  }
                >
                  GET STARTED
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
