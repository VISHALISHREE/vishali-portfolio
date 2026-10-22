import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/profile'
import { GithubIcon } from '../ui/BrandIcons'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { SectionHeading } from '../ui/SectionHeading'
import { TiltCard } from '../ui/TiltCard'

export function Projects() {
  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work, built end to end."
          description="Each project links to its real source on GitHub."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.title} delay={i * 0.08}>
              <TiltCard className="h-full">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="group relative flex h-full flex-col justify-between rounded-2xl glass p-7 transition-colors duration-300 hover:bg-white/[0.06]"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-xl font-semibold text-white">
                        {project.title}
                      </h3>
                      <ArrowUpRight
                        size={20}
                        className="shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-violet-soft"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-white/40">
                    <GithubIcon size={14} />
                    View on GitHub
                  </div>
                </a>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
