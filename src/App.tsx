import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GalaxyBackground } from './components/background/GalaxyBackground'
import { ChatWidget } from './components/chatbot/ChatWidget'
import { CustomCursor } from './components/layout/CustomCursor'
import { Footer } from './components/layout/Footer'
import { Loader } from './components/layout/Loader'
import { Navbar } from './components/layout/Navbar'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Education } from './components/sections/Education'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Research } from './components/sections/Research'
import { Skills } from './components/sections/Skills'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      <div className="noise-bg relative">
        <GalaxyBackground />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Research />
          <Education />
          <Contact />
        </main>

        <Footer />
        <ChatWidget />
      </div>
    </>
  )
}

export default App
