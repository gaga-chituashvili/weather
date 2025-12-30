import logo from "../assets/logo.svg"

export default function TopBar() {
  return (
    <header className="flex justify-between items-center">
      <img src={logo} className="flex items-center gap-2 cursor-pointer"/>
      <button className="bg-panel px-4 py-2 rounded-lg text-sm">
        Units
      </button>
    </header>
  );
}
