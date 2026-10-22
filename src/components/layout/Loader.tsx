import { motion } from 'framer-motion'

export function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-14 w-14">
          <span className="absolute inset-0 rounded-full border-2 border-white/10" />
          <motion.span
            className="absolute inset-0 rounded-full border-t-2 border-violet-soft"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </div>
        <span className="font-display text-xs tracking-[0.4em] uppercase text-white/50">
          Loading
        </span>
      </div>
    </motion.div>
  )
}
