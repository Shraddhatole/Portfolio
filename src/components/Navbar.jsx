import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon } from './BrandIcons'

const links = [
  { id: 'projects', label: 'Projects' },
  { id: 'playground', label: 'Playground' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const els = links.map(l => document.getElementById(l.id)).filter(Boolean)
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="brand" aria-label="Back to top">
          <span className="brand-logo grad-text">{profile.initials}</span>
          <span className="brand-name"><b>{profile.name}</b><span>{profile.role}</span></span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'active' : ''}>{l.label}</a>
          ))}
        </nav>
        <div className="nav-right">
          <a className="icon-link" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
          <a className="icon-link" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
          <a className="btn btn-primary btn-sm" href="#contact">Let's Connect <ArrowRight size={16} /></a>
          <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <div className={`nav-mobile ${open ? 'open' : ''}`}>
        {links.map(l => <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>{l.label}</a>)}
        <div className="row">
          <a className="icon-link" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
          <a className="icon-link" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
          <a className="btn btn-primary btn-sm" href="#contact" onClick={() => setOpen(false)}>Let's Connect</a>
        </div>
      </div>
    </header>
  )
}
