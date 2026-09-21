import { useEffect, useState } from 'react'

export default function Monitoring() {
  const [drift, setDrift] = useState(0.08)
  const [errRate, setErrRate] = useState(0.12)

  useEffect(() => {
    const t = setInterval(() => {
      setDrift((d) => Math.min(0.4, Math.max(0.02, d + (Math.random() - 0.5) * 0.03)))
      setErrRate((e) => Math.min(1.2, Math.max(0.01, e + (Math.random() - 0.5) * 0.1)))
    }, 2200)
    return () => clearInterval(t)
  }, [])

  const driftLevel = drift > 0.25 ? 'var(--amber)' : 'var(--green)'

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Prometheus / Grafana</span>
        <span className="panel-hint">data drift · errors · uptime</span>
      </div>
      <div className="metric-line">
        <span className="k">Feature drift (PSI)</span>
        <span>
          <span className="bar-track">
            <span className="bar-fill" style={{ width: `${drift * 200}%`, background: driftLevel }} />
          </span>{' '}
          {drift.toFixed(3)}
        </span>
      </div>
      <div className="metric-line">
        <span className="k">Request error rate</span>
        <span style={{ color: errRate > 0.8 ? 'var(--red)' : 'var(--text)' }}>{errRate.toFixed(2)}%</span>
      </div>
      <div className="metric-line">
        <span className="k">30d uptime</span>
        <span className="v" style={{ color: 'var(--green)' }}>99.94%</span>
      </div>
      <div className="metric-line">
        <span className="k">Alertmanager</span>
        <span style={{ color: 'var(--green)' }}>0 firing</span>
      </div>
    </div>
  )
}
