import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import MainCard from "./MainCard";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import StatsGrid from "./StatsGrid";

export default function Weather() {
  return (
    <div className="min-h-screen bg-bg text-white px-16 py-10">
      <TopBar />

      <h1 className="text-4xl font-bold text-center mt-14">
        How's the sky looking today?
      </h1>

      <SearchBar />

      <div className="grid grid-cols-[2fr_1fr] gap-8 mt-14">
        <div>
        <MainCard />
        <StatsGrid />
        </div>
        <HourlyForecast />
      </div>

      <DailyForecast />
    </div>
  );
}