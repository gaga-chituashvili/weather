type WeatherStat = {
  label: string;
  value: string;
};

const stats: WeatherStat[] = [
  { label: "Feels Like", value: "18°" },
  { label: "Humidity", value: "46%" },
  { label: "Wind", value: "14 km/h" },
  { label: "Precipitation", value: "0 mm" },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-4 gap-4 mt-10">
      {stats.map((items,index) => (
        <div
          key={index}
          className="bg-panelSoft rounded-xl p-4"
        >
          <p className="text-xs text-muted">{items.label}</p>
          <p className="text-lg font-semibold mt-1">{items.value}</p>
        </div>
      ))}
    </div>
  );
}
