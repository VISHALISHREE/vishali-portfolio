import { Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 sm:flex-row sm:justify-between sm:px-8">
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} {profile.name}. Built with React, Three.js & Framer Motion.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="text-white/50 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="text-white/50 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            data-cursor-hover
            className="text-white/50 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
