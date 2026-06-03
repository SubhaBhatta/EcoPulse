import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`glass-card ${className}`}
  >
    {children}
  </motion.div>
);

export const PollutionGauge = ({ value, label, sublabel }) => {
  const getAQIColor = (v) => {
    if (v <= 50) return '#00C853';
    if (v <= 100) return '#FFD600';
    if (v <= 150) return '#FF9100';
    return '#FF5252';
  };

  const percentage = Math.min((value / 300) * 100, 100);
  const color = getAQIColor(value);

  return (
    <div className="relative flex flex-col items-center">
      <svg className="w-48 h-48 transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r="80"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="12"
          fill="transparent"
        />
        <motion.circle
          initial={{ strokeDasharray: "0 502" }}
          animate={{ strokeDasharray: `${(percentage / 100) * 502} 502` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx="96"
          cy="96"
          r="80"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          fill="transparent"
          style={{ filter: `drop-shadow(0 0 8px ${color}44)` }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <motion.span 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl font-black block"
        >
          {value}
        </motion.span>
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</span>
      </div>
      {sublabel && <p className="mt-4 text-sm font-medium text-slate-300">{sublabel}</p>}
    </div>
  );
};

export const MiniStat = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-4 p-4 glass rounded-xl border border-white/5">
    <div className={`p-2 rounded-lg bg-opacity-10`} style={{ backgroundColor: `${color}22`, color }}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  </div>
);
