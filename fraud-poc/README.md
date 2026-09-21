# Fraud Detection ML Platform — Console (React)

A React front-end console for a real-time fraud detection ML platform. Built to sit
on top of a FastAPI + Kubernetes inference service, with panels for live scoring,
autoscaling, model registry (MLflow), and monitoring (Prometheus/Grafana).

This repo ships with **simulated data** so it runs and looks right with zero backend —
swap the mock generators for real API/websocket calls when you wire it to your
actual service (see "Connecting real data" below).

## Stack

React 18 + Vite. No UI framework — plain CSS with a small token system in `src/index.css`.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

`npm run build` outputs a static `dist/` folder — deploy it to GitHub Pages, Vercel,
Netlify, or any static host so anyone can open it from a link.

### Quick GitHub Pages deploy

```bash
npm run build
npx gh-pages -d dist
```

(Requires `gh-pages` as a dev dependency: `npm i -D gh-pages`.)

## Project structure

```
src/
  App.jsx                    # composes the console layout
  components/
    Topbar.jsx                # brand, live clock, repo link
    Hero.jsx                  # transaction count + precision/recall/F1/PR-AUC
    TransactionStream.jsx     # live-scrolling scored transactions
    LatencyChart.jsx          # req/sec + p95 latency sparkline (pure SVG)
    Autoscaler.jsx            # k8s HPA pod visual, 2–8 replicas
    ModelRegistry.jsx         # MLflow model versions + stage tags
    Monitoring.jsx            # data drift, error rate, uptime
    Pipeline.jsx               # GitHub Actions CI/CD step strip
    Footer.jsx                 # tech stack chips
```

## Connecting real data

Every panel generates its own mock data with a `setInterval` loop, so it's
straightforward to swap in real sources:

- **TransactionStream** — replace `genTx()` with a websocket subscription to your
  FastAPI `/predict` stream, or poll a `/recent-predictions` endpoint.
- **LatencyChart** — feed it real p95 latency + req/sec from your Prometheus
  `/metrics` endpoint (e.g. via a small backend proxy that returns JSON).
- **Autoscaler** — call the Kubernetes API (or a small backend endpoint that wraps
  `kubectl get hpa`) for live replica count and CPU utilization.
- **ModelRegistry** — call the MLflow REST API
  (`GET /api/2.0/mlflow/registered-models/get-latest-versions`).
- **Monitoring** — pull drift/error-rate from your Grafana/Prometheus stack, or a
  custom `/health` + `/drift` endpoint.

## License

MIT — use freely in your own portfolio.
