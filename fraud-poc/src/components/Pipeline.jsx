const STEPS = ['lint', 'unit tests', 'train + eval', 'build image', 'push registry', 'deploy k8s', 'smoke test']

export default function Pipeline() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">GitHub Actions — last run</span>
        <span className="panel-hint">main @ a1c9f2e · 4m12s</span>
      </div>
      <div className="pipeline">
        {STEPS.map((s, i) => (
          <span className="pstep" key={s}>
            {i > 0 && <span className="arrow">→</span>}
            <span className="dot" />
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
