"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ContextType = {
  name: string;
  color: string;
  setName: (name: string) => void;
  setColor: (color: string) => void;
};

const defaultContextValue: ContextType = {
  name: "James",
  color: "#0EA5E9",
  setName: () => {},
  setColor: () => {},
};

const AppContext = createContext<ContextType>(defaultContextValue);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [name, setName] = useState<string>(defaultContextValue.name);
  const [color, setColor] = useState<string>(defaultContextValue.color);

  return (
    <AppContext.Provider value={{ name, color, setName, setColor }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
