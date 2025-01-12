import ThemeSwitch from "@/app/feature/darkmode/ThemeSwitch";
import ResetButton from "@/app/feature/splitter/ResetButton";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-center">
      <h1 className="text-xl">Coding Drill</h1>
      <div className="ml-auto flex items-center justify-center">
        <ThemeSwitch />
        <ResetButton />
      </div>
    </header>
  );
}
