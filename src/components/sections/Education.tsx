import { Award, GraduationCap } from 'lucide-react'
import { certifications, education } from '../../data/profile'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { SectionHeading } from '../ui/SectionHeading'

export function Education() {
  return (
    <section id="education" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading eyebrow="Education & Certifications" title="Foundations and credentials." />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <RevealOnScroll delay={0.05}>
            <div className="glass h-full rounded-2xl p-7">
              <div className="mb-5 flex items-center gap-2">
                <GraduationCap size={18} className="text-electric-soft" />
                <h3 className="font-display text-base font-semibold text-white">Education</h3>
              </div>
              <div className="flex flex-col gap-5">
                {education.map((edu) => (
                  <div
                    key={edu.institution + edu.period}
                    className="flex flex-wrap items-start justify-between gap-2 rounded-xl bg-white/[0.02] p-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-white/90">{edu.institution}</p>
                      <p className="mt-1 text-xs text-white/55">{edu.degree}</p>
                      <p className="mt-1 text-xs text-violet-soft">{edu.detail}</p>
                    </div>
                    <span className="text-xs text-white/40 whitespace-nowrap">{edu.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <div className="glass h-full rounded-2xl p-7">
              <div className="mb-5 flex items-center gap-2">
                <Award size={18} className="text-magenta" />
                <h3 className="font-display text-base font-semibold text-white">Certifications</h3>
              </div>
              <div className="flex flex-col gap-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.02] p-4"
                  >
                    <p className="text-sm font-medium text-white/90">{cert.title}</p>
                    <span className="text-right text-xs text-white/45 whitespace-nowrap">
                      {cert.issuer}
                    </span>
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
