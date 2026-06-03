import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWeather, fetchAQI } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState(() => {
    const saved = localStorage.getItem('ecoStats');
    return saved ? JSON.parse(saved) : {
      points: 0,
      level: 'Green Hero',
      challenges: [
        { id: 1, title: 'Walk to Workspace', points: 50, completed: false },
        { id: 2, title: 'No Plastic Day', points: 100, completed: false },
        { id: 3, title: 'Plant a Seedling', points: 200, completed: false }
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem('ecoStats', JSON.stringify(userStats));
  }, [userStats]);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [weatherData, aqiData] = await Promise.all([
        fetchWeather(),
        fetchAQI()
      ]);
      setWeather(weatherData);
      setAqi(aqiData);
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const completeChallenge = (id) => {
    setUserStats(prev => ({
      ...prev,
      points: prev.points + (prev.challenges.find(c => c.id === id)?.points || 0),
      challenges: prev.challenges.map(c => 
        c.id === id ? { ...c, completed: true } : c
      )
    }));
  };

  const calculateHealthScore = () => {
    if (!aqi || !weather) return 0;
    const aqiVal = typeof aqi.aqi === 'number' ? aqi.aqi : 0;
    const temp = weather?.main?.temp ?? 22;
    const aqiScore = Math.max(0, 100 - (aqiVal / 3)); 
    const tempComfort = Math.max(0, 100 - Math.abs(temp - 22) * 4);
    const result = Math.round((aqiScore * 0.7) + (tempComfort * 0.3));
    return isNaN(result) ? 0 : result;
  };

  return (
    <AppContext.Provider value={{
      weather,
      aqi,
      loading,
      userStats,
      completeChallenge,
      healthScore: calculateHealthScore(),
      refreshData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
