import { useAppContext } from "@/app/context/AppContext";
import menuData from "@/app/config/config.json";

const FontSizeSelect: React.FC = () => {
  const { isApiLoading, editorFontSize, setEditorFontSize, currentTheme } =
    useAppContext();

  // フォントサイズの値を動的に取得
  const handleFontSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setEditorFontSize(event.target.value);
  };

  return (
    <>
      <label htmlFor="fontsize-select" className="sr-only">
        fontsize select
      </label>
      <select
        id="fontsize-select"
        className="w-full cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700"
        value={editorFontSize}
        disabled={isApiLoading}
        onChange={handleFontSizeChange}
        style={{
          backgroundImage: `url(${
            currentTheme === "dark"
              ? menuData.svgIcon.textSizeLight
              : menuData.svgIcon.textSizeDark
          })`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "calc(100% - 20px) center",
          appearance: "auto",
        }}
      >
        {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </>
  );
};

export default FontSizeSelect;
