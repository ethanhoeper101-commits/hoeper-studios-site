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
        className="pointer-events-none absolute -top-32 -right-32 w-[1000px] h-[1000px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, #C9A84C 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-8 text-center py-12">
        {/* Gold rule */}
        <div className="flex items-center justify-center mb-10">
          <div className="h-px w-24 bg-gold" />
        </div>

        {/* Headline */}
        <h1 className="mb-8">
          <span className="block text-3xl md:text-4xl font-medium text-white leading-snug mb-4">
            Your business deserves a website that
          </span>
          <span className="block text-7xl md:text-8xl lg:text-9xl font-bold italic text-gold leading-tight">
            actually works.
          </span>
        </h1>

        {/* Pain point */}
        <p className="text-gray-muted italic text-xl md:text-2xl mb-14 max-w-2xl mx-auto leading-relaxed">
          Still losing customers to competitors with a better online presence?
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12">
          <a
            href="#demo"
            className="w-full sm:w-auto text-base font-bold tracking-widest px-12 py-5 bg-gold hover:bg-gold-light text-black transition-colors rounded-sm"
          >
            GET YOUR FREE DEMO
          </a>
          <a
            href="#pricing"
            className="w-full sm:w-auto text-base font-bold tracking-widest px-12 py-5 border border-gold/50 hover:border-gold text-gold hover:bg-gold/5 transition-colors rounded-sm"
          >
            SEE PRICING
          </a>
        </div>

        {/* Trust signals */}
        <p className="text-gold/70 text-base tracking-wider mb-14">
          Fast turnaround &nbsp;·&nbsp; SEO optimized &nbsp;·&nbsp; No contracts
        </p>

        {/* Niche pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {niches.map((niche) => (
            <span
              key={niche}
              className="text-sm font-bold tracking-widest text-gold/80 border border-gold/30 px-6 py-3 rounded-sm"
            >
              {niche}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
