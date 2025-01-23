import Sidebar from "@/app/components/layout/sidebar/Sidebar";
import "@/app/styles/globals.css";
import SplitHorizontal from "@/app/feature/splitter/Splitter";
import Footer from "@/app/components/ui/footer/Footer";

export default function Main() {
  return (
    <>
      <main className="my-2 flex-grow overflow-hidden">
        <div className="flex h-full">
          <Sidebar />
          <SplitHorizontal />
        </div>
        <footer className="text-3xl">test</footer>
      </main>
      <Footer />
    </>
  );
}
