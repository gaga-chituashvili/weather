import logo from "../assets/logo.svg";
import { Listbox } from "@headlessui/react";
import { ChevronDown, Settings, Check } from "lucide-react";
import { useState } from "react";

const units = {
  temperature: ["Celsius (°C)", "Fahrenheit (°F)"],
  wind: ["km/h", "mph"],
  precipitation: ["Millimeters (mm)", "Inches (in)"],
};

export default function TopBar() {
  const [temperature, setTemperature] = useState(units.temperature[0]);
  const [wind, setWind] = useState(units.wind[0]);
  const [precipitation, setPrecipitation] = useState(units.precipitation[0]);

  return (
    <header className="flex justify-between items-center">
      <img src={logo} className="cursor-pointer" />

      <Listbox value={temperature} onChange={setTemperature}>
        <div className="relative">
         
          <Listbox.Button className="bg-panel px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Settings size={16} />
            Units
            <ChevronDown size={16} />
          </Listbox.Button>

          
          <Listbox.Options className="absolute right-0 mt-2 w-64 rounded-xl bg-panel p-3 shadow-lg text-sm space-y-3 z-50">
            
            <div>
              <p className="text-xs opacity-60 mb-1">Temperature</p>
              {units.temperature.map((item) => (
                <Listbox.Option
                  key={item}
                  value={item}
                  className="flex justify-between items-center cursor-pointer rounded-md px-2 py-1 hover:bg-white/5"
                  onClick={() => setTemperature(item)}
                >
                  {item}
                  {temperature === item && <Check size={14} />}
                </Listbox.Option>
              ))}
            </div>

            
            <div>
              <p className="text-xs opacity-60 mb-1">Wind Speed</p>
              {units.wind.map((item) => (
                <div
                  key={item}
                  onClick={() => setWind(item)}
                  className="flex justify-between items-center cursor-pointer rounded-md px-2 py-1 hover:bg-white/5"
                >
                  {item}
                  {wind === item && <Check size={14} />}
                </div>
              ))}
            </div>

            
            <div>
              <p className="text-xs opacity-60 mb-1">Precipitation</p>
              {units.precipitation.map((item) => (
                <div
                  key={item}
                  onClick={() => setPrecipitation(item)}
                  className="flex justify-between items-center cursor-pointer rounded-md px-2 py-1 hover:bg-white/5"
                >
                  {item}
                  {precipitation === item && <Check size={14} />}
                </div>
              ))}
            </div>

          </Listbox.Options>
        </div>
      </Listbox>
    </header>
  );
}
