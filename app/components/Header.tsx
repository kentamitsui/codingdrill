import ThemeSwitch from "../feature/darkmode/ThemeSwitch";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-center">
      <h1 className="text-xl">coding test preparation app</h1>
      <div className="ml-auto flex items-center justify-center">
        <ThemeSwitch />
        <button
          id="resetLayout"
          className="w-[120px] rounded-md bg-gray-400 p-1 font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
        >
          reset layout
        </button>
      </div>
    </header>
  );
}
