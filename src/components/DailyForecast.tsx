type DayForecast = {
  day: string;
  icon: string;
  maxTemp: string;
  minTemp: string;
};

const days: DayForecast[] = [
  { day: "Tue", icon: "🌧️", maxTemp: "20°", minTemp: "14°" },
  { day: "Wed", icon: "🌧️", maxTemp: "21°", minTemp: "15°" },
  { day: "Thu", icon: "☀️", maxTemp: "24°", minTemp: "14°" },
  { day: "Fri", icon: "⛅", maxTemp: "25°", minTemp: "13°" },
  { day: "Sat", icon: "⛈️", maxTemp: "21°", minTemp: "15°" },
  { day: "Sun", icon: "🌧️", maxTemp: "25°", minTemp: "16°" },
  { day: "Mon", icon: "🌫️", maxTemp: "24°", minTemp: "15°" },
];

export default function DailyForecast() {
  return (
    <div className="grid grid-cols-7 gap-4 mt-10">
      {days.map((items,index) => (
        <div
          key={index}
          className="bg-panel rounded-xl p-4 text-center"
        >
          <p className="text-sm">{items.day}</p>
          <p className="text-2xl my-2">{items.icon}</p>
          <p className="text-sm">
            {items.maxTemp} <span className="text-muted">{items.minTemp}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
