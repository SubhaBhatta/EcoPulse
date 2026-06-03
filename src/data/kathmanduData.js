export const KATHMANDU = {
  name: "Kathmandu Valley",
  lat: 27.7172,
  lon: 85.324,
};

export const fallbackWeather = {
  temp: 24,
  feelsLike: 25,
  humidity: 58,
  wind: 2.8,
  condition: "Hazy sun",
  icon: "partly-cloudy",
  uv: 7,
  pressure: 1011,
  visibility: 7.5,
  sunrise: "05:11",
  sunset: "18:53",
  rain: 22,
};

export const fallbackAir = {
  aqi: 154,
  category: "Unhealthy for Sensitive Groups",
  pm25: 68,
  pm10: 119,
  co: 0.8,
  no2: 34,
  o3: 42,
};

export const hourlyForecast = Array.from({ length: 12 }, (_, index) => {
  const hour = 7 + index;
  return {
    time: `${hour}:00`,
    temp: Math.round(20 + Math.sin(index / 2.2) * 4 + index * 0.25),
    aqi: Math.round(145 + Math.cos(index / 2) * 18 - index * 2.4),
    rain: Math.max(4, Math.round(18 + Math.sin(index / 1.7) * 12)),
    humidity: Math.round(62 + Math.sin(index / 2.8) * 10),
  };
});

export const weeklyForecast = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
].map((day, index) => ({
  day,
  aqi: Math.round(152 + Math.sin(index * 1.2) * 24),
  temp: Math.round(23 + Math.sin(index * 0.8) * 4),
  humidity: Math.round(55 + Math.cos(index * 0.9) * 14),
  rain: Math.round(18 + Math.sin(index) * 16),
}));

export const monthlyTemperature = Array.from({ length: 12 }, (_, index) => ({
  month: new Date(2026, index, 1).toLocaleString("en", { month: "short" }),
  temp: Math.round(
    14 + Math.sin(((index - 2) / 12) * Math.PI * 2) * 9 + index * 0.15,
  ),
  baseline: Math.round(13 + Math.sin(((index - 2) / 12) * Math.PI * 2) * 8),
}));

export const newsItems = [
  {
    title: "Kathmandu expands electric public transport pilots",
    source: "EcoPulse Desk",
    tag: "Mobility",
    summary:
      "New clean-mobility routes could reduce corridor-level particulate exposure during peak commuting hours.",
  },
  {
    title: "Community groups map dust hotspots near school zones",
    source: "Valley Climate Watch",
    tag: "Citizen science",
    summary:
      "Volunteer measurements show localized dust spikes around construction and unmanaged roadside soil.",
  },
  {
    title: "Tree canopy drives lower afternoon heat in older neighborhoods",
    source: "Urban Lab Nepal",
    tag: "Heat",
    summary:
      "Street shade and pocket parks are emerging as low-cost heat adaptation tools for dense wards.",
  },
];

export const challenges = [
  {
    id: "walk",
    title: "Walk instead of ride",
    points: 40,
    icon: "Footprints",
    impact: "Save around 0.9 kg CO2 on a short commute.",
  },
  {
    id: "tree",
    title: "Plant or care for a tree",
    points: 80,
    icon: "Sprout",
    impact: "Boosts shade, air filtration, and local cooling.",
  },
  {
    id: "recycle",
    title: "Recycle household waste",
    points: 55,
    icon: "Recycle",
    impact: "Keeps plastic and paper out of open burning streams.",
  },
  {
    id: "electricity",
    title: "Save electricity tonight",
    points: 35,
    icon: "Lightbulb",
    impact: "Reduces fossil backup demand during evening peaks.",
  },
];
