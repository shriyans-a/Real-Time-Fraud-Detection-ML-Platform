const MODELS = [
  { ver: 'xgb-v1.9.2', tag: 'prod', meta: 'PR-AUC 0.962 · promoted 3d ago' },
  { ver: 'xgb-v1.9.1', tag: 'archived', meta: 'PR-AUC 0.958 · rolled back' },
  { ver: 'xgb-v2.0.0-rc1', tag: 'staging', meta: 'PR-AUC 0.965 · shadow traffic 5%' },
]

export default function ModelRegistry() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">MLflow registry</span>
        <span className="panel-hint">fraud-classifier</span>
      </div>
      {MODELS.map((m) => (
        <div className="model-row" key={m.ver}>
          <div>
            <div className="ver">{m.ver}</div>
            <div className="meta">{m.meta}</div>
          </div>
          <span className={`tag ${m.tag}`}>{m.tag}</span>
        </div>
      ))}
    </div>
  )
}
