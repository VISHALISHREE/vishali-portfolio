import { Code2, Database, LineChart, Palette } from 'lucide-react'
import { profile } from '../../data/profile'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { SectionHeading } from '../ui/SectionHeading'

const pillars = [
  {
    icon: Code2,
    title: 'Full Stack Development',
    description: 'Building responsive, database-driven web applications with HTML, CSS, PHP, Flask, and MySQL.',
  },
  {
    icon: LineChart,
    title: 'Machine Learning & Analytics',
    description: 'Applying Scikit-learn, TF-IDF, Spark, and PySpark to turn raw data into working models and insights.',
  },
  {
    icon: Database,
    title: 'Data Visualization',
    description: 'Designing interactive dashboards and reports using Power BI and Tableau.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Crafting intuitive interfaces in Figma, focused on workflow consistency and usability.',
  },
]

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="About Me"
          title="A builder at the intersection of code, data, and design."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-5">
          <RevealOnScroll delay={0.1} className="lg:col-span-2">
            <p className="text-lg text-white/75 leading-relaxed">{profile.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/50">
              <span className="glass rounded-full px-4 py-2">{profile.location}</span>
              <span className="glass rounded-full px-4 py-2">SRM IST · B.Tech IT</span>
            </div>
          </RevealOnScroll>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {pillars.map((pillar, i) => (
              <RevealOnScroll key={pillar.title} delay={0.15 + i * 0.08}>
                <div className="glass h-full rounded-2xl p-6 transition-colors duration-300 hover:bg-white/[0.06]">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-electric/20 to-violet/20 text-violet-soft">
                    <pillar.icon size={20} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/55 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
