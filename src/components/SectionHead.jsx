import Reveal from './Reveal'

export default function SectionHead({ title, sub, right }) {
  return (
    <Reveal className="section-head">
      <div>
        <h2><span className="chev">›</span> {title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {right}
    </Reveal>
  )
}
