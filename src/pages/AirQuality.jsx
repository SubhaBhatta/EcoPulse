import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wind, Info, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/UIElements';

const aqiHistory = [
  { time: '00:00', aqi: 110 },
  { time: '04:00', aqi: 140 },
  { time: '08:00', aqi: 190 },
  { time: '12:00', aqi: 165 },
  { time: '16:00', aqi: 124 },
  { time: '20:00', aqi: 105 },
  { time: '23:59', aqi: 115 },
];

const PollutantCard = ({ symbol, name, value, unit, color }) => (
  <div className="p-4 glass rounded-xl border border-white/5 bg-white/5">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xl font-black" style={{ color }}>{symbol}</span>
      <Info size={14} className="text-slate-600" />
    </div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-[10px] text-slate-500 uppercase font-medium">{name} ({unit})</p>
  </div>
);

const AirQuality = () => {
  const { aqi } = useApp();

  return (
    <div className="space-y-8 pb-10">
      <section className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2">
             <Wind size={20} />
             <span className="font-bold uppercase tracking-widest text-[10px]">AQI Intelligence</span>
          </div>
          <h2 className="text-3xl font-black">Air Pollutant <span className="text-primary italic">Analytics</span></h2>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-sm glass px-4 py-2 rounded-xl">
           <MapPin size={16} />
           <span>Kathmandu, Bagmati Province</span>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <GlassCard className="h-[400px]">
            <h3 className="text-lg font-bold mb-6">24h Pollution Trend</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={aqiHistory}>
                  <defs>
                    <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00C853" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00C853" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#00C853' }}
                  />
                  <Area type="monotone" dataKey="aqi" stroke="#00C853" strokeWidth={3} fillOpacity={1} fill="url(#colorAqi)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
             <PollutantCard symbol="PM2.5" name="Fine Matter" value={aqi?.iaqi?.pm25?.v || '--'} unit="µg/m³" color="#FF5252" />
             <PollutantCard symbol="PM10" name="Coarse Matter" value={aqi?.iaqi?.pm10?.v || '--'} unit="µg/m³" color="#FFD600" />
             <PollutantCard symbol="CO" name="Carbon Monox." value={aqi?.iaqi?.co?.v || '--'} unit="ppm" color="#00E676" />
             <PollutantCard symbol="NO2" name="Nitrogen Diox." value={aqi?.iaqi?.no2?.v || '--'} unit="ppb" color="#76FF03" />
             <PollutantCard symbol="O3" name="Ozone" value={aqi?.iaqi?.o3?.v || '--'} unit="ppb" color="#00C853" />
          </div>
        </div>

        <GlassCard className="flex flex-col gap-6">
           <h3 className="text-lg font-bold">Health Implications</h3>
           <div className="space-y-4">
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                 <p className="text-primary font-bold text-sm mb-1 uppercase tracking-tight">Active Group</p>
                 <p className="text-xs text-slate-300 leading-relaxed">Consider reducing prolonged or heavy exertion outdoors. Take more breaks during outdoor activities.</p>
              </div>
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                 <p className="text-orange-500 font-bold text-sm mb-1 uppercase tracking-tight">Sensitive Group</p>
                 <p className="text-xs text-slate-300 leading-relaxed">Wear N95 masks when traveling through traffic hotspots like Koteshwor or Kalanki.</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                 <p className="text-blue-500 font-bold text-sm mb-1 uppercase tracking-tight">AI Strategy</p>
                 <p className="text-xs text-slate-300 leading-relaxed">EcoPulse suggests closing windows until 11 PM when temperature inversions typically lift.</p>
              </div>
           </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AirQuality;
