"use client";

import React, { createContext, useContext, useState } from "react";

type PanelContextType = {
  resetPanelSizes: () => void;
};

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export const PanelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialSizes = [50, 50];

  const [splitPanelSizes, setSplitPanelSizes] = useState(initialSizes);

  const resetPanelSizes = () => {
    setSplitPanelSizes(initialSizes);
  };

  return (
    <PanelContext.Provider value={{ resetPanelSizes }}>
      {children}
    </PanelContext.Provider>
  );
};

export const usePanelContext = () => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error("usePanelContext must be used within a PanelProvider");
  }
  return context;
};
