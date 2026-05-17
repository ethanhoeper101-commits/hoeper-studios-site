import FadeUp from "./FadeUp";

export default function Footer() {
  return (
    <FadeUp>
    <footer
      id="contact"
      className="border-t border-white/5 bg-black py-16 px-8"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="text-base font-bold tracking-widest text-white">
            HOEPER STUDIOS
          </p>
          <a
            href="mailto:ethan@hoeperstudio.com"
            className="text-base text-gray-muted hover:text-gold transition-colors mt-2 block"
          >
            ethan@hoeperstudio.com
          </a>
        </div>

        <div className="text-center sm:text-right">
          <p className="text-base font-bold tracking-widest text-gold">
            BASED IN IDAHO
          </p>
          <p className="text-base text-white/30 mt-2">
            © 2026 Hoeper Studios
          </p>
        </div>
      </div>
    </footer>
    </FadeUp>
  );
}
