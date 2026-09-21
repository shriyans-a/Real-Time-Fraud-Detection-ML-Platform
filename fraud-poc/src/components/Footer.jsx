const STACK = ['Python', 'SQL', 'XGBoost', 'FastAPI', 'Docker', 'Kubernetes', 'MLflow', 'GitHub Actions', 'Prometheus', 'Grafana']

export default function Footer() {
  return (
    <div className="footer">
      <div className="stack-chips">
        {STACK.map((s) => (
          <span className="chip" key={s}>{s}</span>
        ))}
      </div>
      <span className="note">All metrics on this page are simulated for demo purposes.</span>
    </div>
  )
}
