import { Mail, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { profile } from '../../data/profile'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { MagneticButton } from '../ui/MagneticButton'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { SectionHeading } from '../ui/SectionHeading'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`,
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together."
          description="Open to internships, collaborations, and full-time opportunities. Reach out directly or send a message below."
          align="center"
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <RevealOnScroll delay={0.05} className="lg:col-span-2">
            <div className="glass h-full rounded-2xl p-7 flex flex-col gap-4">
              <a
                href={`mailto:${profile.email}`}
                data-cursor-hover
                className="flex items-center gap-3 rounded-xl bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.06]"
              >
                <Mail size={18} className="text-electric-soft shrink-0" />
                <span className="text-sm text-white/80 break-all">{profile.email}</span>
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                data-cursor-hover
                className="flex items-center gap-3 rounded-xl bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.06]"
              >
                <Phone size={18} className="text-electric-soft shrink-0" />
                <span className="text-sm text-white/80">{profile.phone}</span>
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="flex items-center gap-3 rounded-xl bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.06]"
              >
                <LinkedinIcon size={18} className="text-violet-soft shrink-0" />
                <span className="text-sm text-white/80">LinkedIn</span>
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="flex items-center gap-3 rounded-xl bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.06]"
              >
                <GithubIcon size={18} className="text-magenta shrink-0" />
                <span className="text-sm text-white/80">GitHub</span>
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-7 flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-wider text-white/45">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-violet/50"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-wider text-white/45">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-violet/50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs uppercase tracking-wider text-white/45">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-violet/50"
                  placeholder="Tell me about the opportunity or idea..."
                />
              </div>

              <MagneticButton className="self-start">
                <Send size={16} />
                Send Message
              </MagneticButton>

              <p className="text-xs text-white/35">
                Opens your email client with this message pre-filled, addressed to{' '}
                {profile.email}. No backend required.
              </p>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
