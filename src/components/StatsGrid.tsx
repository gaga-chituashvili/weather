import { useEffect, useState } from "react";
import { useUnits } from "../context/UnitsContext";

type WeatherStat = {
  label: string;
  value: string;
};

type StatsGridProps = {
  location: { lat: number; lon: number; cityName: string };
};

export default function StatsGrid({ location }: StatsGridProps) {
  const { units } = useUnits(); 
  const [stats, setStats] = useState<WeatherStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true&hourly=relativehumidity_2m,windspeed_10m,precipitation&timezone=Asia/Tbilisi`
        );
        const data = await res.json();

        const current = data.current_weather;
        const hourIndex = 0;

        
        const humidity = data.hourly.relativehumidity_2m[hourIndex] + "%";

        
        const wind =
          units.wind === "kmh"
            ? data.hourly.windspeed_10m[hourIndex] + " km/h"
            : Math.round(data.hourly.windspeed_10m[hourIndex] / 1.609) + " mph";

        
        const precipitation = data.hourly.precipitation
          ? data.hourly.precipitation[hourIndex] + " mm"
          : "0 mm";

        
        const feelsLike =
          units.temperature === "c"
            ? Math.round(current.temperature) + "°"
            : Math.round(current.temperature * 1.8 + 32) + "°";

        const dynamicStats: WeatherStat[] = [
          { label: "Feels Like", value: feelsLike },
          { label: "Humidity", value: humidity },
          { label: "Wind", value: wind },
          { label: "Precipitation", value: precipitation },
        ];

        setStats(dynamicStats);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch weather stats:", error);
        setLoading(false);
      }
    }

    fetchStats();
  }, [location.lat, location.lon, units.wind, units.temperature]);

  if (loading) return <p className="text-muted mt-4">Loading stats...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 md:mt-10">
      {stats.map((item, index) => (
        <div key={index} className="bg-panelSoft rounded-xl p-4">
          <p className="text-xs text-muted">{item.label}</p>
          <p className="text-lg font-semibold mt-1">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
