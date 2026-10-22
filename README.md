# Vishalishree E — Portfolio

A 3D, animated personal portfolio built with React, Three.js (via React Three
Fiber), Framer Motion, and Tailwind CSS. All content (projects, experience,
education, research, certifications) is sourced directly from the resume and
from the real repositories at [github.com/VISHALISHREE](https://github.com/VISHALISHREE).

## Tech stack

- React 19 + TypeScript + Vite
- Three.js + @react-three/fiber + @react-three/drei (hero 3D scene)
- Framer Motion (scroll reveals, page/menu transitions, magnetic buttons)
- Tailwind CSS v4 (theme tokens in `src/index.css`)
- lucide-react (icon set)

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

Other scripts:

```bash
npm run build    # type-checks and builds the production bundle into dist/
npm run preview  # serves the production build locally
npm run lint     # runs oxlint
```

## Project structure

```
src/
  data/profile.ts        # single source of truth for all resume/GitHub content
  components/
    three/                # HeroScene, FloatingSculpture, ParticleField, fallback
    layout/                # Navbar, Footer, CustomCursor, ScrollProgress, Loader
    sections/              # Hero, About, Skills, Projects, Experience, Research,
                            # Education, Contact
    ui/                     # RevealOnScroll, MagneticButton, TiltCard, SectionHeading
  hooks/                   # useReducedMotion, useMediaQuery
  lib/webgl.ts             # WebGL feature detection for the fallback hero
```

To update content (new project, new role, etc.), edit **`src/data/profile.ts`**
— every section reads from there, so nothing needs to be duplicated.

## Notable behavior

- **3D hero**: lazy-loaded (code-split) so the rest of the site is not blocked
  by the Three.js bundle. Falls back to a static animated gradient if WebGL is
  unavailable, or if the visitor has `prefers-reduced-motion` enabled.
- **Mobile**: the 3D scene renders at lower geometry detail and without the
  particle field / custom cursor on touch devices for performance.
- **Contact form**: has no backend. Submitting it opens the visitor's email
  client via a `mailto:` link pre-filled with their message, addressed to
  `vishalielu10@gmail.com`. To add real form handling later, wire the
  `handleSubmit` function in `src/components/sections/Contact.tsx` to a
  service such as Formspree, EmailJS, or a custom API route.
- **Resume download**: points to `public/resume.pdf`. A one-page PDF generated
  from the verified resume content is already included — replace that file
  with your own formatted resume at any time; the filename/path must stay
  `public/resume.pdf` (or update `resumeFile` in `src/data/profile.ts`).

## Deployment

This is a static Vite build — `npm run build` outputs `dist/`, which can be
deployed to Vercel, Netlify, GitHub Pages, or any static host.
