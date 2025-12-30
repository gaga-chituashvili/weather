import { useState } from "react";
import { UnitsProvider } from "../context/UnitsContext";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import MainCard from "./MainCard";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import StatsGrid from "./StatsGrid";

export default function Weather() {
  const [location, setLocation] = useState({
    lat: 41.7151,
    lon: 44.8271,
    cityName: "Tbilisi, Georgia",
  });

  const handleSearch = (lat: number, lon: number, cityName: string) => {
    setLocation({ lat, lon, cityName });
  };

  return (
    <UnitsProvider>
      <div className="min-h-screen bg-bg text-white md:px-16 md:py-10 px-2 py-2">
        <TopBar />

        <h2 className="text-xl md:text-4xl font-bold text-center mt-14">
          How's the sky looking today?
        </h2>

        <SearchBar onSearch={handleSearch} />

        <div className="grid grid-cols-[2fr_1fr] gap-8 mt-14">
          <div>
            <MainCard location={location} />
            <StatsGrid location={location} />
          </div>
          <HourlyForecast location={location} />
        </div>

        <DailyForecast location={location} />
      </div>
    </UnitsProvider>
  );
}
