import ThemeToggle from "@/app/feature/darkmode/ThemeToggle";
import ResetButton from "@/app/feature/splitter/components/ResetButton";
import menuData from "@/app/config/config.json";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-center">
      <h1 className="text-xl">Coding Drill</h1>
      <div className="ml-auto flex items-center justify-center">
        <ThemeToggle />
        <ResetButton
          lightSvgSrc={menuData.svgIcon.resetLight}
          darkSvgSrc={menuData.svgIcon.resetDark}
          altText="restore layout"
        />
      </div>
    </header>
  );
};

export default Header;
