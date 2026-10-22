import { motion } from 'framer-motion'
import type { ReactNode, MouseEvent } from 'react'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'ghost'
  className?: string
  target?: string
  rel?: string
}

export function MagneticButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const reduced = useReducedMotion()

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3
    setPos({ x, y })
  }

  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  const baseStyles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-electric to-violet text-white glow-border'
      : 'glass text-white/90 hover:text-white'

  const Comp = (href ? 'a' : 'button') as 'a'

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.5 }}
      className="inline-block"
    >
      <Comp
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 ${baseStyles} ${className}`}
      >
        {children}
      </Comp>
    </motion.div>
  )
}
