"use client";

import Body from "./components/Body";
import { PanelProvider } from "./feature/splitter/PanelContext";
import { SelectedDataProvider } from "./feature/localStorage/AppContext";

export default function Page() {
  return (
    <SelectedDataProvider>
      <PanelProvider>
        <Body />
      </PanelProvider>
    </SelectedDataProvider>
  );
}
