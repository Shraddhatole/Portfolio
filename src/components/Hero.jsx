import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { profile } from '../data/profile'
import HeroGlobe from './HeroGlobe'

const chips = [
  { pos: { top: '10%', left: '2%' }, value: '0.91', label: 'PR-AUC · FraudLens', cls: 'p' },
  { pos: { top: '22%', right: '0%' }, value: '−95%', label: 'Fraud cost cut', cls: 'g' },
  { pos: { bottom: '14%', left: '0%' }, value: '5.7M', label: 'UK companies screened', cls: 'c' },
  { pos: { bottom: '6%', right: '6%' }, value: '40%', label: 'Tasks automated (GenAI)', cls: 'g' },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const h = profile.hero
  const fade = (d) => (reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: d } })

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <motion.div {...fade(0)} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="greet">{h.greeting}</span>
            <span className="open-pill"><span className="dot" /> Open to work · {profile.location}</span>
          </motion.div>
          <motion.h1 {...fade(0.08)}>
            {h.titleTop}<br /><span className="grad-text">{h.titleAccent}</span>
          </motion.h1>
          <motion.p className="blurb" {...fade(0.16)}>{h.blurb}</motion.p>
          <motion.div className="ctas" {...fade(0.24)}>
            <a className="btn btn-primary" href="#projects">Explore My Work <ArrowRight size={18} /></a>
            <a className="btn btn-ghost" href={profile.cv} target="_blank" rel="noreferrer"><Download size={18} /> View CV</a>
          </motion.div>
        </div>
        <div className="hero-visual">
          <HeroGlobe />
          {chips.map((c, i) => (
            <motion.div
              key={c.label}
              className="float-chip"
              style={c.pos}
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={reduce ? {} : { opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={reduce ? {} : { opacity: { delay: 0.4 + i * 0.12 }, scale: { delay: 0.4 + i * 0.12 }, y: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut' } }}
            >
              <b className={c.cls}>{c.value}</b>{c.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
