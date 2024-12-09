import Body from "./components/Body";
import { PanelProvider } from "./feature/splitter/PanelContext";

export default function Page() {
  return (
    <PanelProvider>
      <Body />
    </PanelProvider>
  );
}
