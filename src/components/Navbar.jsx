import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const { healthScore } = useApp();

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-20 glass border-b border-white/5 px-6 flex items-center justify-between z-40">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 hover:bg-white/5 rounded-lg">
          <Menu size={24} />
        </button>
        <div className="relative hidden md:block">
          <input 
            type="text" 
            placeholder="EcoPulse-KTM" 
            className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 w-[200%] focus:outline-none focus:border-primary/50 transition-colors"
            disabled= "true"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end  sm:flex">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">KTM Health Score</span>
          <span className={`text-lg font-bold ${healthScore > 70 ? 'text-primary' : healthScore > 40 ? 'text-warning' : 'text-danger'}`}>
            {healthScore}/100
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent p-[2px]">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <User size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
