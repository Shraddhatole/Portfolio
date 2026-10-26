import { useState } from 'react'
import { profile } from './data/profile'
import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Playground from './components/Playground'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { Approach, Stats } from './components/StatsApproach'

export default function App() {
  // skill selected in Skills → highlights matching projects
  const [skill, setSkill] = useState(null)

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Approach />
        <Projects highlight={skill} onClear={() => setSkill(null)} />
        <Playground />
        <Skills active={skill} onSelect={setSkill} />
        <Experience />
        <About />
        <Contact />
      </main>
      <footer>
        <div className="container">
          <span>© {new Date().getFullYear()} {profile.name} · {profile.location}</span>
          <span>Built with React, Vite &amp; Recharts</span>
        </div>
      </footer>
    </>
  )
}
