import { useEffect, useState } from 'react'

export default function Topbar({ repoUrl }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="topbar">
      <div className="brand">
        <span className="mark">λ</span>
        <h1>fraud-detect</h1>
        <span className="sub">production console</span>
      </div>
      <div className="topbar-right">
        <span className="live-pill">
          <span className="live-dot" />
          LIVE — SIMULATED
        </span>
        <span className="repo-link" style={{ fontFamily: 'var(--font-mono)' }}>
          {time.toLocaleTimeString('en-US', { hour12: false })} UTC
        </span>
        <a className="repo-link" href={repoUrl} target="_blank" rel="noreferrer">
          view source →
        </a>
      </div>
    </div>
  )
}
