"use client";

import Body from "./components/Body";
import { PanelProvider } from "./feature/splitter/PanelContext";
import { SelectedDataProvider } from "./components/AppContext";
import { LocalStorageProvider } from "./feature/localStorage/localStorageContext";

export default function Page() {
  return (
    <SelectedDataProvider>
      <LocalStorageProvider>
        <PanelProvider>
          <Body />
        </PanelProvider>
      </LocalStorageProvider>
    </SelectedDataProvider>
  );
}
