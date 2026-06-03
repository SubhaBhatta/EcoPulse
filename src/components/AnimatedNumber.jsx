import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export default function AnimatedNumber({ value = 0, suffix = '', prefix = '', decimals = 0, className = '' }) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => `${prefix}${Number(latest).toFixed(decimals)}${suffix}`)

  useEffect(() => {
    const controls = animate(motionValue, Number(value) || 0, { duration: 1.1, ease: 'easeOut' })
    return controls.stop
  }, [motionValue, value])

  return <motion.span className={className}>{rounded}</motion.span>
}
