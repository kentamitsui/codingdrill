"use client";

import { PanelProvider } from "@/app/feature/splitter/PanelContext";
import { SelectedDataProvider } from "@/app/context/AppContext";
import { LocalStorageProvider } from "@/app/feature/localStorage/context/localStorageContext";
import Header from "@/app/components/ui/header/Header";
import Main from "@/app/components/ui/main/Main";

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
