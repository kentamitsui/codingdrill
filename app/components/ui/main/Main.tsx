import Sidebar from "@/app/components/layout/sidebar/Sidebar";
import "@/app/styles/globals.css";
import Split_Horizontal from "@/app/feature/splitter/Splitter";

export default function Main() {
  return (
    <>
      <main className="my-2 flex-grow overflow-hidden">
        <div className="flex h-full">
          <Sidebar />
          <Split_Horizontal />
        </div>
        <footer className="text-3xl">test</footer>
      </main>
      <footer className="bg:opacity-0 text-center text-[12px]">
        © 2025 CodingDrill. All rights reserved.
      </footer>
    </>
  );
}
