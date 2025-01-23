import Sidebar from "@/app/components/sidebar/Sidebar";
import "@/app/styles/globals.css";
import SplitHorizontal from "@/app/feature/splitter/Splitter";
import Footer from "@/app/components/footer/Footer";

const Main = () => {
  return (
    <>
      <main className="my-2 flex-grow overflow-hidden">
        <div className="flex h-full">
          <Sidebar />
          <SplitHorizontal />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Main;
