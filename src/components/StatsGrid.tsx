import { useEffect, useState } from "react";

type WeatherStat = {
  label: string;
  value: string;
};

export default function StatsGrid() {
  const [stats, setStats] = useState<WeatherStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=41.7151&longitude=44.8271&current_weather=true&hourly=relativehumidity_2m,windspeed_10m&timezone=Asia/Tbilisi"
        );
        const data = await res.json();

        const current = data.current_weather;
        const hourIndex = 0;
        
        const hourlyHumidity = data.hourly.relativehumidity_2m[hourIndex] + "%";
        const hourlyWind = data.hourly.windspeed_10m[hourIndex] + " km/h";

        const dynamicStats: WeatherStat[] = [
          { label: "Feels Like", value: Math.round(current.temperature) + "°" },
          { label: "Humidity", value: hourlyHumidity },
          { label: "Wind", value: hourlyWind },
          { label: "Precipitation", value: "0 mm" },
        ];

        setStats(dynamicStats);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch weather stats:", error);
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) return <p className="text-muted mt-4">Loading stats...</p>;

  return (
    <div className="grid grid-cols-4 gap-4 mt-10">
      {stats.map((item, index) => (
        <div key={index} className="bg-panelSoft rounded-xl p-4">
          <p className="text-xs text-muted">{item.label}</p>
          <p className="text-lg font-semibold mt-1">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
