"use client";

import { PanelProvider } from "@/app/feature/splitter/context/PanelContext";
import { SelectedDataProvider } from "@/app/context/AppContext";
import { LocalStorageProvider } from "@/app/feature/storage/context/StorageContext";
import Header from "@/app/components/ui/header/Header";
import Main from "@/app/components/main/Main";

export default function Page() {
  return (
    <SelectedDataProvider>
      <LocalStorageProvider>
        <PanelProvider>
          <Header />
          <Main />
        </PanelProvider>
      </LocalStorageProvider>
    </SelectedDataProvider>
  );
}
