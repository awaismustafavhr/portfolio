export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(180deg, #07070d 0%, #0a0a16 60%, #080814 100%)" }}
    >
      {/* Ambient glow */}
      {/* Ambient glows (optimized for fewer repaints) */}
      <div className="pointer-events-none absolute h-[280px] w-[280px] rounded-full bg-accent-purple/18 loading-ambient-glow" />
      <div className="pointer-events-none absolute h-[220px] w-[220px] rounded-full bg-accent-cyan/12 loading-ambient-glow" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Logo badge */}
        <div className="relative">
          <div className="absolute -inset-[2px] rounded-[22px] accent-gradient-animated opacity-75" style={{ filter: "blur(1px)" }} />
          <div className="glass-panel-strong relative flex h-[68px] w-[68px] items-center justify-center rounded-[20px]">
            <span className="font-heading text-2xl font-bold tracking-tight text-gradient">AM</span>
          </div>
        </div>

        {/* Indeterminate loading bar (optimized) */}
        <div className="loading-bar h-[3px] w-48 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
          <div className="loading-bar-thumb" />
        </div>
      </div>
    </div>
  );
}
