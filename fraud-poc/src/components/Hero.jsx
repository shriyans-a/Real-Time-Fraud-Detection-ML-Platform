import { useEffect, useState } from 'react'

export default function Hero() {
  const [count, setCount] = useState(1042318)

  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 14) + 3)
    }, 900)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="hero">
      <div className="hero-count">
        <div className="label">TRANSACTIONS SCORED — TRAINING + PROD REPLAY</div>
        <div className="value">
          {count.toLocaleString('en-US')}
          <span className="unit">rows processed</span>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat">
          <div className="k">PRECISION</div>
          <div className="v green">0.941</div>
        </div>
        <div className="stat">
          <div className="k">RECALL</div>
          <div className="v green">0.887</div>
        </div>
        <div className="stat">
          <div className="k">F1</div>
          <div className="v">0.913</div>
        </div>
        <div className="stat">
          <div className="k">PR-AUC</div>
          <div className="v cyan">0.962</div>
        </div>
      </div>
    </div>
  )
}
