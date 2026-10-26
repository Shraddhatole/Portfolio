import { Download, Mail, Phone } from 'lucide-react'
import { profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon } from './BrandIcons'
import Reveal from './Reveal'

function Skyline() {
  // stylised Glasgow-ish skyline silhouette
  const b = [[0, 60], [30, 90], [55, 70], [80, 130], [100, 100], [130, 160], [150, 120], [175, 190], [195, 140], [225, 105], [250, 150], [270, 95], [300, 125], [325, 80], [350, 110], [380, 70], [410, 95], [440, 60], [470, 80], [500, 50], [540, 70], [580, 40], [640, 55]]
  return (
    <svg className="skyline" viewBox="0 0 640 200" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">
      <defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7c3aed" /><stop offset="1" stopColor="#0b1030" /></linearGradient></defs>
      <path d={`M0 200 ${b.map(([x, h], i) => `L${x} ${200 - h} L${(b[i + 1]?.[0] ?? 640)} ${200 - h}`).join(' ')} L640 200 Z`} fill="url(#sk)" />
      {Array.from({ length: 50 }, (_, i) => <rect key={i} x={(i * 53) % 600 + 20} y={200 - ((i * 37) % 110) - 12} width="2.5" height="2.5" fill={i % 3 ? '#fde68a' : '#67e8f9'} opacity=".7" />)}
    </svg>
  )
}

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <Reveal className="contact">
          <Skyline />
          <div className="tagline">Same data.<br />Better decisions.</div>
          <h2>Let’s Create Insights Together</h2>
          <p>I’m looking for Data Scientist roles and always happy to chat about data, models or a problem you’re trying to solve.</p>
          <div className="ctas">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}><Mail size={18} /> Email Me</a>
            <a className="btn btn-ghost" href={`tel:${profile.phone.replace(/\s/g, '')}`}><Phone size={18} /> {profile.phone}</a>
            <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon size={18} /> LinkedIn</a>
            <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer"><GitHubIcon size={18} /> GitHub</a>
            <a className="btn btn-ghost" href={profile.cv} download><Download size={18} /> Download CV</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
