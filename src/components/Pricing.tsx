import { IconCheck } from "@tabler/icons-react";
import FadeUp from "./FadeUp";
import SpotlightCard from "./SpotlightCard";

const plans = [
  {
    name: "Starter",
    price: "$500",
    billing: "one time",
    hosting: "$50/mo hosting",
    tagline: "Everything a local business needs to look the part.",
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
    price: "$1,000",
    billing: "one time",
    hosting: "$50/mo hosting",
    tagline: "The sweet spot — built to turn visitors into booked jobs.",
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
    price: "$1,500",
    billing: "one time",
    hosting: "$100/mo hosting",
    tagline: "A full growth engine that works while you're on the job.",
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
    <section
      id="pricing"
      className="relative py-16 md:py-24 px-4 md:px-8 bg-surface-dark overflow-hidden"
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full opacity-[0.07] animate-glow-pulse"
        style={{ background: "radial-gradient(ellipse at center, #C9A84C 0%, transparent 65%)" }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <FadeUp className="text-center">
          <span className="eyebrow center mb-6">PRICING</span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-white text-center mb-4 md:mb-6 tracking-tight">
            Simple, <span className="text-gold-gradient italic">transparent</span> packages
          </h2>
          <p className="text-gray-muted text-center text-base md:text-lg mb-10 md:mb-16">
            No hidden fees. No long-term contracts. Cancel anytime.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <FadeUp key={plan.name} delay={i * 0.12} className="flex">
              <SpotlightCard
                className={`group relative w-full flex flex-col rounded-sm bg-surface-card overflow-hidden ${
                  plan.popular ? "md:-translate-y-3" : ""
                }`}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-sm"
                  style={{
                    border: plan.popular
                      ? "1px solid rgba(201,168,76,0.7)"
                      : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: plan.popular
                      ? "0 30px 70px -30px rgba(201,168,76,0.4)"
                      : undefined,
                  }}
                />

                {/* gold top accent on popular */}
                {plan.popular && (
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                )}

                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gold text-black text-xs font-bold tracking-widest px-4 py-1.5 rounded-sm shadow-[0_8px_24px_-8px_rgba(201,168,76,0.7)]">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="relative p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-sm font-bold tracking-[0.25em] text-gold mb-2">
                    {plan.name.toUpperCase()}
                  </h3>
                  <p className="text-gray-muted text-sm mb-6 min-h-[2.5rem] leading-relaxed">
                    {plan.tagline}
                  </p>

                  <div className="mb-3 flex items-baseline gap-2 flex-wrap">
                    <span className="font-display text-5xl md:text-6xl font-semibold text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-muted text-lg whitespace-nowrap">
                      {plan.billing}
                    </span>
                  </div>
                  <p className="text-gold/70 text-base tracking-wide mb-5 md:mb-6">
                    + {plan.hosting}
                  </p>

                  <div className="h-px w-full bg-gradient-to-r from-gold/20 via-gold/5 to-transparent mb-5 md:mb-6" />

                  <ul className="flex flex-col gap-3 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-white/90"
                      >
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 transition-colors group-hover:bg-gold/25">
                          <IconCheck size={14} className="text-gold" stroke={3} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {"freeHostingPromo" in plan && plan.freeHostingPromo && (
                    <div
                      className="mt-8 flex items-center gap-3 rounded-sm px-5 py-4"
                      style={{
                        background: "rgba(201,168,76,0.12)",
                        border: "1px solid rgba(201,168,76,0.35)",
                      }}
                    >
                      <span className="text-gold text-2xl leading-none">★</span>
                      <span className="text-gold font-bold text-lg tracking-wide">
                        {plan.freeHostingPromo}
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative px-6 pb-6 md:px-8 md:pb-8">
                  <a
                    href="#demo"
                    className={`block w-full text-center text-sm font-bold tracking-widest py-4 rounded-sm transition-colors btn-press ${
                      plan.popular
                        ? "btn-gold bg-gold hover:bg-gold-light text-black"
                        : "btn-ghost border border-gold/40 hover:border-gold hover:bg-gold/5 text-gold"
                    }`}
                  >
                    GET STARTED
                  </a>
                </div>
              </SpotlightCard>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <p className="mt-10 md:mt-14 text-center text-sm text-gray-muted">
            Not sure which fits?{" "}
            <a href="#demo" className="text-gold gold-underline hover:text-gold-light">
              Get a free demo
            </a>{" "}
            and I&apos;ll recommend the right one — no pressure.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
