import React from "react";
import ThemeToggle from "@/app/feature/darkmode/ThemeToggle";
import RestoreButton from "@/app/feature/splitter/components/RestoreButton";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-center">
      <h1 className="text-xl">Coding Drill</h1>
      <div className="ml-auto flex items-center justify-center">
        <ThemeToggle />
        <RestoreButton />
      </div>
    </header>
  );
};

export default Header;
