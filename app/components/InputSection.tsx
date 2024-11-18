import MonacoEditor from "../feature/monacoEditor/MonacoEditor";
import config from "../config/config.json";
import { useState } from "react";

export default function InputSection() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <section
      id="split-horizontal-right"
      className="flex flex-col flex-grow overflow-hidden"
      style={{ height: "100%" }} // 親要素が高さを管理
    >
      <div className="flex flex-row justify-between rounded-t-md border-b-2 border-gray-50 bg-gray-200 text-[1rem] font-bold dark:border-[#1e1e1e] dark:bg-[#0d1117]">
        <div
          id="codeInputArea-title"
          className="rounded-tl-md p-[4px_4px_4px_30px] text-[1rem]"
        >
          Code Input Area
        </div>
        <select
          id="language-select"
          className="w-[120px] text-center ml-auto mr-[2px] bg-gray-100 dark:bg-gray-800 dark:text-white"
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
          className="w-[120px] mr-[2px] border-gray-50 bg-slate-700 p-1 duration-300 hover:bg-slate-500 dark:border-[#1e1e1e]"
        >
          copy
        </button>
        <button
          className="w-[120px] rounded-tr-md bg-slate-700 p-1 duration-300 hover:bg-slate-500"
          id="submit"
          type="submit"
        >
          submit
        </button>
      </div>
      <div className="flex-1 flex">
        <MonacoEditor selectedLanguage={selectedLanguage} />
      </div>
    </section>
  );
}
