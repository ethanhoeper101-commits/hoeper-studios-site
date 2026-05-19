import FadeUp from "./FadeUp";

const niches = [
  "TREE SERVICES",
  "PLUMBING",
  "CHIROPRACTORS",
  "HVAC",
  "LANDSCAPING",
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden pt-20 md:pt-0"
    >
      {/* Gold radial gradient — upper right accent */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[1300px] h-[1300px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle at center, #C9A84C 0%, transparent 70%)",
        }}
      />

      {/* Centered glow behind headline */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[480px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, #C9A84C 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 text-center">
        {/* Gold rule */}
        <FadeUp delay={0}>
          <div className="flex items-center justify-center mb-6 md:mb-7">
            <div className="h-px w-36 bg-gold" />
          </div>
        </FadeUp>

        {/* Headline */}
        <FadeUp delay={0.05}>
          <h1 className="mb-5 md:mb-7">
            <span className="block text-3xl md:text-4xl font-medium text-white leading-snug mb-3 md:mb-4">
              Your business deserves a website that
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl font-bold italic text-gold leading-tight">
              actually works.
            </span>
          </h1>
        </FadeUp>

        {/* Pain point */}
        <FadeUp delay={0.1}>
          <p className="text-gray-muted italic text-lg md:text-xl mb-8 md:mb-8 max-w-3xl mx-auto leading-relaxed">
            Still losing customers to competitors with a better online presence?
          </p>
        </FadeUp>

        {/* CTA buttons */}
        <FadeUp delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6 md:mb-8">
            <a
              href="#demo"
              className="w-full sm:w-auto text-lg font-bold tracking-widest px-14 py-6 md:px-10 md:py-4 bg-gold hover:bg-gold-light text-black transition-colors rounded-sm"
            >
              GET YOUR FREE DEMO
            </a>
            <a
              href="#pricing"
              className="w-full sm:w-auto text-lg font-bold tracking-widest px-14 py-6 md:px-10 md:py-4 border border-gold/50 hover:border-gold text-gold hover:bg-gold/5 transition-colors rounded-sm"
            >
              SEE PRICING
            </a>
          </div>
        </FadeUp>

        {/* Trust signals */}
        <FadeUp delay={0.2}>
          <p className="text-gold/70 text-sm md:text-base tracking-wider mb-6 md:mb-8">
            Fast turnaround &nbsp;·&nbsp; SEO optimized &nbsp;·&nbsp; No contracts
          </p>
        </FadeUp>

        {/* Niche pills */}
        <FadeUp delay={0.25}>
          <div className="flex flex-wrap justify-center gap-4">
            {niches.map((niche) => (
              <span
                key={niche}
                className="text-base font-bold tracking-widest text-gold/80 border border-gold/30 px-8 py-4 md:px-5 md:py-2.5 rounded-sm"
              >
                {niche}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
