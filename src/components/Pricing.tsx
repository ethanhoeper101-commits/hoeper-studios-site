import { IconCheck } from "@tabler/icons-react";
import FadeUp from "./FadeUp";

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
    hosting: "$100/mo hosting",
    badge: null,
    popular: false,
    freeHostingPromo: "3 months free hosting — then $100/mo",
    features: [
      "Everything in Growth",
      "Logo design included",
      "Online booking linked to Google Calendar",
      "Estimate calculator",
      "Seasonal text campaigns — sent automatically in spring, fall, and before storm season",
      "Job completion review request fires after every job",
      "Review showcase — auto-pulls Google reviews onto the site",
      "4 custom features you choose — pick from live chat, service area map, job application form, emergency call banner, before & after gallery, and more",
      "Monthly performance report — traffic, leads, and Google rankings",
      "Google Analytics setup included",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-40 md:py-28 px-4 md:px-8 bg-surface-dark">
      <div className="max-w-[1400px] mx-auto">
        <FadeUp>
          <p className="text-base font-bold tracking-widest text-gold text-center mb-8">
            PRICING
          </p>

          <h2 className="text-6xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6">
            Simple, transparent packages
          </h2>
          <p className="text-gray-muted text-center text-xl md:text-base mb-32 md:mb-12">
            No hidden fees. No long-term contracts. Cancel anytime.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <FadeUp key={plan.name} delay={i * 0.1} className="flex">
              <div
                className="flex flex-col rounded-sm bg-surface-card relative w-full"
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

                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <h3 className="text-base font-bold tracking-widest text-gold mb-10 md:mb-4">
                    {plan.name.toUpperCase()}
                  </h3>

                  <div className="mb-3 flex items-baseline gap-2 flex-wrap">
                    <span className="text-5xl md:text-6xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-muted text-lg whitespace-nowrap">{plan.billing}</span>
                  </div>
                  <p className="text-gold/70 text-lg tracking-wide mb-12 md:mb-5">
                    + {plan.hosting}
                  </p>

                  <ul className="flex flex-col gap-6 md:gap-3 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-4 text-xl md:text-sm text-white">
                        <IconCheck size={24} className="text-gold flex-shrink-0 mt-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {"freeHostingPromo" in plan && plan.freeHostingPromo && (
                    <div className="mt-8 flex items-center gap-3 rounded-sm px-5 py-4"
                      style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.35)" }}>
                      <span className="text-gold text-2xl leading-none">★</span>
                      <span className="text-gold font-bold text-lg tracking-wide">{plan.freeHostingPromo}</span>
                    </div>
                  )}
                </div>

                <div className="px-6 pb-6 md:px-7 md:pb-7">
                  <a
                    href="#demo"
                    className="block w-full text-center text-base font-bold tracking-widest py-5 md:py-3 rounded-sm transition-colors"
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
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
