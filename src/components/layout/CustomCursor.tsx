import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CustomCursor() {
  const isTouch = useMediaQuery('(pointer: coarse)')
  const reduced = useReducedMotion()
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40 })
  const springY = useSpring(y, { stiffness: 500, damping: 40 })

  useEffect(() => {
    if (isTouch || reduced) return

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a, button, [data-cursor-hover]'))
    }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [isTouch, reduced, x, y])

  if (isTouch || reduced) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        animate={{
          width: hovering ? 48 : 16,
          height: hovering ? 48 : 16,
          opacity: hovering ? 0.9 : 0.7,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="rounded-full bg-white"
      />
    </motion.div>
  )
}
