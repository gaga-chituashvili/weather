export default function SearchBar() {
  return (
    <div className="flex justify-center mt-10">
      <div className="flex bg-panel rounded-xl overflow-hidden w-[460px]">
        <input
          placeholder="Search for a place..."
          className="bg-transparent flex-1 px-5 py-3 text-sm outline-none text-muted"
        />
        <button className="bg-button px-7 text-sm font-medium">
          Search
        </button>
      </div>
    </div>
  );
}
