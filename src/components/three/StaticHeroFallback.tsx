export function StaticHeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-electric/40 via-violet/30 to-magenta/30 blur-3xl animate-pulse-glow" />
      <div className="absolute left-1/3 top-1/3 h-[220px] w-[220px] rounded-full border border-violet-soft/30 animate-float-slow" />
      <div className="absolute right-1/4 bottom-1/4 h-[160px] w-[160px] rounded-full border border-electric-soft/30 animate-float" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, transparent 0%, #05050c 75%)',
        }}
      />
    </div>
  )
}
