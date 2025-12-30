import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDown, Sun, Cloud, CloudSun, CloudDrizzle, CloudSnow, CloudLightning, CloudFog } from "lucide-react";
import { MoonLoader } from "react-spinners";
import type { ReactNode } from "react";
import { useUnits } from "../context/UnitsContext";

type Hour = {
  time: string;
  icon: ReactNode;
  temperature: number;
};

type HourlyForecastProps = {
  location: { lat: number; lon: number; cityName: string };
};

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getWeatherIcon(code: number): ReactElement {
  const size = 24;
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

export default function HourlyForecast({ location }: HourlyForecastProps) {
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);
  const [hours, setHours] = useState<Hour[]>([]);
  const { units } = useUnits();

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&hourly=temperature_2m,weathercode&timezone=Asia/Tbilisi`
        );
        const data = await res.json();

        const hourlyData: Hour[] = data.hourly.time.map((timestamp: string, i: number) => {
          const date = new Date(timestamp);
          const dayName = daysOfWeek[date.getDay()];
          if (dayName !== selectedDay) return null;
          return {
            time: date.getHours() + ":00",
            temperature: Math.round(data.hourly.temperature_2m[i]),
            icon: getWeatherIcon(data.hourly.weathercode[i]),
          };
        }).filter(Boolean) as Hour[];

        setHours(hourlyData);
      } catch (error) {
        console.error("Failed to fetch hourly weather:", error);
      }
    }

    fetchWeather();
  }, [location.lat, location.lon, selectedDay]);

  const convertTemp = (temp: number) => 
    units.temperature === "c" ? temp : Math.round(temp * 1.8 + 32);

  return (
    <div className="bg-panel rounded-xl2 p-6">
      <div className="flex justify-between mb-4">
        <p className="font-semibold">Hourly forecast</p>

        <Listbox value={selectedDay} onChange={setSelectedDay}>
          <div className="relative w-36">
            <Listbox.Button className="flex justify-between bg-panelSoft text-sm text-muted px-3 py-2 rounded-lg w-full text-left">
              {selectedDay}
              <ChevronDown />
            </Listbox.Button>

            <Listbox.Options className="absolute mt-1 w-full bg-panel rounded-lg shadow-lg z-10">
              {daysOfWeek.map((day) => (
                <Listbox.Option
                  key={day}
                  value={day}
                  className={({ active }) =>
                    `cursor-pointer select-none px-3 py-2 ${
                      active ? "bg-cardBlue text-white" : "text-muted"
                    }`
                  }
                >
                  {day}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      <div className="flex flex-col space-y-4 overflow-y-auto h-80 pr-2 scrollbar-thin scrollbar-thumb-panelSoft scrollbar-track-panel">
        {hours.length === 0 && <MoonLoader color="#0e0c03" size={80} />}
        {hours.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-panelSoft rounded-xl p-4"
          >
            <div className="flex gap-x-2 items-center">
              <span>{item.time}</span>
              <span>{item.icon}</span>
            </div>
            <span>{convertTemp(item.temperature)}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}
