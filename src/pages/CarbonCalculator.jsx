import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Lightbulb, Plane, Wind, PieChart, Info, Leaf, Cloud } from 'lucide-react';
import { GlassCard } from '../components/UIElements';

const CarbonCalculator = () => {
  const [inputs, setInputs] = useState({
    transport: 10,
    electricity: 50,
    flights: 2,
  });

  const calculateFootprint = () => {
    return (inputs.transport * 0.2) + (inputs.electricity * 0.4) + (inputs.flights * 150);
  };

  const footprint = calculateFootprint();
  const index = Math.max(0, 100 - (footprint / 10));

  return (
    <div className="space-y-8 pb-10">
      <section>
        <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
          Footprint <span className="text-secondary italic">Analytics</span> <PieChart className="text-secondary" />
        </h2>
        <p className="text-slate-500">Calculate your personal impact on Kathmandu's ecosystem.</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="space-y-8">
          <h3 className="text-xl font-bold border-b border-white/5 pb-4">Daily Habits</h3>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold flex items-center gap-2"><Car size={16} /> Daily Travel (km)</label>
                <span className="text-primary font-bold">{inputs.transport} km</span>
              </div>
              <input 
                type="range" min="0" max="100" 
                value={inputs.transport}
                onChange={(e) => setInputs({...inputs, transport: parseInt(e.target.value)})}
                className="w-full accent-primary bg-white/5 h-2 rounded-lg appearance-none cursor-pointer" 
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold flex items-center gap-2"><Lightbulb size={16} /> Electricity Usage (kWh/mo)</label>
                <span className="text-primary font-bold">{inputs.electricity} kWh</span>
              </div>
              <input 
                type="range" min="0" max="500" 
                value={inputs.electricity}
                onChange={(e) => setInputs({...inputs, electricity: parseInt(e.target.value)})}
                className="w-full accent-primary bg-white/5 h-2 rounded-lg appearance-none cursor-pointer" 
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold flex items-center gap-2"><Plane size={16} /> Yearly Flights</label>
                <span className="text-primary font-bold">{inputs.flights} trips</span>
              </div>
              <input 
                type="range" min="0" max="20" 
                value={inputs.flights}
                onChange={(e) => setInputs({...inputs, flights: parseInt(e.target.value)})}
                className="w-full accent-primary bg-white/5 h-2 rounded-lg appearance-none cursor-pointer" 
              />
            </div>
          </div>
        </GlassCard>

        <div className="space-y-8">
          <GlassCard className="text-center py-10 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-danger via-warning to-primary" />
             <div className="relative z-10">
                <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold mb-2">Estimated Footprint</p>
                <h3 className="text-6xl font-black text-gradient">{Math.round(footprint)} kg</h3>
                <p className="text-slate-400 mt-2 font-medium">CO2 per month</p>
             </div>
             
             <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-6 text-left">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
                   <Leaf className="text-accent" size={32} />
                </div>
                <div>
                   <p className="text-sm font-bold text-white mb-1">Impact Analysis</p>
                   <p className="text-xs text-slate-400 leading-relaxed">
                     {footprint < 300 ? "Your footprint is below the Kathmandu average. Great work!" : "Your footprint is higher than average for this region. AI recommends taking public EV transport."}
                   </p>
                </div>
             </div>
          </GlassCard>

          <GlassCard className="flex flex-col items-center justify-center py-6">
             <div className="text-center mb-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Personal Sustainability Index</p>
                <p className="text-3xl font-black text-white">{Math.round(index)}/100</p>
             </div>
             <div className="w-full max-w-xs h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                   className="h-full bg-gradient-to-r from-danger via-warning to-primary"
                   initial={{ width: 0 }}
                   animate={{ width: `${index}%` }}
                />
             </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;
