import { motion } from 'framer-motion'
import { skillGroups } from '../../data/profile'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { SectionHeading } from '../ui/SectionHeading'

export function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I use to turn ideas into working software."
          align="center"
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <RevealOnScroll key={group.category} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass h-full rounded-2xl p-6 group"
              >
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-violet-soft mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/80 transition-all duration-300 group-hover:border-violet/30 hover:!bg-gradient-to-r hover:!from-electric/20 hover:!to-violet/20 hover:!text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
