import { Calculator } from 'lucide-react'
import { useMemo, useState } from 'react'
import AnimatedNumber from './AnimatedNumber.jsx'

export default function CarbonCalculator() {
  const [vehicle, setVehicle] = useState(8)
  const [electricity, setElectricity] = useState(5)
  const [flights, setFlights] = useState(1)

  const footprint = useMemo(() => {
    return vehicle * 0.19 * 30 + electricity * 0.45 * 30 + flights * 110
  }, [vehicle, electricity, flights])

  return (
    <div className="premium-card">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-400">
          <Calculator className="h-6 w-6" />
        </div>
        <div>
          <p className="metric-label">AI-ready estimate</p>
          <h2 className="text-2xl font-bold">Carbon Footprint Calculator</h2>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <Slider label="Vehicle km/day" value={vehicle} setValue={setVehicle} max={60} />
        <Slider label="Electricity kWh/day" value={electricity} setValue={setElectricity} max={25} />
        <Slider label="Flights/year" value={flights} setValue={setFlights} max={12} />
      </div>
      <div className="mt-7 rounded-3xl bg-slate-950 p-6 text-white">
        <p className="text-sm text-slate-400">Estimated monthly footprint</p>
        <AnimatedNumber value={footprint} suffix=" kg CO2e" decimals={1} className="mt-2 block text-4xl font-bold text-emerald-300" />
        <p className="mt-4 text-sm leading-6 text-slate-300">Switching two short rides per week to walking, reducing evening electricity peaks, and choosing electric public transport can cut this estimate by 15-25%.</p>
      </div>
    </div>
  )
}

function Slider({ label, value, setValue, max }) {
  return (
    <label className="block rounded-3xl bg-white/55 p-4 dark:bg-white/5">
      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
      <input type="range" min="0" max={max} value={value} onChange={(event) => setValue(Number(event.target.value))} className="mt-4 w-full accent-emerald-400" />
      <span className="mt-2 block text-2xl font-bold">{value}</span>
    </label>
  )
}
