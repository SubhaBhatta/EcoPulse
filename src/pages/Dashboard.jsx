import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Wind,
  Thermometer,
  Droplets,
  Navigation,
  AlertTriangle,
  ArrowRight,
  Zap,
  Leaf,
  Newspaper,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { GlassCard, PollutionGauge, MiniStat } from "../components/UIElements";

const Dashboard = () => {
  const { weather, aqi, healthScore, loading } = useApp();

  if (loading)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl p-8 lg:p-12 min-h-[350px] flex flex-col justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544257140-621f375f498e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 -z-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10 -z-10" />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-2xl">
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest mb-6 inline-block">
            Intelligence Report • Kathmandu Valley
          </span>
          <h2 className="text-4xl lg:text-7xl font-black mb-6 leading-tight">
            Know the <span className="text-gradient">Air You Breathe</span>
          </h2>

          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4 mb-8 max-w-lg backdrop-blur-md">
            <div className="p-2 bg-primary/20 rounded-lg text-primary">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">AI Quick Insight:</p>
              <p className="text-sm text-slate-400 italic">
                "Today Kathmandu has a Moderate Environmental Risk (
                {healthScore}/100). Outdoor exercise is recommended after 5 PM
                due to lower AQI levels."
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Live Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-1 flex flex-col items-center justify-center py-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
          <PollutionGauge
            value={aqi?.aqi || 0}
            label="Current AQI"
            sublabel={
              aqi?.aqi <= 50
                ? "Healthy"
                : aqi?.aqi <= 100
                  ? "Moderate"
                  : "Unhealthy"
            }
          />
        </GlassCard>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="flex flex-col justify-between overflow-hidden relative">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 blur-3xl rounded-full" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                  Environmental Index
                </p>
                <h3 className="text-2xl font-bold">KTM Health Score</h3>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl">
                <Leaf className="text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-6xl font-black text-white">
                {healthScore}%
              </span>
              <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${healthScore}%` }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              {healthScore > 70
                ? "Green Zone: Excellent environment today."
                : "Amber Zone: Moderate pollution risk detected."}
            </p>
          </GlassCard>

          <div className="grid grid-cols-2 gap-4">
            <MiniStat
              icon={Thermometer}
              label="Temperature"
              value={`${weather?.main?.temp || "--"}°C`}
              color="#FFD600"
            />
            <MiniStat
              icon={Droplets}
              label="Humidity"
              value={`${weather?.main?.humidity || "--"}%`}
              color="#00E676"
            />
            <MiniStat
              icon={Navigation}
              label="Wind Speed"
              value={`${weather?.wind?.speed || "--"} km/h`}
              color="#76FF03"
            />
            <MiniStat
              icon={Zap}
              label="UV Index"
              value="3 Low"
              color="#FF5252"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {/* News Feed */}
        <GlassCard>
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Newspaper className="text-secondary w-7 h-7" />
            <h3 className="text-2xl font-extrabold tracking-tight">
              EcoPulse News Feed
            </h3>
          </div>

          <div className="grid grid-rows-3 gap-6 w-full justify-items-center">
            {[
              {
                title: "New Electric Bus Fleet Hits KTM Roads",
                time: "2h ago",
                tag: "Action",
              },
              {
                title: "Bagmati Clean-up Drive: Week 542 Complete",
                time: "5h ago",
                tag: "Community",
              },
              {
                title: "Air Quality Warnings Issued for Koteshwor Area",
                time: "1d ago",
                tag: "Alert",
              },
            ].map((news, idx) => (
              <div
                key={idx}
                className="w-full max-w-3xl group cursor-pointer p-5 hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/5 transition-all">
                <span className="text-xs text-primary font-bold uppercase mb-2 block tracking-wider">
                  {news.tag}
                </span>
                <h4 className="text-lg font-semibold group-hover:text-primary transition-colors leading-snug">
                  {news.title}
                </h4>
                <span className="text-sm text-slate-500 mt-2 block">
                  {news.time}
                </span>
              </div>
            ))}
          </div>

          <Link
            to="/news"
            className="w-full mt-6 text-sm text-slate-500 hover:text-white transition-colors underline flex items-center justify-center gap-2">
            View All Regional News
          </Link>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;
