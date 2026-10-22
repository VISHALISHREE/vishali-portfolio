import { RevealOnScroll } from './RevealOnScroll'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <RevealOnScroll
      className={align === 'center' ? 'text-center mx-auto max-w-2xl' : ''}
    >
      <span className="inline-block text-xs sm:text-sm tracking-[0.3em] uppercase text-violet-soft font-medium mb-3">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-white/60 max-w-xl">
          {description}
        </p>
      )}
    </RevealOnScroll>
  )
}
