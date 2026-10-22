import { Briefcase } from 'lucide-react'
import { experience } from '../../data/profile'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { SectionHeading } from '../ui/SectionHeading'

export function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <SectionHeading eyebrow="Experience" title="Where I've put these skills to work." />

        <div className="relative mt-16 pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-electric/50 via-violet/50 to-transparent" />

          <div className="flex flex-col gap-10">
            {experience.map((item, i) => (
              <RevealOnScroll key={`${item.company}-${item.role}`} delay={i * 0.12}>
                <div className="relative">
                  <span className="absolute -left-8 sm:-left-10 top-1.5 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-ink glow-border">
                    <span className="h-2 w-2 rounded-full bg-violet-soft" />
                  </span>

                  <div className="glass rounded-2xl p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-white">
                        <Briefcase size={16} className="text-electric-soft" />
                        <h3 className="font-display text-base font-semibold">{item.role}</h3>
                      </div>
                      <span className="text-xs text-white/45">{item.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-violet-soft">{item.company}</p>
                    <ul className="mt-4 space-y-2">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2 text-sm text-white/60 leading-relaxed">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
