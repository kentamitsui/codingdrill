export default function InputSection() {
  return (
    <section id="split-horizontal-right" className="flex flex-col">
      <div className="flex flex-row justify-between rounded-t-md border-b-2 border-[rgb(13,17,23)] bg-[#1e1e1e] text-[1rem] font-bold">
        <div
          id="codeInputArea-title"
          className="rounded-tl-md p-[4px_4px_4px_30px] text-[1rem]"
        >
          Code Input Area
        </div>
        <button
          id="button-Copy-CodeInputArea"
          className="ml-auto w-[120px] border-r-2 border-[rgb(13,17,23)] bg-slate-700 p-1 duration-300 hover:bg-slate-500"
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
      <form
        id="split-vertical-left"
        className="h-full"
        action="script.js"
        method="post"
      >
        <div id="editorContainer"></div>
      </form>
    </section>
  );
}
