import logo from "../assets/logo.svg";
import { Listbox } from "@headlessui/react";
import { ChevronDown, Settings, Check } from "lucide-react";
import { useUnits } from "../context/UnitsContext";

export default function TopBar() {
  const { units, setUnits } = useUnits();

  const temperatureOptions: ("c" | "f")[] = ["c", "f"];
  const windOptions: ("kmh" | "mph")[] = ["kmh", "mph"];
  const precipitationOptions: ("mm" | "in")[] = ["mm", "in"];


  function refreshPage() {
  window.location.reload();
}

  return (
    <header className="flex justify-between items-center">
     <img
     src={logo}
     className="cursor-pointer"
     alt="logo"
     onClick={refreshPage}
     />

      <Listbox value={units.temperature} onChange={() => {}}>
        <div className="relative">
          <Listbox.Button className="bg-panel px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Settings size={16} />
            Units
            <ChevronDown size={16} />
          </Listbox.Button>

          <Listbox.Options className="absolute right-0 mt-2 w-64 rounded-xl bg-panel p-3 shadow-lg text-sm space-y-3 z-50">
            
            <div>
              <p className="text-xs opacity-60 mb-1">Temperature</p>
              {temperatureOptions.map((t) => (
                <div
                  key={t}
                  onClick={() => setUnits((u) => ({ ...u, temperature: t }))}
                  className="flex justify-between px-2 py-1 rounded-md cursor-pointer hover:bg-white/5"
                >
                  {t === "c" ? "Celsius (°C)" : "Fahrenheit (°F)"}
                  {units.temperature === t && <Check size={14} />}
                </div>
              ))}
            </div>

            
            <div>
              <p className="text-xs opacity-60 mb-1">Wind Speed</p>
              {windOptions.map((w) => (
                <div
                  key={w}
                  onClick={() => setUnits((u) => ({ ...u, wind: w }))}
                  className="flex justify-between px-2 py-1 rounded-md cursor-pointer hover:bg-white/5"
                >
                  {w === "kmh" ? "km/h" : "mph"}
                  {units.wind === w && <Check size={14} />}
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs opacity-60 mb-1">Precipitation</p>
              {precipitationOptions.map((p) => (
                <div
                  key={p}
                  onClick={() => setUnits((u) => ({ ...u, precipitation: p }))}
                  className="flex justify-between px-2 py-1 rounded-md cursor-pointer hover:bg-white/5"
                >
                  {p === "mm" ? "Millimeters (mm)" : "Inches (in)"}
                  {units.precipitation === p && <Check size={14} />}
                </div>
              ))}
            </div>

          </Listbox.Options>
        </div>
      </Listbox>
    </header>
  );
}
