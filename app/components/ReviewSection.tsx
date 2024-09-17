export default function ReviewSection() {
  return (
    <div
      id="split-vertical-right"
      className="h-full overflow-y-scroll rounded-b-md bg-[#1e1e1e]"
    >
      <div className="sticky top-0 z-[1] flex flex-row justify-between border-b-2 border-[rgb(13,17,23)] bg-[#1e1e1e] text-[1rem] font-bold">
        <div id="reviewDisplayArea-title" className="p-[4px_4px_4px_30px]">
          Review Display Area
        </div>
        <button
          id="button-Copy-ReviewArea"
          className="w-[120px] bg-slate-700 p-1 duration-300 hover:bg-slate-500"
        >
          copy
        </button>
      </div>
      <div
        id="result_scoring"
        className="flex flex-col whitespace-break-spaces text-[18px] font-medium width_1440px:text-[19px] width_1680px:text-[20px]"
      >
        <div id="code-executetime-memoryconsumption"></div>
        <div id="clarity-and-specificity"></div>
        <div id="originality-and-applicability" className="mt-5"></div>
        <div id="diversity-and-complexity" className="mt-5"></div>
        <div id="technical-requirements" className="mt-5"></div>
        <div id="evaluation-criteria" className="mt-5"></div>
      </div>
    </div>
  );
}
