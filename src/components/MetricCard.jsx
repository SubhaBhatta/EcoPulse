import { motion } from 'framer-motion'
import AnimatedNumber from './AnimatedNumber.jsx'

export default function MetricCard({ icon: Icon, label, value, suffix = '', prefix = '', tone = 'emerald', detail }) {
  const tones = {
    emerald: 'from-emerald-400/25 to-lime-300/10 text-emerald-400',
    cyan: 'from-cyan-400/25 to-blue-300/10 text-cyan-400',
    amber: 'from-amber-300/25 to-yellow-300/10 text-amber-400',
    rose: 'from-rose-400/25 to-red-300/10 text-rose-400',
  }

  return (
    <motion.div whileHover={{ y: -3 }} className="glass rounded-3xl p-4">
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tones[tone]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <p className="metric-label">{label}</p>
      <AnimatedNumber value={value} suffix={suffix} prefix={prefix} className="mt-1 block text-3xl font-bold" />
      {detail && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{detail}</p>}
    </motion.div>
  )
}
