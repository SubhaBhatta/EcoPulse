import axios from 'axios';


// API Keys from Environment Variables
const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const WAQI_TOKEN = import.meta.env.VITE_WAQI_TOKEN;
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// Kathmandu Coordinates
export const KATHMANDU_COORDS = {
  lat: 27.7172,
  lon: 85.3240
};

// Weather API
export const fetchWeather = async () => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${KATHMANDU_COORDS.lat}&lon=${KATHMANDU_COORDS.lon}&appid=${OPENWEATHER_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    // Return mock data for demo if API fails
    return {
      main: { temp: 24, humidity: 65, pressure: 1012 },
      wind: { speed: 3.5 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      name: 'Kathmandu'
    };
  }
};

export const fetchForecast = async () => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${KATHMANDU_COORDS.lat}&lon=${KATHMANDU_COORDS.lon}&appid=${OPENWEATHER_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
};

// Air Quality API (WAQI)
export const fetchAQI = async () => {
  try {
    const response = await axios.get(`https://api.waqi.info/feed/@1825/?token=${WAQI_TOKEN}`);
    const raw = response.data;
    // WAQI wraps payload: { status: "ok", data: { aqi: ..., iaqi: ... } }
    if (raw?.status === 'ok' && raw.data) {
      const d = raw.data;
      // aqi can sometimes come back as "-" (string) when the station is offline
      const aqiNum = typeof d.aqi === 'number' ? d.aqi : parseInt(d.aqi, 10);
      return {
        ...d,
        aqi: isNaN(aqiNum) ? 0 : aqiNum,
      };
    }
    throw new Error('WAQI status not ok');
  } catch (error) {
    console.error('Error fetching AQI:', error);
    // Return mock AQI data for demo
    return {
      aqi: 124,
      dominentpol: 'pm25',
      iaqi: {
        pm25: { v: 124 },
        pm10: { v: 56 },
        no2: { v: 12 },
        so2: { v: 2 },
        o3: { v: 45 }
      }
    };
  }
};

// News API Integration (newsdata.io — supports CORS natively)
export const fetchNews = async () => {
  if (!NEWS_API_KEY) {
    return null;
  }
  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/latest?apikey=${NEWS_API_KEY}&q=environment OR climate OR pollution&country=np&language=en`
    );
    // newsdata.io returns articles under 'results', not 'articles'
    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching News API:', error);
    return null;
  }
};


