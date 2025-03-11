"use client";

import { createContext, useContext, useState } from "react";

export const appContext = createContext({
  sessionToken: "",
  setSessionToken: (token: string) => {},
});

export const AppProvider = ({
  children,
  initSessionToken = "",
}: {
  children: React.ReactNode;
  initSessionToken?: string;
}) => {
  const [sessionToken, setSessionToken] = useState(initSessionToken);
  return (
    <appContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(appContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
