"use client";
import { IUser } from "@/server/cluster/schema.interfaces";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface InfoType {
  ip: string;
  continent_name: string;
  city: string;
  emoji_flag: string;
}

interface userData extends Omit<IUser, "password" | "_id"> {}

interface AccessContextType {
  accessData: InfoType | null;
  setAccessData: (data: InfoType) => void;
  user: userData | null;
  setUser: (data: userData) => void;
}

const ProviderContext = createContext<AccessContextType | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessData, setAccessData] = useState<InfoType | null>(null);
  const [user, setUser] = useState<userData | null>(null);
  return (
    <ProviderContext.Provider
      value={{ accessData, setAccessData, user, setUser }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

export default AppProvider;
export const useProvider = (): AccessContextType => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error("useProvider must be used within an AppProvider");
  }
  return context;
};
