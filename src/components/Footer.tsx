export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-white/5 bg-black py-12 px-8"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="text-center sm:text-left">
          <p className="text-sm font-bold tracking-widest text-white">
            HOEPER STUDIOS
          </p>
          <a
            href="mailto:ethan@hoeperstudio.com"
            className="text-sm text-gray-muted hover:text-gold transition-colors mt-1.5 block"
          >
            ethan@hoeperstudio.com
          </a>
        </div>

        <div className="text-center sm:text-right">
          <p className="text-sm font-bold tracking-widest text-gold">
            BASED IN IDAHO
          </p>
          <p className="text-sm text-white/30 mt-1.5">
            © 2025 Hoeper Studios
          </p>
        </div>
      </div>
    </footer>
  );
}
