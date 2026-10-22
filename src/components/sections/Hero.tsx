import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { profile } from '../../data/profile'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { isWebGLAvailable } from '../../lib/webgl'
import { StaticHeroFallback } from '../three/StaticHeroFallback'
import { MagneticButton } from '../ui/MagneticButton'

const HeroScene = lazy(() =>
  import('../three/HeroScene').then((m) => ({ default: m.HeroScene })),
)

export function Hero() {
  const reduced = useReducedMotion()
  const [webglOk, setWebglOk] = useState(true)

  useEffect(() => {
    setWebglOk(isWebGLAvailable())
  }, [])

  const useScene = webglOk && !reduced

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {useScene ? (
        <Suspense fallback={<StaticHeroFallback />}>
          <HeroScene />
        </Suspense>
      ) : (
        <StaticHeroFallback />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs tracking-wide text-white/70 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-electric-soft animate-pulse-glow" />
            Open to opportunities
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-white">
            Hi, I'm {profile.name.split(' ')[0]}
            <span className="text-gradient block">{profile.headline}</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-white/65 max-w-xl">
            {profile.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              onClick={() =>
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Explore My Work
            </MagneticButton>
            <MagneticButton variant="ghost" href={profile.resumeFile} target="_blank" rel="noopener noreferrer">
              <Download size={16} />
              Download Resume
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown size={16} />
      </motion.a>
    </section>
  )
}
