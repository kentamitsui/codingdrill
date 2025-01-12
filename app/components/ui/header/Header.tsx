import ThemeSwitch from "@/app/feature/darkmode/ThemeSwitch";
import ResetButton from "@/app/feature/splitter/components/ui/ResetButton";
import menuData from "@/app/config/config.json";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-center">
      <h1 className="text-xl">Coding Drill</h1>
      <div className="ml-auto flex items-center justify-center">
        <ThemeSwitch />
        <ResetButton
          lightSvgSrc={menuData.svgIcon.resetLight}
          darkSvgSrc={menuData.svgIcon.resetDark}
          altText="restore layout"
        />
      </div>
    </header>
  );
}
