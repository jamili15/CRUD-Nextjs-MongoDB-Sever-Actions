"use client";

import React, { useContext, useState, createContext } from "react";

interface ContextType {
  editPost: any;
  setEditPost: React.Dispatch<React.SetStateAction<any>>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const useMyContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a Provider");
  }
  return context;
};

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [editPost, setEditPost] = useState<any>(null);
  const value = { editPost, setEditPost };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
