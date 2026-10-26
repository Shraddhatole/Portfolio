import { useEffect, useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Line, LineChart, ReferenceArea, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Building2, CreditCard, Info, Table2 } from 'lucide-react'
import fraud from '../data/playground/fraudlens_threshold.json'
import shell from '../data/playground/shellscope_incorporations.json'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

// palette validated with dataviz validate_palette.js (dark, surface #0c1230)
const C = { missed: '#8b5cf6', review: '#0e9fbf', line: '#8b5cf6', grid: 'rgba(154,163,192,0.12)', axis: '#6b7493', ref: '#9aa3c0' }
const usd = n => (n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : `$${(n / 1000).toFixed(1)}k`)
const axisProps = { stroke: C.axis, tickLine: false, axisLine: { stroke: C.grid }, fontSize: 11 }

function TooltipBox({ title, rows }) {
  return (
    <div style={{ background: '#0b1130', border: '1px solid rgba(139,92,246,.4)', borderRadius: 10, padding: '10px 12px', fontSize: 12, minWidth: 170 }}>
      <div style={{ color: '#e6e8f2', fontWeight: 600, marginBottom: 6 }}>{title}</div>
      {rows.map(r => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 14, color: '#9aa3c0' }}>
          <span>{r.color && <i style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: r.color, marginRight: 6 }} />}{r.label}</span>
          <b style={{ color: '#e6e8f2', fontWeight: 500 }}>{r.value}</b>
        </div>
      ))}
    </div>
  )
}

function SampleNote({ show }) {
  if (!show) return null
  return (
    <p className="sample-note"><Info size={14} style={{ flex: 'none', marginTop: 2 }} /> Illustrative data shaped to the published findings, not the final notebook export.</p>
  )
}

