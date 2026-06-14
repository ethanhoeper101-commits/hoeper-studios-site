import {
  IconBolt,
  IconShieldCheck,
  IconTrendingUp,
  IconClockHour4,
  IconMapPin,
  IconDeviceMobile,
} from "@tabler/icons-react";

const items = [
  { icon: IconBolt, label: "Live in days, not months" },
  { icon: IconShieldCheck, label: "No contracts, cancel anytime" },
  { icon: IconTrendingUp, label: "Built to turn clicks into calls" },
  { icon: IconClockHour4, label: "Replies within 24 hours" },
  { icon: IconMapPin, label: "Based in Idaho, made for Idaho" },
  { icon: IconDeviceMobile, label: "Flawless on every phone" },
];

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-10 md:gap-16 pr-10 md:pr-16">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="flex shrink-0 items-center gap-3">
          <Icon size={18} className="text-gold" stroke={1.6} />
          <span className="whitespace-nowrap text-sm md:text-base tracking-wide text-white/75">
            {label}
          </span>
          <span className="ml-7 md:ml-12 text-gold/30">✦</span>
        </div>
      ))}
    </div>
  );
}

export default function UrgencyBar() {
  return (
    <div className="relative w-full overflow-hidden border-y border-gold/10 bg-surface-dark py-5">
      {/* edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface-dark to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface-dark to-transparent" />

      <div className="flex w-max animate-marquee will-change-transform" aria-hidden>
        <Track />
        <Track />
      </div>

      {/* Accessible static copy for screen readers */}
      <p className="sr-only">
        Live in days not months. No contracts, cancel anytime. Built to turn clicks into
        calls. Replies within 24 hours. Based in Idaho. Flawless on every phone.
      </p>
    </div>
  );
}
