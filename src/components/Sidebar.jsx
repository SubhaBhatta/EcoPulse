import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CloudSun, Wind, Map, MessageSquare, Trophy, BarChart3, Zap, Camera, Newspaper } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = () => {
  const { userStats } = useApp();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: CloudSun, label: 'Weather', path: '/weather' },
    { icon: Wind, label: 'Air Quality', path: '/aqi' },
    { icon: Zap, label: 'Carbon Calc', path: '/carbon' },
    { icon: Newspaper, label: 'News', path: '/news' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 glass border-r border-white/10 p-6 flex flex-col hidden lg:flex z-50">
      
      <NavLink to="/" className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-glow">
          <Wind className="text-background" size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight">
          EcoPulse <span className="text-primary italic">KTM</span>
        </h1>
      </NavLink>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
              ${isActive ? 'bg-primary text-background' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`
            }
          >
            <item.icon size={20} className="transition-transform group-hover:scale-110" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      
    </aside>
  );
};

export default Sidebar;
