import { Briefcase, ChevronRight, CreditCard, Building2, Workflow } from 'lucide-react'
import { profile } from '../data/profile'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

const statIcons = [Briefcase, CreditCard, Building2, Workflow]
const stepColors = ['#22d3ee', '#a855f7', '#d946ef', '#2dd4bf']

export function Stats() {
  return (
    <div className="container">
      <div className="stats">
        {profile.stats.map((s, i) => {
          const I = statIcons[i]
          return (
            <Reveal key={s.label} delay={i * 0.06} className="card stat">
              <span className="stat-icon"><I size={20} aria-hidden="true" /></span>
              <div><b>{s.value}</b><span>{s.label}</span></div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}

export function Approach() {
  return (
    <section id="approach">
      <div className="container">
        <SectionHead title="My Approach" sub="From a business question to a decision people can trust." />
        <div className="approach">
          {profile.approach.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08} className="card hover step">
              <div className="step-icon" style={{ borderColor: stepColors[i], color: stepColors[i], boxShadow: `0 0 24px -4px ${stepColors[i]}88` }}>
                <Icon name={s.icon} size={26} />
              </div>
              <h3><span className="num">{i + 1}</span>{s.step}</h3>
              <p className="sub">{s.title}</p>
              <p>{s.text}</p>
              {i < profile.approach.length - 1 && <ChevronRight className="step-arrow" size={28} aria-hidden="true" />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
