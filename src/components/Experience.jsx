import { Award, GraduationCap, Sparkles } from 'lucide-react'
import { profile } from '../data/profile'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <SectionHead title="Experience & Education" sub="Three years engineering enterprise data before moving into data science." />
        <div className="exp-grid">
          <div className="timeline">
            {profile.experience.map((e, i) => (
              <Reveal key={e.org} delay={i * 0.06} className="card tl-item">
                <div className="tl-head">
                  <div>
                    <h3>{e.role}</h3>
                    <div className="org">{e.org}</div>
                  </div>
                  <span className="period">{e.period}</span>
                </div>
                {e.highlight && <div className="tl-highlight"><Sparkles size={18} /> <span>{e.highlight}</span></div>}
                <ul>{e.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                {e.award && <span className="chip amber" style={{ marginTop: 6 }}><Award size={14} aria-hidden="true" /> {e.award}</span>}
              </Reveal>
            ))}
          </div>
          <div className="edu-col">
            <p className="col-title">Education</p>
            {profile.education.map((ed, i) => (
              <Reveal key={ed.org} delay={i * 0.08} className="card edu">
                <span className="edu-icon"><GraduationCap size={22} aria-hidden="true" /></span>
                <div>
                  <h3>{ed.degree}</h3>
                  <p>{ed.org}</p>
                  <p>{ed.note}</p>
                  <span className="period">{ed.period}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
