import CarbonCalculator from '../components/CarbonCalculator.jsx'

export default function Carbon() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="metric-label">Personal impact</p>
        <h1 className="text-4xl font-black">Carbon Footprint</h1>
      </div>
      <CarbonCalculator />
    </div>
  )
}
