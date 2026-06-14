import FadeUp from "./FadeUp";

export default function UrgencyBar() {
  return (
    <FadeUp>
      <div className="relative w-full bg-surface-dark border-y border-gold/10 py-6 overflow-hidden">
        {/* subtle sweeping gold tint */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.06) 50%, transparent 100%)",
          }}
        />
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col items-center justify-center gap-2 md:flex-row md:gap-5">
          <span className="relative flex h-3.5 w-3.5 flex-shrink-0">
            <span className="animate-pulse_dot absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gold" />
          </span>

          <p className="text-sm md:text-lg tracking-wide text-center">
            <span className="text-gold font-semibold">
              Currently taking 3 new clients this month
            </span>
            <span className="text-gray-muted"> — spots fill fast</span>
          </p>
        </div>
      </div>
    </FadeUp>
  );
}
