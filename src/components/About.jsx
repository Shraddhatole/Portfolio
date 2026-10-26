import { useState } from 'react'
import { BadgeCheck } from 'lucide-react'
import { profile } from '../data/profile'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function About() {
  const [photoOk, setPhotoOk] = useState(true)
  const a = profile.about
  return (
    <section id="about">
      <div className="container">
        <SectionHead title="About Me" />
        <div className="about">
          <Reveal className="photo-wrap">
            {photoOk
              ? <img src={profile.photo} alt={`Portrait of ${profile.name}`} onError={() => setPhotoOk(false)} />
              : <span className="photo-fallback grad-text" aria-label={profile.name}>{profile.initials}</span>}
          </Reveal>
          <Reveal delay={0.08} className="card about-body">
            <h3>From building data pipelines to building models</h3>
            {a.paragraphs.map(p => <p key={p.slice(0, 20)}>{p}</p>)}
            <div className="values">
              {a.values.map(v => <span key={v.label} className="value"><Icon name={v.icon} size={18} /> {v.label}</span>)}
            </div>
            <div className="avail"><BadgeCheck size={18} aria-hidden="true" /> <span>{profile.availability}</span></div>
          </Reveal>
          <Reveal delay={0.16} className="card quote">
            <span className="q" aria-hidden="true">“</span>
            <p>{a.quote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
