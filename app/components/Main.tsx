import Sidebar from "./Sidebar";

export default function Main() {
  return (
    <main className="my-2 flex-grow overflow-hidden">
      <div className="flex h-full">
        <Sidebar />
      </div>
    </main>
  );
}
