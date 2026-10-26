import { ArrowRight } from 'lucide-react'
import { profile } from '../data/profile'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function Skills({ active, onSelect }) {
  const select = s => {
    const next = active?.name === s.name ? null : s
    onSelect(next)
    if (next) document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <section id="skills">
      <div className="container">
        <SectionHead
          title="Skills & Tools"
          sub="Analytics, machine learning and the engineering that makes it run."
          right={<span className="skill-hint">Click a skill to see related projects <ArrowRight size={16} /></span>}
        />
        <div className="skills">
          {profile.skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.04}>
              <button className={`skill ${active?.name === s.name ? 'active' : ''}`} onClick={() => select(s)} aria-pressed={active?.name === s.name}>
                <span className="skill-icon"><Icon name={s.icon} size={26} /></span>
                <span><b>{s.name}</b><span>{s.detail}</span></span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