function DataTable({ cols, rows }) {
  return (
    <details style={{ marginTop: 10, fontSize: '.8rem', color: 'var(--muted)' }}>
      <summary style={{ cursor: 'pointer', display: 'inline-flex', gap: 6, alignItems: 'center' }}><Table2 size={14} /> View as table</summary>
      <div style={{ maxHeight: 220, overflow: 'auto', marginTop: 8 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--mono)' }}>
          <thead><tr>{cols.map(c => <th key={c.key} style={{ textAlign: 'left', padding: '4px 8px', position: 'sticky', top: 0, background: '#0b1130' }}>{c.label}</th>)}</tr></thead>
          <tbody>{rows.map((r, i) => <tr key={i}>{cols.map(c => <td key={c.key} style={{ padding: '3px 8px', borderTop: '1px solid rgba(139,92,246,.1)' }}>{c.fmt ? c.fmt(r[c.key]) : r[c.key]}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </details>
  )
}

function FraudTab() {
  const [t, setT] = useState(fraud.chosenThreshold)
  const row = useMemo(() => fraud.rows.reduce((a, b) => (Math.abs(b.threshold - t) < Math.abs(a.threshold - t) ? b : a)), [t])
  const best = useMemo(() => fraud.rows.reduce((a, b) => (b.totalCost < a.totalCost ? b : a)), [])
  const saving = 1 - row.totalCost / fraud.baselineCost

  return (
    <div className="pg">
      <div className="card pg-panel">
        <h4>Alert threshold</h4>
        <p className="hint">Payments scoring above this are sent to a fraud analyst.</p>
        <label className="pg-label" htmlFor="thr">Threshold</label>
        <div className="big-val">{t.toFixed(2)}</div>
        <input id="thr" className="range" type="range" min="0.05" max="0.95" step="0.01" value={t} onChange={e => setT(+e.target.value)} />
        <div className="preset-row">
          <button className="filter" onClick={() => setT(0.5)}>Default 0.50</button>
          <button className={`filter ${t === best.threshold ? 'active' : ''}`} onClick={() => setT(best.threshold)}>Cost-optimal {best.threshold.toFixed(2)}</button>
        </div>
        <p className="pg-insight">Cost = <b>missed fraud</b> + <b>$8 review</b> per alert. A lower threshold catches more fraud but floods analysts with false alarms.</p>
      </div>

      <div className="card pg-chart">
        <h4>Expected cost by threshold (test period)</h4>
        <div style={{ display: 'flex', gap: 16, margin: '0 0 6px 18px', fontSize: 12, color: 'var(--muted)' }}>
          <span><i style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: C.missed, marginRight: 6 }} />Missed fraud</span>
          <span><i style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: C.review, marginRight: 6 }} />Analyst review cost</span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={fraud.rows} margin={{ top: 10, right: 16, left: 4, bottom: 0 }}>
            <CartesianGrid stroke={C.grid} vertical={false} />
            <XAxis dataKey="threshold" type="number" domain={[0.05, 0.95]} ticks={[0.1, 0.3, 0.5, 0.7, 0.9]} {...axisProps} />
            <YAxis tickFormatter={usd} width={56} {...axisProps} domain={[0, 'auto']} />
            <Tooltip
              cursor={{ stroke: C.ref, strokeDasharray: '3 3' }}
              content={({ active, payload }) => active && payload?.length ? (
                <TooltipBox title={`Threshold ${payload[0].payload.threshold.toFixed(2)}`} rows={[
                  { label: 'Missed fraud', value: usd(payload[0].payload.missedFraud), color: C.missed },
                  { label: 'Review cost', value: usd(payload[0].payload.reviewCost), color: C.review },
                  { label: 'Total', value: usd(payload[0].payload.totalCost) },
                  { label: 'Fraud caught', value: `${payload[0].payload.recall}%` },
                ]} />
              ) : null}
            />
            <Area type="monotone" dataKey="reviewCost" stackId="1" stroke={C.review} strokeWidth={2} fill={C.review} fillOpacity={0.35} isAnimationActive={false} />
            <Area type="monotone" dataKey="missedFraud" stackId="1" stroke={C.missed} strokeWidth={2} fill={C.missed} fillOpacity={0.35} isAnimationActive={false} />
            <ReferenceLine x={best.threshold} stroke="#5eead4" strokeDasharray="4 4" label={{ value: 'optimal', position: 'insideTopLeft', fill: '#5eead4', fontSize: 11 }} />
            <ReferenceLine x={row.threshold} stroke="#e6e8f2" strokeWidth={1.5} />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{ padding: '0 18px' }}>
          <SampleNote show={fraud.sample} />
          <DataTable rows={fraud.rows.filter((_, i) => i % 5 === 0)} cols={[
            { key: 'threshold', label: 'Threshold', fmt: v => v.toFixed(2) },
            { key: 'recall', label: 'Caught %' },
            { key: 'falseAlarmsPer1k', label: 'FA / 1k' },
            { key: 'totalCost', label: 'Total cost', fmt: usd },
          ]} />
        </div>
      </div>

      <div className="kpis">
        <div className="card kpi"><span>Fraud caught</span><b className="good">{row.recall.toFixed(1)}%</b></div>
        <div className="card kpi"><span>False alarms / 1,000 payments</span><b>{row.falseAlarmsPer1k.toFixed(1)}</b></div>
        <div className="card kpi"><span>Total fraud-related cost</span><b>{usd(row.totalCost)}</b></div>
        <div className="card kpi"><span>Saving vs no model ({usd(fraud.baselineCost)})</span><b className="good">−{(saving * 100).toFixed(1)}%</b></div>
      </div>
    </div>
  )
}

