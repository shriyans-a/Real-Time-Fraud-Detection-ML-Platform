import './App.css'
import Topbar from './components/Topbar.jsx'
import Hero from './components/Hero.jsx'
import TransactionStream from './components/TransactionStream.jsx'
import LatencyChart from './components/LatencyChart.jsx'
import Autoscaler from './components/Autoscaler.jsx'
import ModelRegistry from './components/ModelRegistry.jsx'
import Monitoring from './components/Monitoring.jsx'
import Pipeline from './components/Pipeline.jsx'
import Footer from './components/Footer.jsx'

// Replace with your repo URL
const REPO_URL = 'https://github.com/your-username/fraud-detection-ml-platform'

export default function App() {
  return (
    <div className="console">
      <Topbar repoUrl={REPO_URL} />
      <Hero />

      <div className="grid">
        <div>
          <TransactionStream />
          <LatencyChart />
          <Pipeline />
        </div>
        <div>
          <Autoscaler />
          <ModelRegistry />
          <Monitoring />
        </div>
      </div>

      <Footer />
    </div>
  )
}
