export default function MainCard() {
  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-cardBlue to-cardBlueDark rounded-xl2 p-8">
      <div className="flex flex-col gap-y-1">
        <span className="text-sm opacity-80">Berlin, Germany</span>
        <span className="text-xs opacity-60 mb-8">
        Tuesday, Aug 5, 2025
      </span>
      </div>

      <div className="flex items-center gap-x-2">
        <span className="text-5xl">☀️</span>
        <span className="text-7xl font-bold">20°</span>
      </div>
    </div>
  );
}
