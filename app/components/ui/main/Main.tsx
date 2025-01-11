import Sidebar from "../../layout/sidebar/Sidebar";
import "../../../styles/globals.css";
import Split_Horizontal from "../../../feature/splitter/Splitter";

export default function Main() {
  return (
    <main className="my-2 flex-grow overflow-hidden">
      <div className="flex h-full">
        <Sidebar />
        <Split_Horizontal />
      </div>
    </main>
  );
}
