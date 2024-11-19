import MonacoEditor from "../feature/monacoEditor/MonacoEditor";
import config from "../config/config.json";
import { useState } from "react";

export default function InputSection() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <section
      id="split-horizontal-right"
      className="flex flex-grow flex-col overflow-hidden"
      style={{ height: "100%" }} // 親要素が高さを管理
    >
      <div className="flex flex-row justify-between rounded-t-md border-b-2 border-gray-50 bg-gray-200 text-[1rem] font-bold dark:border-[#1e1e1e] dark:bg-[#0d1117]">
        <div
          id="codeInputArea-title"
          className="rounded-tl-md p-[4px_4px_4px_30px] text-[1rem]"
        >
          Code
        </div>
        <select
          id="language-select"
          className="ml-auto mr-[2px] w-[100px] cursor-pointer border-gray-50 bg-gray-400 p-1 text-center text-[12px] duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          {Object.entries(config.menuLists.languages).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <button
          id="button-Copy-CodeInputArea"
          className="mr-[2px] w-[100px] border-gray-50 bg-gray-400 p-1 text-center text-[10px] duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500"
        >
          copy
        </button>
        <button
          className="w-[100px] rounded-tr-md bg-gray-400 p-1 text-center text-[10px] duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
          id="submit"
          type="submit"
        >
          submit
        </button>
      </div>
      <div className="flex flex-1">
        <MonacoEditor selectedLanguage={selectedLanguage} />
      </div>
    </section>
  );
}
