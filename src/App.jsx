import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import WeatherIntelligence from './pages/WeatherIntelligence';
import AirQuality from './pages/AirQuality';
import CarbonCalculator from './pages/CarbonCalculator';

import News from './pages/News';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <div className="flex min-h-screen bg-background text-slate-100">
          <Sidebar />
          <div className="flex-1 lg:ml-64 relative">
            <Navbar />
            <main className="pt-24 px-6 lg:px-10 max-w-7xl mx-auto min-h-screen">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/weather" element={<WeatherIntelligence />} />
                <Route path="/aqi" element={<AirQuality />} />
                <Route path="/carbon" element={<CarbonCalculator />} />
                <Route path="/news" element={<News />} />
                <Route path = "*" element = {<NotFound/>} />
              </Routes>
            </main>
            
            {/* Background Decorative Elements */}
            <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none -z-10" />
          </div>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
