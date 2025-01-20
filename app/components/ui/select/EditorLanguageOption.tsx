import { useEffect, useState } from "react";
import menuData from "@/app/config/config.json";
import config from "@/app/config/config.json";
import { useAppContext } from "@/app/context/AppContext";

interface EditorLanguageOptionProps {
  currentLanguageValue: string | null;
  setSelectedFunc: (value: string) => void;
}

export const EditorLanguageOption: React.FC<EditorLanguageOptionProps> = ({
  currentLanguageValue,
  setSelectedFunc,
}) => {
  const {
    isApiLoading,
    currentEditorLanguage,
    setCurrentEditorLanguage,
    currentTheme,
  } = useAppContext();

  useEffect(() => {
    if (
      currentLanguageValue !== null &&
      currentLanguageValue !== currentEditorLanguage
    ) {
      setCurrentEditorLanguage(currentLanguageValue);
    }
  }, [currentEditorLanguage, currentLanguageValue]);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCurrentEditorLanguage(event.target.value);
    setSelectedFunc(event.target.value);
  };

  return (
    <>
      <label htmlFor="language-select" className="sr-only">
        language select
      </label>
      <select
        id="language-select"
        className="w-full cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700"
        // 初期選択がpythonにする
        value={currentLanguageValue ? currentLanguageValue : "python"}
        disabled={isApiLoading}
        onChange={handleLanguageChange}
        style={{
          backgroundImage: `url(${
            currentTheme === "dark"
              ? menuData.svgIcon.codeLight
              : menuData.svgIcon.codeDark
          })`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "calc(100% - 20px) center",
          appearance: "auto",
        }}
      >
        {Object.entries(config.menuLists.languages).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
};
