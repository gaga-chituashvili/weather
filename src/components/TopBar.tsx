export default function TopBar() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 font-semibold">
        ☀️ Weather Now
      </div>
      <button className="bg-panel px-4 py-2 rounded-lg text-sm">
        Units
      </button>
    </div>
  );
}
