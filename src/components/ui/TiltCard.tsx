import { motion, useMotionTemplate, useSpring } from 'framer-motion'
import type { ReactNode, MouseEvent } from 'react'
import { useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface TiltCardProps {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const rotateX = useSpring(0, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 })
  const glowX = useSpring(50, { stiffness: 200, damping: 25 })
  const glowY = useSpring(50, { stiffness: 200, damping: 25 })

  const glowBackground = useMotionTemplate`radial-gradient(400px circle at ${glowX}% ${glowY}%, color-mix(in srgb, var(--color-violet) 18%, transparent), transparent 70%)`

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 14)
    rotateX.set((0.5 - py) * 14)
    glowX.set(px * 100)
    glowY.set(py * 100)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    glowX.set(50)
    glowY.set(50)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      className={`relative ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: glowBackground }}
      />
      {children}
    </motion.div>
  )
}
