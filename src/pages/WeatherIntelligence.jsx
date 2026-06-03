import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Sunrise, Sunset, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../context/AppContext';
import { GlassCard, MiniStat } from '../components/UIElements';

const forecastData = [
  { time: 'Mon', temp: 24 },
  { time: 'Tue', temp: 26 },
  { time: 'Wed', temp: 22 },
  { time: 'Thu', temp: 25 },
  { time: 'Fri', temp: 27 },
  { time: 'Sat', temp: 24 },
  { time: 'Sun', temp: 23 },
];

const WeatherIntelligence = () => {
  const { weather, loading } = useApp();

  return (
    <div className="space-y-8 pb-10">
      <section className="flex flex-col md:flex-row justify-between items-end gap-6 text-slate-100">
        <div>
          <h2 className="text-3xl font-black mb-2">Weather <span className="text-secondary italic">-KTM</span></h2>
          <p className="text-slate-500">Advanced meteorological data for Kathmandu Valley.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Weather Card */}
        <div className="lg:col-span-2 space-y-8">
          <GlassCard className="relative overflow-hidden p-8">
             <div className="absolute top-0 right-0 p-8">
                {weather?.weather?.[0]?.main === 'Clear' ? <Sun className="text-warning animate-spin-slow" size={80} /> : <Cloud className="text-slate-400" size={80} />}
             </div>
             <div className="relative z-10">
                <span className="text-sm font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">Current Weather</span>
                <div className="mt-6 flex items-end gap-4">
                   <h3 className="text-7xl font-black">{weather?.main?.temp}°C</h3>
                   <div className="mb-2">
                      <p className="text-2xl font-bold">{weather?.weather?.[0]?.main}</p>
                      <p className="text-slate-500 capitalize">{weather?.weather?.[0]?.description}</p>
                   </div>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-6 mt-10">
                   <div className="text-center">
                      <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Humidity</p>
                      <p className="font-bold">{weather?.main?.humidity}%</p>
                   </div>
                   <div className="text-center border-l border-white/5">
                      <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Pressure</p>
                      <p className="font-bold">{weather?.main?.pressure} hPa</p>
                   </div>
                   <div className="text-center border-l border-white/5">
                      <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">UV Index</p>
                      <p className="font-bold text-accent">3 (Low)</p>
                   </div>
                   <div className="text-center border-l border-white/5">
                      <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Cloudiness</p>
                      <p className="font-bold">20%</p>
                   </div>
                   <div className="text-center border-l border-white/5">
                      <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Visibility</p>
                      <p className="font-bold">10 km</p>
                   </div>
                </div>
             </div>
          </GlassCard>

          <GlassCard className="h-[350px]">
             <h3 className="text-lg font-bold mb-6">7-Day Temperature Trend</h3>
             <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData}>
                    <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    />
                    <Line type="monotone" dataKey="temp" stroke="#00C853" strokeWidth={3} dot={{ fill: '#00C853', strokeWidth: 2 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
             </div>
          </GlassCard>
        </div>

        {/* Sun & Wind */}
        <div className="space-y-6">
           <GlassCard>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 italic"><Wind size={20} className="text-primary" /> Wind Conditions</h3>
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Wind Speed</span>
                    <span className="text-xl font-black">{weather?.wind?.speed} km/h</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Gusts</span>
                    <span className="text-xl font-black">{Math.round(weather?.wind?.speed * 1.5)} km/h</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Direction</span>
                    <span className="text-xl font-black">280° NW</span>
                 </div>
              </div>
           </GlassCard>

           <GlassCard className="bg-gradient-to-br from-orange-500/10 to-transparent">
              <h3 className="text-lg font-bold mb-6 italic">Astro Times</h3>
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-warning/20 rounded-xl text-warning">
                       <Sunrise size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-[10px] uppercase font-bold">Sunrise</p>
                        <p className="text-xl font-black">05:12 AM</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500/20 rounded-xl text-orange-500">
                       <Sunset size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-[10px] uppercase font-bold">Sunset</p>
                        <p className="text-xl font-black">06:58 PM</p>
                    </div>
                 </div>
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default WeatherIntelligence;
