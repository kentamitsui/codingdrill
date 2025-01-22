import { useAppContext } from "@/app/context/AppContext";
import menuData from "@/app/config/config.json";

export const EditorThemeOption: React.FC = ({}) => {
  const { isApiLoading, editorTheme, setEditorTheme, currentTheme } =
    useAppContext();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditorTheme(event.target.value);
  };

  return (
    <>
      <label htmlFor="theme-select" className="sr-only">
        theme select
      </label>
      <select
        id="theme-select"
        className="w-full cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700"
        value={editorTheme}
        disabled={isApiLoading}
        onChange={handleThemeChange}
        style={{
          backgroundImage: `url(${
            currentTheme === "dark"
              ? menuData.svgIcon.editorColorLight
              : menuData.svgIcon.editorColorDark
          })`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "calc(100% - 20px) center",
          appearance: "auto",
        }}
      >
        <option value="vs">vs</option>
        <option value="vs-dark">vs-dark</option>
        <option value="hc-light">hc-light</option>
        <option value="hc-black">hc-black</option>
      </select>
    </>
  );
};
