// Decorative, theme-matched header art for each project card.
// Shapes are illustrative; real charts live in the gallery and the Playground.

function Fraud() {
  const bars = [22, 30, 26, 40, 34, 52, 46, 61, 55, 72, 66, 84]
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id="fb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a855f7" /><stop offset="1" stopColor="#6d28d9" stopOpacity=".2" /></linearGradient>
        <linearGradient id="fl" x1="0" x2="1"><stop offset="0" stopColor="#22d3ee" /><stop offset="1" stopColor="#d946ef" /></linearGradient>
      </defs>
      {[60, 110, 160, 210].map(y => <line key={y} x1="20" x2="380" y1={y} y2={y} stroke="#8b5cf6" strokeOpacity=".12" />)}
      {bars.map((b, i) => <rect key={i} x={30 + i * 22} y={210 - b * 1.6} width="13" height={b * 1.6} rx="3" fill="url(#fb)" opacity=".85" />)}
      <path d="M30 70 C 90 72, 120 80, 150 95 S 230 150, 300 168 S 360 176, 380 178" fill="none" stroke="url(#fl)" strokeWidth="3" />
      <circle cx="232" cy="146" r="7" fill="#22d3ee" />
      <circle cx="232" cy="146" r="16" fill="none" stroke="#22d3ee" strokeOpacity=".4" />
      <g transform="translate(300 34)">
        <circle r="34" fill="none" stroke="#1e1b4b" strokeWidth="10" />
        <circle r="34" fill="none" stroke="#2dd4bf" strokeWidth="10" strokeDasharray={`${0.93 * 213.6} 213.6`} transform="rotate(-90)" strokeLinecap="round" />
        <text y="5" textAnchor="middle" fill="#e6e8f2" fontSize="15" fontWeight="700" fontFamily="Inter">93%</text>
      </g>
    </svg>
  )
}

function NetworkArt() {
  const nodes = [[200, 120, 9], [120, 70, 5], [290, 60, 5], [320, 160, 6], [90, 170, 5], [170, 200, 4], [250, 205, 4], [60, 100, 3], [350, 100, 3], [140, 130, 3], [260, 120, 3], [210, 40, 3]]
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs><radialGradient id="ng"><stop offset="0" stopColor="#d946ef" /><stop offset="1" stopColor="#d946ef" stopOpacity="0" /></radialGradient></defs>
      <circle cx="200" cy="120" r="70" fill="url(#ng)" opacity=".35" />
      {nodes.slice(1).map(([x, y], i) => <line key={i} x1="200" y1="120" x2={x} y2={y} stroke="#a855f7" strokeOpacity=".45" />)}
      {nodes.slice(1, 7).map(([x, y], i) => { const [x2, y2] = nodes[(i % 6) + 6]; return <line key={'b' + i} x1={x} y1={y} x2={x2} y2={y2} stroke="#22d3ee" strokeOpacity=".3" /> })}
      {nodes.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={i === 0 ? '#f0abfc' : i % 3 ? '#67e8f9' : '#c4b5fd'} />)}
      {Array.from({ length: 40 }, (_, i) => <circle key={'d' + i} cx={(i * 97) % 400} cy={(i * 53) % 240} r="1.2" fill="#c4b5fd" opacity=".35" />)}
    </svg>
  )
}

function Bars() {
  const v = [70, 120, 95, 150, 110, 135, 80]
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs><linearGradient id="hb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#22d3ee" /><stop offset="1" stopColor="#0e7490" stopOpacity=".2" /></linearGradient></defs>
      <rect x="24" y="30" width="200" height="12" rx="4" fill="#8b5cf6" opacity=".35" />
      <rect x="24" y="52" width="140" height="8" rx="4" fill="#8b5cf6" opacity=".2" />
      {v.map((h, i) => <rect key={i} x={30 + i * 30} y={210 - h} width="18" height={h} rx="3" fill="url(#hb)" />)}
      <g transform="translate(320 135)">
        {[[0, 0.42, '#a855f7'], [0.42, 0.7, '#22d3ee'], [0.7, 0.88, '#d946ef'], [0.88, 1, '#2dd4bf']].map(([a, b, c], i) => {
          const r = 50, s = a * 2 * Math.PI - Math.PI / 2, e = b * 2 * Math.PI - Math.PI / 2
          const large = b - a > 0.5 ? 1 : 0
          return <path key={i} d={`M ${r * Math.cos(s)} ${r * Math.sin(s)} A ${r} ${r} 0 ${large} 1 ${r * Math.cos(e)} ${r * Math.sin(e)}`} fill="none" stroke={c} strokeWidth="16" />
        })}
      </g>
    </svg>
  )
}

function Retina() {
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs><radialGradient id="rg"><stop offset="0" stopColor="#fb923c" stopOpacity=".9" /><stop offset=".55" stopColor="#be185d" stopOpacity=".55" /><stop offset="1" stopColor="#1e1b4b" stopOpacity="0" /></radialGradient></defs>
      <circle cx="140" cy="120" r="88" fill="url(#rg)" />
      <circle cx="170" cy="105" r="14" fill="#fde68a" opacity=".85" />
      {['M170 105 C 130 90, 100 80, 70 95', 'M170 105 C 140 130, 110 150, 80 170', 'M170 105 C 150 60, 130 45, 110 40', 'M170 105 C 160 150, 150 180, 140 205', 'M170 105 C 200 140, 210 165, 215 190'].map((d, i) => <path key={i} d={d} stroke="#7f1d1d" strokeWidth="2.5" fill="none" opacity=".8" />)}
      {[0, 1, 2].map(i => <rect key={i} x={262 + i * 12} y={50 + i * 12} width="90" height="90" rx="8" fill="none" stroke={['#a855f7', '#8b5cf6', '#22d3ee'][i]} strokeOpacity=".7" />)}
      {[0, 1, 2, 3].map(i => <rect key={'o' + i} x="290" y={170 + i * 12} width={70 - i * 14} height="7" rx="3" fill="#22d3ee" opacity={0.9 - i * 0.2} />)}
    </svg>
  )
}

const visuals = { fraud: Fraud, network: NetworkArt, bars: Bars, retina: Retina }

export default function ProjectVisual({ kind }) {
  const V = visuals[kind] || Bars
  return <V />
}
