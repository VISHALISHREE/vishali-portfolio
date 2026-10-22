import { useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const STAR_COLORS_WHITE = ['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,0.65)']
const STAR_COLORS_TINT = ['rgba(143,180,255,0.85)', 'rgba(196,167,255,0.85)']

function buildBoxShadow(count: number, tintRatio: number) {
  const shadows: string[] = []
  for (let i = 0; i < count; i++) {
    const x = (Math.random() * 100).toFixed(2)
    const y = (Math.random() * 100).toFixed(2)
    const useTint = Math.random() < tintRatio
    const palette = useTint ? STAR_COLORS_TINT : STAR_COLORS_WHITE
    const color = palette[Math.floor(Math.random() * palette.length)]
    shadows.push(`${x}vw ${y}vh 0 ${color}`)
  }
  return shadows.join(', ')
}

const SHOOTING_STARS = [
  { top: '8%', left: '72%', delay: '0s', duration: '7s' },
  { top: '18%', left: '45%', delay: '3.2s', duration: '9s' },
  { top: '30%', left: '85%', delay: '6.5s', duration: '8s' },
  { top: '4%', left: '25%', delay: '10s', duration: '10s' },
]

export function GalaxyBackground() {
  const reduced = useReducedMotion()

  const smBoxShadow = useMemo(() => buildBoxShadow(260, 0.08), [])
  const mdBoxShadow = useMemo(() => buildBoxShadow(130, 0.14), [])
  const lgBoxShadow = useMemo(() => buildBoxShadow(55, 0.2), [])

  const smRef = useRef<HTMLDivElement>(null)
  const mdRef = useRef<HTMLDivElement>(null)
  const lgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return

    let ticking = false

    const update = () => {
      const y = window.scrollY
      if (smRef.current) smRef.current.style.transform = `translate3d(0, ${y * 0.015}px, 0)`
      if (mdRef.current) mdRef.current.style.transform = `translate3d(0, ${y * 0.03}px, 0)`
      if (lgRef.current) lgRef.current.style.transform = `translate3d(0, ${y * 0.05}px, 0)`
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduced])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-ink" />

      <div
        className="absolute left-[8%] top-[12%] h-[380px] w-[380px] rounded-full bg-violet/15 blur-3xl animate-float-slow"
      />
      <div
        className="absolute right-[6%] top-[38%] h-[320px] w-[320px] rounded-full bg-electric/15 blur-3xl animate-float"
      />
      <div
        className="absolute left-[30%] bottom-[8%] h-[300px] w-[300px] rounded-full bg-magenta/10 blur-3xl animate-pulse-glow"
      />

      <div ref={smRef} className="star-layer-sm absolute inset-0" style={{ boxShadow: smBoxShadow }} />
      <div ref={mdRef} className="star-layer-md absolute inset-0" style={{ boxShadow: mdBoxShadow }} />
      <div ref={lgRef} className="star-layer-lg absolute inset-0" style={{ boxShadow: lgBoxShadow }} />

      {!reduced &&
        SHOOTING_STARS.map((s, i) => (
          <span
            key={i}
            className="shooting-star"
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
    </div>
  )
}
