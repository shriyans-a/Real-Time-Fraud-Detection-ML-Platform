import { useEffect, useRef, useState } from 'react'

const MERCHANTS = [
  'Northwind Retail', 'Apex Electronics', 'Cascade Travel', 'Union Grocers',
  'Fleet Fuel Co.', 'Harbor Digital', 'Lumen Subscriptions', 'Pinewood Hardware',
  'Vertex Gaming', 'Solstice Airlines', 'Meridian Pharmacy', 'Anchor Insurance',
]

function genTx(id) {
  const score = Math.random()
  // skew most scores low, occasional spike, like a real fraud model
  const risk = Math.random() < 0.12 ? 0.8 + Math.random() * 0.2 : score * 0.55
  const decision = risk > 0.85 ? 'block' : risk > 0.55 ? 'hold' : 'approve'
  return {
    id,
    merchant: MERCHANTS[Math.floor(Math.random() * MERCHANTS.length)],
    amount: (Math.random() * 1800 + 5).toFixed(2),
    risk,
    decision,
  }
}

export default function TransactionStream() {
  const idRef = useRef(880214)
  const [rows, setRows] = useState(() =>
    Array.from({ length: 8 }, () => genTx(++idRef.current))
  )

  useEffect(() => {
    const t = setInterval(() => {
      setRows((prev) => [genTx(++idRef.current), ...prev].slice(0, 9))
    }, 1100)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Live inference stream</span>
        <span className="panel-hint">FastAPI /predict · p95 &lt;100ms</span>
      </div>
      <div className="tx-list">
        {rows.map((r) => (
          <div className="tx-row" key={r.id}>
            <span className="id">#{r.id}</span>
            <span className="merchant">{r.merchant}</span>
            <span className="amount">${r.amount}</span>
            <span className="score" style={{ color: r.risk > 0.55 ? 'var(--amber)' : 'var(--text-dim)' }}>
              {r.risk.toFixed(3)}
            </span>
            <span className={`badge ${r.decision}`}>{r.decision.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
