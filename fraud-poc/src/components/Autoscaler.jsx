import { useEffect, useState } from 'react'

export default function Autoscaler() {
  const [active, setActive] = useState(3)
  const [cpu, setCpu] = useState(41)

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => {
        const drift = Math.random() < 0.5 ? -1 : 1
        return Math.min(8, Math.max(2, a + (Math.random() < 0.35 ? drift : 0)))
      })
      setCpu((c) => Math.min(92, Math.max(28, c + (Math.random() - 0.5) * 14)))
    }, 1600)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">HPA — inference deployment</span>
        <span className="panel-hint">2–8 replicas</span>
      </div>

      <div className="pods-row">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className={`pod ${i < active ? 'active' : 'idle'}`}>
            {i < active && (
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="var(--cyan)" strokeWidth="2" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div className="metric-line">
        <span className="k">Active pods</span>
        <span>{active} / 8</span>
      </div>
      <div className="metric-line">
        <span className="k">Avg CPU</span>
        <span>
          <span className="bar-track">
            <span
              className="bar-fill"
              style={{ width: `${cpu}%`, background: cpu > 75 ? 'var(--amber)' : 'var(--cyan)' }}
            />
          </span>{' '}
          {Math.round(cpu)}%
        </span>
      </div>
      <div className="metric-line">
        <span className="k">Scale trigger</span>
        <span>CPU &gt; 70%</span>
      </div>
      <div className="metric-line">
        <span className="k">Image</span>
        <span>fraud-api:v1.9.2</span>
      </div>
    </div>
  )
}
