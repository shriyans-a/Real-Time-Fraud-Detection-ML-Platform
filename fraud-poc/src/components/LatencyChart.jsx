import { useEffect, useRef, useState } from 'react'

const POINTS = 28
const W = 520
const H = 120

function seed() {
  const rps = []
  const p95 = []
  let r = 1000
  let p = 62
  for (let i = 0; i < POINTS; i++) {
    r += (Math.random() - 0.5) * 140
    r = Math.min(1650, Math.max(850, r))
    p += (Math.random() - 0.5) * 8
    p = Math.min(98, Math.max(38, p))
    rps.push(r)
    p95.push(p)
  }
  return { rps, p95 }
}

function toPath(values, min, max) {
  const step = W / (values.length - 1)
  return values
    .map((v, i) => {
      const x = i * step
      const y = H - ((v - min) / (max - min)) * (H - 12) - 6
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

export default function LatencyChart() {
  const [{ rps, p95 }, setData] = useState(seed)
  const latest = useRef({ rps: rps[rps.length - 1], p95: p95[p95.length - 1] })

  useEffect(() => {
    const t = setInterval(() => {
      setData((prev) => {
        let r = prev.rps[prev.rps.length - 1] + (Math.random() - 0.5) * 140
        r = Math.min(1650, Math.max(850, r))
        let p = prev.p95[prev.p95.length - 1] + (Math.random() - 0.5) * 8
        p = Math.min(98, Math.max(38, p))
        latest.current = { rps: r, p95: p }
        return {
          rps: [...prev.rps.slice(1), r],
          p95: [...prev.p95.slice(1), p],
        }
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const rpsPath = toPath(rps, 800, 1700)
  const p95Path = toPath(p95, 20, 110)

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Throughput &amp; p95 latency</span>
        <div className="chart-legend">
          <span className="legend-item">
            <span className="legend-dot" style={{ background: 'var(--cyan)' }} />
            {Math.round(latest.current.rps)} req/s
          </span>
          <span className="legend-item">
            <span className="legend-dot" style={{ background: 'var(--amber)' }} />
            {Math.round(latest.current.p95)}ms p95
          </span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none">
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="var(--border)" strokeWidth="1" />
        ))}
        <path d={rpsPath} fill="none" stroke="var(--cyan)" strokeWidth="1.8" />
        <path d={p95Path} fill="none" stroke="var(--amber)" strokeWidth="1.8" opacity="0.85" />
      </svg>
    </div>
  )
}
