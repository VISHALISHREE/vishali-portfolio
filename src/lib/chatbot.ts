import {
  achievements,
  certifications,
  education,
  experience,
  profile,
  projects,
  research,
  skillGroups,
} from '../data/profile'

export const FALLBACK_ANSWER =
  "I don't have that information in the portfolio right now. Please use the contact links to get in touch with Vishali."

function findProject(query: string) {
  return projects.find((p) => {
    const title = p.title.toLowerCase()
    if (query.includes(title)) return true
    return title
      .split(/[\s—-]+/)
      .filter((word) => word.length > 3)
      .some((word) => query.includes(word))
  })
}

const aboutAnswer = () =>
  `${profile.summary} She's based in ${profile.location}, currently pursuing a B.Tech in Information Technology at SRM Institute of Science and Technology (CGPA: 9.14/10.0).`

const skillsAnswer = () =>
  skillGroups.map((g) => `${g.category}: ${g.skills.join(', ')}`).join('\n')

const singleProjectAnswer = (p: (typeof projects)[number]) =>
  `${p.title}\n${p.description}\nTech: ${p.tech.join(', ')}\nGitHub: ${p.github}`

const projectsAnswer = (query: string) => {
  const match = findProject(query)
  if (match) return singleProjectAnswer(match)
  return projects.map((p) => `• ${p.title} — ${p.description} (${p.tech.join(', ')})`).join('\n\n')
}

const experienceAnswer = () =>
  experience
    .map((e) => `${e.role} — ${e.company} (${e.period})\n${e.points.join(' ')}`)
    .join('\n\n')

const educationAnswer = () =>
  education.map((e) => `${e.institution}\n${e.degree} · ${e.detail} (${e.period})`).join('\n\n')

const certificationsAnswer = () =>
  certifications.map((c) => `• ${c.title} — ${c.issuer}`).join('\n')

const researchAnswer = () =>
  research.map((r) => `"${r.title}"\n${r.venue}`).join('\n\n')

const achievementsAnswer = () =>
  achievements.map((a) => `• ${a.title} — ${a.venue}`).join('\n')

const experienceAndCertsAnswer = () =>
  `Experience:\n${experienceAnswer()}\n\nCertifications:\n${certificationsAnswer()}`

const contactAnswer = () =>
  `You can reach Vishali here:\nEmail: ${profile.email}\nPhone: ${profile.phone}\nLinkedIn: ${profile.social.linkedin}\nGitHub: ${profile.social.github}`

const resumeAnswer = () => `You can download her resume right here: ${profile.resumeFile}`

interface Intent {
  id: string
  keywords: string[]
  respond: (query: string) => string
}

const intents: Intent[] = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon'],
    respond: aboutAnswer,
  },
  {
    id: 'about',
    keywords: ['about', 'who is', 'who are you', 'introduce', 'yourself', 'tell me about vishali', 'summary'],
    respond: aboutAnswer,
  },
  {
    id: 'skills',
    keywords: ['skill', 'technology', 'technologies', 'tech stack', 'programming', 'language', 'tools'],
    respond: skillsAnswer,
  },
  {
    id: 'projects',
    keywords: [
      'project',
      'built',
      'application',
      ...projects.flatMap((p) => p.title.toLowerCase().split(/[\s—-]+/).filter((w) => w.length > 3)),
    ],
    respond: projectsAnswer,
  },
  {
    id: 'experience',
    keywords: ['experience', 'intern', 'internship', 'job', 'work history', 'role', 'novitech'],
    respond: experienceAnswer,
  },
  {
    id: 'education',
    keywords: ['education', 'degree', 'college', 'university', 'school', 'cgpa', 'srm'],
    respond: educationAnswer,
  },
  {
    id: 'certifications',
    keywords: ['certification', 'certificate', 'certified', 'nptel', 'cisco'],
    respond: certificationsAnswer,
  },
  {
    id: 'research',
    keywords: ['research', 'publication', 'paper', 'conference', 'published'],
    respond: researchAnswer,
  },
  {
    id: 'achievements',
    keywords: ['achievement', 'award', 'won', 'first place', 'techpoly'],
    respond: achievementsAnswer,
  },
  {
    id: 'resume',
    keywords: ['resume', 'cv', 'download'],
    respond: resumeAnswer,
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'phone', 'reach', 'linkedin', 'github profile', 'get in touch', 'hire'],
    respond: contactAnswer,
  },
]

export const suggestedQuestions: { label: string; answer: () => string }[] = [
  { label: 'Tell me about Vishali.', answer: aboutAnswer },
  { label: 'What technical skills does she have?', answer: skillsAnswer },
  { label: 'Explain her projects.', answer: () => projectsAnswer('') },
  { label: 'What experience and certifications does she have?', answer: experienceAndCertsAnswer },
  { label: 'How can I contact her?', answer: contactAnswer },
  { label: 'Where can I find her resume?', answer: resumeAnswer },
]

export const welcomeMessage =
  "Hi! 👋 I'm your Portfolio Assistant. Ask me about my projects, technical skills, education, certifications, or experience!"

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function scoreIntent(intent: Intent, query: string) {
  let score = 0
  for (const keyword of intent.keywords) {
    if (!keyword) continue
    const pattern = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, 'i')
    if (pattern.test(query)) {
      score += keyword.length > 5 ? 2 : 1
    }
  }
  return score
}

export function getAnswer(rawQuery: string): string {
  const query = rawQuery.trim().toLowerCase()
  if (!query) return FALLBACK_ANSWER

  let bestIntent: Intent | null = null
  let bestScore = 0

  for (const intent of intents) {
    const score = scoreIntent(intent, query)
    if (score > bestScore) {
      bestScore = score
      bestIntent = intent
    }
  }

  if (!bestIntent || bestScore === 0) return FALLBACK_ANSWER
  return bestIntent.respond(query)
}
