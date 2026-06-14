import FadeUp from "./FadeUp";

export default function Footer() {
  return (
    <FadeUp>
      <footer
        id="contact"
        className="relative border-t border-gold/10 bg-black pt-16 md:pt-24 pb-10 px-8 overflow-hidden"
      >
        {/* faded wordmark */}
        <p
          className="pointer-events-none absolute -bottom-4 md:-bottom-10 left-1/2 -translate-x-1/2 font-display font-black italic whitespace-nowrap text-[22vw] leading-none text-white/[0.03] select-none"
          aria-hidden
        >
          HOEPER
        </p>

        <div className="relative max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pb-12 md:pb-16">
            <div className="text-center sm:text-left">
              <p className="font-display text-2xl md:text-3xl font-semibold text-white">
                Hoeper Studios
              </p>
              <a
                href="mailto:ethan@hoeperstudio.com"
                className="text-base text-gray-muted hover:text-gold transition-colors mt-2 inline-block"
              >
                ethan@hoeperstudio.com
              </a>
            </div>

            <a
              href="#demo"
              className="btn-gold text-sm font-bold tracking-widest px-8 py-4 bg-gold hover:bg-gold-light text-black transition-colors rounded-sm"
            >
              GET YOUR FREE DEMO
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-white/5">
            <p className="text-sm font-bold tracking-[0.25em] text-gold">BASED IN IDAHO</p>
            <p className="text-sm text-white/30">© 2026 Hoeper Studios</p>
          </div>
        </div>
      </footer>
    </FadeUp>
  );
}
