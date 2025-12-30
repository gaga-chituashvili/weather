import type { ReactElement } from "react";
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
import { MoonLoader } from "react-spinners";
import { useUnits } from "../context/UnitsContext";

type CurrentWeather = {
  temperature: number;
  weathercode: number;
  time: string;
  latitude: number;
  longitude: number;
};

type MainCardProps = {
  location: { lat: number; lon: number; cityName: string };
};

function getWeatherIcon(code: number): ReactElement {
  const size = 64;
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

export default function MainCard({ location }: MainCardProps) {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const { units } = useUnits(); 

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true&timezone=Asia/Tbilisi`
        );
        const data = await res.json();
        setCurrentWeather({
          ...data.current_weather,
          latitude: location.lat,
          longitude: location.lon,
        });
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    }

    fetchWeather();
  }, [location.lat, location.lon]);

  if (!currentWeather) return <MoonLoader color="#0e0c03" size={80} />;

  const temperature =
    units.temperature === "c"
      ? Math.round(currentWeather.temperature)
      : Math.round(currentWeather.temperature * 1.8 + 32);

  const weatherIcon = getWeatherIcon(currentWeather.weathercode);
  const date = new Date(currentWeather.time).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-cardBlue to-cardBlueDark rounded-xl2 p-8">
      <div className="flex flex-col gap-y-1">
        <span className="text-sm opacity-80">{location.cityName}</span>
        <span className="text-xs opacity-60 mb-8">{date}</span>
      </div>

      <div className="flex items-center gap-x-2">
        <div>{weatherIcon}</div>
        <span className="text-7xl font-bold">{temperature}°</span>
      </div>
    </div>
  );
}
