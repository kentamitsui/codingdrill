import Sidebar from "@/app/components/layout/sidebar/Sidebar";
import "@/app/styles/globals.css";
import Split_Horizontal from "@/app/feature/splitter/Splitter";
import Footer from "@/app/components/ui/footer/Footer";

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
      <Footer />
    </>
  );
}
