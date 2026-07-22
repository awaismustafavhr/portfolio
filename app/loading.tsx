export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0f]">
      <div className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-accent-purple/20 blur-[100px]" />
      <div className="relative flex flex-col items-center gap-4">
        <div className="glass-panel flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 animate-pulse shadow-glow">
          <span className="font-heading text-2xl font-bold tracking-tight text-gradient">
            AM
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-accent-purple animate-bounce" />
          <div className="h-2 w-2 rounded-full bg-accent-cyan animate-bounce [animation-delay:0.2s]" />
          <div className="h-2 w-2 rounded-full bg-accent-pink animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
}
