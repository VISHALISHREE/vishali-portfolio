import { FileText, Trophy } from 'lucide-react'
import { achievements, research } from '../../data/profile'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { SectionHeading } from '../ui/SectionHeading'

export function Research() {
  return (
    <section id="research" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Research & Achievements"
          title="Work presented, and recognized."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <RevealOnScroll delay={0.05}>
            <div className="glass h-full rounded-2xl p-7">
              <div className="mb-5 flex items-center gap-2">
                <FileText size={18} className="text-electric-soft" />
                <h3 className="font-display text-base font-semibold text-white">
                  Research Publications
                </h3>
              </div>
              <div className="flex flex-col gap-6">
                {research.map((paper) => (
                  <div key={paper.title} className="border-l-2 border-violet/30 pl-4">
                    <p className="text-sm font-medium text-white/85 leading-snug">
                      {paper.title}
                    </p>
                    <p className="mt-1.5 text-xs text-white/45">{paper.venue}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <div className="glass h-full rounded-2xl p-7">
              <div className="mb-5 flex items-center gap-2">
                <Trophy size={18} className="text-magenta" />
                <h3 className="font-display text-base font-semibold text-white">
                  Achievements
                </h3>
              </div>
              <div className="flex flex-col gap-6">
                {achievements.map((item) => (
                  <div key={item.title} className="border-l-2 border-magenta/30 pl-4">
                    <p className="text-sm font-medium text-white/85 leading-snug">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-xs text-white/45">{item.venue}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
