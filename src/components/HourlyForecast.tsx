import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from 'lucide-react';

type Hour = {
  time: string;
  icon: string;
  temperature: string;
};

const hours: Hour[] = [
  { time: "3 PM", icon: "☁️", temperature: "20°" },
  { time: "4 PM", icon: "☁️", temperature: "20°" },
  { time: "5 PM", icon: "☀️", temperature: "20°" },
  { time: "6 PM", icon: "☁️", temperature: "19°" },
  { time: "7 PM", icon: "☁️", temperature: "18°" },
  { time: "8 PM", icon: "🌫️", temperature: "18°" },
  { time: "9 PM", icon: "☁️", temperature: "17°" },
  { time: "10 PM", icon: "☁️", temperature: "17°" },
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function HourlyForecast() {
  const [selectedDay, setSelectedDay] = useState(days[2]);

  return (
    <div className="bg-panel rounded-xl2 p-6">
      <div className="flex justify-between mb-4">
        <p className="font-semibold">Hourly forecast</p>

        <Listbox value={selectedDay} onChange={setSelectedDay}>
          <div className="relative w-36">
            <Listbox.Button className="flex justify-between bg-panelSoft text-sm text-muted px-3 py-2 rounded-lg w-full text-left">
              {selectedDay}
              <ChevronDown/>
            </Listbox.Button>

            <Listbox.Options className="absolute mt-1 w-full bg-panel rounded-lg shadow-lg z-10">
              {days.map((day) => (
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

      <div className="space-y-3 text-sm">
        {hours.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-panelSoft px-4 py-2 rounded-lg"
          >
            <div className="flex gap-x-1">
              <span>{item.time}</span>
              <span>{item.icon}</span>
            </div>
            <span>{item.temperature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
