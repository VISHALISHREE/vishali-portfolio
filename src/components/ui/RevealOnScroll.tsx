import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface RevealOnScrollProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

export function RevealOnScroll({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: RevealOnScrollProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
