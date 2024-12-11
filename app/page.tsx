"use client";

import Body from "./components/Body";
import { PanelProvider } from "./feature/splitter/PanelContext";
import { SelectedDataProvider } from "./feature/localStorage/AppContext";
import { LocalStorageProvider } from "./feature/localStorage/localStorageContext";

export default function Page() {
  return (
    <LocalStorageProvider>
      <SelectedDataProvider>
        <PanelProvider>
          <Body />
        </PanelProvider>
      </SelectedDataProvider>
    </LocalStorageProvider>
  );
}