const fmtMonth = m => new Date(`${m}-01T00:00:00Z`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' })

function ShellTab() {
  const years = [...new Set(shell.months.map(m => m.month.slice(0, 4)))]
  const [from, setFrom] = useState(years[Math.max(0, years.length - 3)])
  const data = shell.months.filter(m => m.month.slice(0, 4) >= from)
  const latest = data[data.length - 1]
  const peak = data.reduce((a, b) => (b.incorporations > a.incorporations ? b : a))
  const ruleIdx = data.findIndex(d => d.month === shell.ruleDate)
  const avg = arr => Math.round(arr.reduce((s, d) => s + d.incorporations, 0) / Math.max(1, arr.length))
  const all = shell.months
  const r = all.findIndex(d => d.month === shell.ruleDate)
  const before = avg(all.slice(Math.max(0, r - 6), r))
  const after = avg(all.slice(r + 1, r + 7))

  return (
    <div className="pg">
      <div className="card pg-panel">
        <h4>UK incorporations</h4>
        <p className="hint">New companies registered at Companies House each month.</p>
        <label className="pg-label" htmlFor="from">Show from</label>
        <select id="from" className="select" value={from} onChange={e => setFrom(e.target.value)}>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <p className="pg-insight">On <b>18 Nov 2025</b> identity verification became mandatory. Growth slowed afterwards with <b>no sharp break</b> on the date, so ShellScope makes <b>no causal claim</b>.</p>
      </div>

      <div className="card pg-chart">
        <h4>Monthly incorporations</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 18, right: 32, left: 4, bottom: 0 }}>
            <CartesianGrid stroke={C.grid} vertical={false} />
            <XAxis dataKey="month" tickFormatter={fmtMonth} minTickGap={40} {...axisProps} />
            <YAxis tickFormatter={v => `${Math.round(v / 1000)}k`} width={44} {...axisProps} domain={['auto', 'auto']} />
            {ruleIdx >= 0 && <ReferenceArea x1={shell.ruleDate} x2={latest.month} fill="#8b5cf6" fillOpacity={0.06} />}
            {ruleIdx >= 0 && <ReferenceLine x={shell.ruleDate} stroke="#5eead4" strokeDasharray="4 4" label={{ value: 'ID verification', position: 'insideTopRight', fill: '#5eead4', fontSize: 11 }} />}
            <Tooltip
              cursor={{ stroke: C.ref, strokeDasharray: '3 3' }}
              content={({ active, payload }) => active && payload?.length ? (
                <TooltipBox title={fmtMonth(payload[0].payload.month)} rows={[
                  { label: 'Incorporations', value: payload[0].payload.incorporations.toLocaleString('en-GB') },
                  ...(payload[0].payload.yoy !== undefined ? [{ label: 'Year-on-year', value: `${payload[0].payload.yoy > 0 ? '+' : ''}${payload[0].payload.yoy}%` }] : []),
                ]} />
              ) : null}
            />
            <Line type="linear" dataKey="incorporations" stroke={C.line} strokeWidth={2} dot={false} activeDot={{ r: 5, stroke: '#0c1230', strokeWidth: 2 }} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
        <div style={{ padding: '0 18px' }}>
          <SampleNote show={shell.sample} />
          <DataTable rows={data} cols={[
            { key: 'month', label: 'Month', fmt: fmtMonth },
            { key: 'incorporations', label: 'Incorporations', fmt: v => v.toLocaleString('en-GB') },
            { key: 'yoy', label: 'YoY %', fmt: v => (v === undefined ? '–' : v) },
          ]} />
        </div>
      </div>

      <div className="kpis">
        <div className="card kpi"><span>Latest ({fmtMonth(latest.month)})</span><b>{latest.incorporations.toLocaleString('en-GB')}</b></div>
        <div className="card kpi"><span>Year-on-year change</span><b className={latest.yoy < 0 ? 'bad' : 'good'}>{latest.yoy > 0 ? '+' : ''}{latest.yoy}%</b></div>
        <div className="card kpi"><span>6-mo avg: before → after rule</span><b style={{ fontSize: '1.05rem' }}>{(before / 1000).toFixed(1)}k → {(after / 1000).toFixed(1)}k</b></div>
        <div className="card kpi"><span>Peak month in view</span><b style={{ fontSize: '1.05rem' }}>{fmtMonth(peak.month)}</b></div>
      </div>
    </div>
  )
}

const tabs = [
  { id: 'fraud', label: 'FraudLens · threshold simulator', icon: CreditCard },
  { id: 'shell', label: 'ShellScope · UK incorporations', icon: Building2 },
]

export default function Playground() {
  const [tab, setTab] = useState('fraud')

  // project-card links carry data-tab to open the matching tab
  useEffect(() => {
    const onClick = e => {
      const a = e.target.closest?.('a[data-tab]')
      if (a) setTab(a.dataset.tab)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <section id="playground">
      <div className="container">
        <SectionHead title="Interactive Data Playground ✨" sub="Play with the decisions behind my projects and watch the numbers update live." />
        <Reveal>
          <div className="tabs" role="tablist">
            {tabs.map(t => (
              <button key={t.id} role="tab" aria-selected={tab === t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
                <t.icon size={16} aria-hidden="true" /> {t.label}
              </button>
            ))}
          </div>
          {tab === 'fraud' ? <FraudTab /> : <ShellTab />}
        </Reveal>
      </div>
    </section>
  )
}
