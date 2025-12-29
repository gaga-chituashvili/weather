import { useEffect, useState } from "react";
import {
  Sun,
  Cloud,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudSun,
} from "lucide-react";

type DayForecast = {
  day: string;
  icon: JSX.Element;
  maxTemp: string;
  minTemp: string;
};

function getWeatherIcon(code: number): JSX.Element {
  const size = 32;
  if (code === 0) return <Sun size={size} className="text-yellow-400" />;
  if (code === 1 || code === 2) return <CloudSun size={size} className="text-yellow-300" />;
  if (code === 3) return <Cloud size={size} className="text-gray-400" />;
  if (code >= 45 && code <= 48) return <CloudFog size={size} className="text-gray-500" />;
  if (code >= 51 && code <= 67) return <CloudDrizzle size={size} className="text-blue-400" />;
  if (code >= 71 && code <= 77) return <CloudSnow size={size} className="text-blue-200" />;
  if (code >= 80 && code <= 82) return <CloudDrizzle size={size} className="text-blue-400" />;
  if (code >= 95) return <CloudLightning size={size} className="text-orange-400" />;
  return <Cloud size={size} className="text-gray-400" />;
}

export default function DailyForecast() {
  const [days, setDays] = useState<DayForecast[]>([]);

  useEffect(() => {
    async function fetchWeather() {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=41.7151&longitude=44.8271&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=Asia/Tbilisi"
      );
      const data = await res.json();

      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const forecast: DayForecast[] = data.daily.time.map(
        (date: string, index: number) => ({
          day: weekdays[new Date(date).getDay()],
          icon: getWeatherIcon(data.daily.weathercode[index]),
          maxTemp: Math.round(data.daily.temperature_2m_max[index]) + "°",
          minTemp: Math.round(data.daily.temperature_2m_min[index]) + "°",
        })
      );

      setDays(forecast);
    }

    fetchWeather();
  }, []);

  if (!days.length) return <p>Loading daily forecast...</p>;

  return (
    <div className="grid grid-cols-7 gap-4 mt-10">
      {days.map((item, i) => (
        <div key={i} className="bg-panel rounded-xl p-4 text-center">
          <p className="text-sm font-medium">{item.day}</p>
          <div className="my-2">{item.icon}</div>
          <p className="text-sm">
            {item.maxTemp} <span className="text-muted">{item.minTemp}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
