"use client";

import { PanelProvider } from "./feature/splitter/PanelContext";
import { SelectedDataProvider } from "./context/AppContext";
import { LocalStorageProvider } from "./feature/localStorage/localStorageContext";
import Header from "./components/ui/header/Header";
import Main from "./components/Main";

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
