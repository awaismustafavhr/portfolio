export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(180deg, #07070d 0%, #0a0a16 60%, #080814 100%)" }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute h-[320px] w-[320px] rounded-full bg-accent-purple/20 blur-[96px]" />
      <div className="pointer-events-none absolute h-[260px] w-[260px] rounded-full bg-accent-cyan/15 blur-[80px]" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Logo badge */}
        <div className="relative">
          <div className="absolute -inset-[2px] rounded-[22px] accent-gradient-animated opacity-75" style={{ filter: "blur(1px)" }} />
          <div className="glass-panel-strong relative flex h-[68px] w-[68px] items-center justify-center rounded-[20px]">
            <span className="font-heading text-2xl font-bold tracking-tight text-gradient">AM</span>
          </div>
        </div>

        {/* Indeterminate loading bar */}
        <div className="h-[3px] w-48 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
          <div
            className="h-full w-1/3 rounded-full accent-gradient-animated"
            style={{ animation: "shimmer 1.4s ease-in-out infinite" }}
          />
        </div>
      </div>
    </div>
  );
}
