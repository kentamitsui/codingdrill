import MonacoEditor from "../feature/monacoEditor/MonacoEditor";

export default function InputSection() {
  return (
    <section id="split-horizontal-right" className="flex flex-col">
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
      {/* <form
        id="split-vertical-left"
        className="h-full bg-gray-200 dark:bg-[#0d1117]"
        action="script.js"
        method="post"
      >
        <div id="editorContainer"></div>
      </form> */}
      <MonacoEditor />
    </section>
  );
}
