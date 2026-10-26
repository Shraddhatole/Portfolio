import { useEffect, useRef } from 'react'

// Lightweight rotating "data globe": Fibonacci-sphere points + glowing arcs.
// Pauses when offscreen and renders a single frame for reduced-motion users.
export default function HeroGlobe() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const N = 650
    const pts = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const th = Math.PI * (3 - Math.sqrt(5)) * i
      return [Math.cos(th) * r, y, Math.sin(th) * r]
    })
    // random connections that act like "data flows"
    const arcs = Array.from({ length: 14 }, () => [
      Math.floor(Math.random() * N), Math.floor(Math.random() * N), Math.random(),
    ])
    let w = 0, h = 0, dpr = 1, raf = 0, angle = 0, visible = true
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width; h = rect.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const project = (p, R, cx, cy) => {
      const tilt = 0.35
      let [x, y, z] = p
      const cosA = Math.cos(angle), sinA = Math.sin(angle)
      ;[x, z] = [x * cosA - z * sinA, x * sinA + z * cosA]
      const cosT = Math.cos(tilt), sinT = Math.sin(tilt)
      ;[y, z] = [y * cosT - z * sinT, y * sinT + z * cosT]
      return [cx + x * R, cy + y * R, z]
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      const R = Math.min(w, h) * 0.38, cx = w / 2, cy = h / 2

      // halo
      const g = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.35)
      g.addColorStop(0, 'rgba(124,58,237,0.22)')
      g.addColorStop(0.6, 'rgba(34,211,238,0.06)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2); ctx.fill()

      // rim
      ctx.strokeStyle = 'rgba(139,92,246,0.35)'
      ctx.lineWidth = 1.2
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke()

      // orbit ring
      ctx.save()
      ctx.translate(cx, cy); ctx.rotate(-0.35)
      ctx.strokeStyle = 'rgba(34,211,238,0.25)'
      ctx.beginPath(); ctx.ellipse(0, 0, R * 1.22, R * 0.36, 0, 0, Math.PI * 2); ctx.stroke()
      const oa = t / 2600
      ctx.fillStyle = '#67e8f9'
      ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = 12
      ctx.beginPath(); ctx.arc(Math.cos(oa) * R * 1.22, Math.sin(oa) * R * 0.36, 3, 0, Math.PI * 2); ctx.fill()
      ctx.restore()

      // points
      const proj = pts.map(p => project(p, R, cx, cy))
      for (const [x, y, z] of proj) {
        const front = z > 0
        const a = front ? 0.35 + z * 0.6 : 0.08
        ctx.fillStyle = front ? `rgba(196,181,253,${a})` : `rgba(103,232,249,${a})`
        ctx.beginPath(); ctx.arc(x, y, front ? 1.3 + z * 0.6 : 0.8, 0, Math.PI * 2); ctx.fill()
      }

      // arcs between visible points with a travelling pulse
      ctx.lineWidth = 1.1
      for (const [i, j, phase] of arcs) {
        const a = proj[i], b = proj[j]
        if (a[2] < 0.05 || b[2] < 0.05) continue
        const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2
        const dx = mx - cx, dy = my - cy, len = Math.hypot(dx, dy) || 1
        const lift = R * 0.35
        const qx = mx + (dx / len) * lift, qy = my + (dy / len) * lift
        const grad = ctx.createLinearGradient(a[0], a[1], b[0], b[1])
        grad.addColorStop(0, 'rgba(168,85,247,0.7)'); grad.addColorStop(1, 'rgba(34,211,238,0.7)')
        ctx.strokeStyle = grad
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(qx, qy, b[0], b[1]); ctx.stroke()
        const s = ((t / 2200) + phase) % 1
        const px = (1 - s) ** 2 * a[0] + 2 * (1 - s) * s * qx + s * s * b[0]
        const py = (1 - s) ** 2 * a[1] + 2 * (1 - s) * s * qy + s * s * b[1]
        ctx.save()
        ctx.fillStyle = '#f0abfc'; ctx.shadowColor = '#d946ef'; ctx.shadowBlur = 10
        ctx.beginPath(); ctx.arc(px, py, 2.2, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
        ;[a, b].forEach(p => { ctx.fillStyle = '#e9d5ff'; ctx.beginPath(); ctx.arc(p[0], p[1], 2.4, 0, Math.PI * 2); ctx.fill() })
      }
    }

    const loop = (t) => {
      if (visible) { angle += 0.0025; draw(t) }
      raf = requestAnimationFrame(loop)
    }

    // size from layout; static (reduced-motion) frame is redrawn whenever size changes
    const ro = new ResizeObserver(() => { resize(); if (reduce) draw(0) })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)
    if (!reduce) raf = requestAnimationFrame(loop)

    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect() }
  }, [])

  return <canvas ref={ref} aria-hidden="true" />
}
