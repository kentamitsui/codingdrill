import MonacoEditor from "../feature/monacoEditor/MonacoEditor";

export default function InputSection() {
  return (
    <section
      id="split-horizontal-right"
      className="flex flex-col flex-grow overflow-hidden"
      style={{ height: "100%", width: "100%" }} // 親要素が高さを管理
    >
      <div className="flex flex-row justify-between rounded-t-md border-b-2 border-gray-50 bg-gray-200 text-[1rem] font-bold dark:border-[#1e1e1e] dark:bg-[#0d1117]">
        <div
          id="codeInputArea-title"
          className="rounded-tl-md p-[4px_4px_4px_30px] text-[1rem]"
        >
          Code Input Area
        </div>
        <button
          id="button-Copy-CodeInputArea"
          className="ml-auto w-[120px] border-r-2 border-gray-50 bg-slate-700 p-1 duration-300 hover:bg-slate-500 dark:border-[#1e1e1e]"
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
        <MonacoEditor />
      </div>
    </section>
  );
}
