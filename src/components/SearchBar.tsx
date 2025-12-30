import { useState } from "react";

type SearchBarProps = {
  onSearch: (lat: number, lon: number, cityName: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (data.length === 0) {
        alert("City not found");
        return;
      }

      const { lat, lon, display_name } = data[0];
      onSearch(parseFloat(lat), parseFloat(lon), display_name);
    } catch (error) {
      console.error("Failed to search city:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="flex bg-panel rounded-xl overflow-hidden w-96">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a place..."
          className="bg-transparent flex-1 px-5 py-3 text-sm outline-none text-muted"
        />
        <button
          onClick={handleSearch}
          className="bg-button px-7 text-sm font-medium"
        >
          Search
        </button>
      </div>
    </div>
  );
}
