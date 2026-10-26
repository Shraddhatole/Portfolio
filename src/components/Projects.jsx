import { useEffect, useState } from 'react'
import { ArrowRight, ExternalLink, Play, X } from 'lucide-react'
import { categories, projects } from '../data/projects'
import { GitHubIcon } from './BrandIcons'
import ProjectVisual from './ProjectVisual'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

function Lightbox({ item, onClose }) {
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <button className="close" aria-label="Close" onClick={onClose}><X /></button>
      <figure onClick={e => e.stopPropagation()}>
        <img src={item.src} alt={item.alt} />
        <figcaption>{item.alt}</figcaption>
      </figure>
    </div>
  )
}

function ProjectCard({ p, state, onOpen }) {
  const { links } = p
  return (
    <article className={`card hover project ${p.featured ? 'featured' : ''} ${state}`}>
      <div className="project-visual">
        <ProjectVisual kind={p.visual} />
        <div className="badges">
          <span className="chip">{p.badge}</span>
          {p.status && <span className="chip amber">{p.status}</span>}
          {p.featured && <span className="chip green">Flagship</span>}
        </div>
      </div>
      <div className="project-body">
        <h3>{p.title}</h3>
        <p className="summary">{p.summary}</p>
        <div className="metrics">
          {p.metrics.map(m => (
            <div className="metric" key={m.label}><b className={p.featured ? 'grad-text' : ''}>{m.value}</b><span>{m.label}</span></div>
          ))}
        </div>
        {p.gallery && (
          <div className="gallery">
            {p.gallery.map(g => (
              <button key={g.src} onClick={() => onOpen(g)} aria-label={`Enlarge chart: ${g.alt}`}>
                <img src={g.src} alt={g.alt} loading="lazy" />
              </button>
            ))}
          </div>
        )}
        <div className="tech">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
        <div className="project-links">
          {links.demo && <a href={links.demo} target="_blank" rel="noreferrer"><Play size={16} /> Live demo</a>}
          {links.github && <a href={links.github} target="_blank" rel="noreferrer"><GitHubIcon size={16} /> Code &amp; write-up</a>}
          {links.extra && <a href={links.extra.href} target="_blank" rel="noreferrer"><ExternalLink size={16} /> {links.extra.label}</a>}
          {p.id === 'fraudlens' && <a href="#playground" data-tab="fraud">Try the threshold simulator <ArrowRight size={16} /></a>}
          {p.id === 'shellscope' && <a href="#playground" data-tab="shell">Explore the trend <ArrowRight size={16} /></a>}
        </div>
      </div>
    </article>
  )
}

export default function Projects({ highlight, onClear }) {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  // a skill click (highlight) overrides the filter chips
  const stateOf = p => {
    if (highlight) return highlight.tags.some(t => p.tags.includes(t)) ? 'glow' : 'dim'
    return ''
  }
  const visible = projects.filter(p => filter === 'all' || p.tags.includes(filter))

  return (
    <section id="projects">
      <div className="container">
        <SectionHead
          title="Featured Projects"
          sub={highlight ? `Showing projects that use ${highlight.name}` : 'Real datasets. Real problems. Measurable results.'}
          right={highlight
            ? <button className="filter active" onClick={onClear}>Clear “{highlight.name}” ✕</button>
            : <a className="skill-hint" href="https://github.com/Shraddhatole?tab=repositories" target="_blank" rel="noreferrer">All repositories <ArrowRight size={16} /></a>}
        />
        <Reveal className="filters">
          {categories.map(c => (
            <button key={c.id} className={`filter ${filter === c.id ? 'active' : ''}`} onClick={() => setFilter(c.id)} aria-pressed={filter === c.id}>
              {c.label}
            </button>
          ))}
        </Reveal>
        <div className="projects">
          {visible.map(p => <ProjectCard key={p.id} p={p} state={stateOf(p)} onOpen={setLightbox} />)}
        </div>
      </div>
      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  )
}
