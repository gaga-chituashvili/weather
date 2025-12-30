import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import {
  Sun,
  Cloud,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudSun,
} from "lucide-react";
import { MoonLoader } from "react-spinners";
import { useUnits } from "../context/UnitsContext";

type DayForecast = {
  day: string;
  icon: ReactElement;
  maxTemp: number;
  minTemp: number;
};

type DailyForecastProps = {
  location: { lat: number; lon: number; cityName: string };
};

function getWeatherIcon(code: number): ReactElement {
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

export default function DailyForecast({ location }: DailyForecastProps) {
  const [days, setDays] = useState<DayForecast[]>([]);
  const { units } = useUnits();

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Asia/Tbilisi`
        );
        const data = await res.json();

        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const forecast: DayForecast[] = data.daily.time.map((date: string, index: number) => ({
          day: weekdays[new Date(date).getDay()],
          icon: getWeatherIcon(data.daily.weathercode[index]),
          maxTemp: Math.round(data.daily.temperature_2m_max[index]),
          minTemp: Math.round(data.daily.temperature_2m_min[index]),
        }));

        setDays(forecast);
      } catch (error) {
        console.error("Failed to fetch daily weather:", error);
      }
    }

    fetchWeather();
  }, [location.lat, location.lon]);

  if (!days.length) return <MoonLoader color="#0e0c03" size={80} />;

  const convertTemp = (temp: number) =>
    units.temperature === "c" ? temp : Math.round(temp * 1.8 + 32);

  return (
    <div className="grid grid-cols-7 gap-4 mt-10">
      {days.map((item, i) => (
        <div key={i} className="bg-panel rounded-xl p-4 text-center">
          <p className="text-sm font-medium">{item.day}</p>
          <div className="my-2">{item.icon}</div>
          <p className="text-sm">
            {convertTemp(item.maxTemp)}°{" "}
            <span className="text-muted">{convertTemp(item.minTemp)}°</span>
          </p>
        </div>
      ))}
    </div>
  );
}
