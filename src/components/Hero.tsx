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
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Gold radial gradient — upper right */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[900px] h-[900px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, #C9A84C 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[960px] mx-auto px-8 text-center py-28">
        {/* Gold rule */}
        <div className="flex items-center justify-center mb-10">
          <div className="h-px w-20 bg-gold" />
        </div>

        {/* Headline */}
        <h1 className="mb-8">
          <span className="block text-2xl md:text-3xl font-medium text-white leading-snug mb-3">
            Your business deserves a website that
          </span>
          <span className="block text-6xl md:text-7xl lg:text-8xl font-bold italic text-gold leading-tight">
            actually works.
          </span>
        </h1>

        {/* Pain point */}
        <p className="text-gray-muted italic text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Still losing customers to competitors with a better online presence?
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="#demo"
            className="w-full sm:w-auto text-sm font-bold tracking-widest px-10 py-5 bg-gold hover:bg-gold-light text-black transition-colors rounded-sm"
          >
            GET YOUR FREE DEMO
          </a>
          <a
            href="#pricing"
            className="w-full sm:w-auto text-sm font-bold tracking-widest px-10 py-5 border border-gold/50 hover:border-gold text-gold hover:bg-gold/5 transition-colors rounded-sm"
          >
            SEE PRICING
          </a>
        </div>

        {/* Trust signals */}
        <p className="text-gold/70 text-base tracking-wider mb-12">
          Fast turnaround &nbsp;·&nbsp; SEO optimized &nbsp;·&nbsp; No contracts
        </p>

        {/* Niche pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {niches.map((niche) => (
            <span
              key={niche}
              className="text-xs font-bold tracking-widest text-gold/80 border border-gold/30 px-5 py-2.5 rounded-sm"
            >
              {niche}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
