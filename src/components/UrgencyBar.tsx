import FadeUp from "./FadeUp";

export default function UrgencyBar() {
  return (
    <FadeUp>
    <div className="w-full bg-surface-dark border-y border-white/5 py-7">
      <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-center gap-5">
        <span className="relative flex h-4 w-4 flex-shrink-0">
          <span className="animate-pulse_dot absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-gold" />
        </span>

        <p className="text-lg tracking-wide text-center">
          <span className="text-gold font-semibold">
            Currently taking 3 new clients this month
          </span>
          <span className="text-gray-muted">
            {" "}— spots fill fast
          </span>
        </p>
      </div>
    </div>
    </FadeUp>
  );
}
