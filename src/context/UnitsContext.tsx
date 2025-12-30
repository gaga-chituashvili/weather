import { createContext, useContext, useState } from "react";

type Units = {
  temperature: "c" | "f";
  wind: "kmh" | "mph";
  precipitation: "mm" | "in";
};

type UnitsContextType = {
  units: Units;
  setUnits: React.Dispatch<React.SetStateAction<Units>>;
};

const UnitsContext = createContext<UnitsContextType | null>(null);

export function UnitsProvider({ children }: { children: React.ReactNode }) {
  const [units, setUnits] = useState<Units>({
    temperature: "c",
    wind: "kmh",
    precipitation: "mm",
  });

  return (
    <UnitsContext.Provider value={{ units, setUnits }}>
      {children}
    </UnitsContext.Provider>
  );
}

export function useUnits() {
  const ctx = useContext(UnitsContext);
  if (!ctx) throw new Error("useUnits must be used inside UnitsProvider");
  return ctx;
}
