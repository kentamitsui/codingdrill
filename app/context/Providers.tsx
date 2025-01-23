"use client";
import { ReactNode } from "react";
import { PanelProvider } from "@/app/feature/splitter/context/PanelContext";
import { SelectedDataProvider } from "@/app/context/AppContext";
import { LocalStorageProvider } from "@/app/feature/storage/context/StorageContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SelectedDataProvider>
      <LocalStorageProvider>
        <PanelProvider>{children}</PanelProvider>
      </LocalStorageProvider>
    </SelectedDataProvider>
  );
}
