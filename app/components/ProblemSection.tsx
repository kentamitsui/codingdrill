import React from "react";

interface ProblemSectionProps {
  problemData: string;
}

// 受け取ったJSONデータをキー毎に割り振る
const ProblemSection: React.FC<ProblemSectionProps> = ({ problemData }) => {
  const parsedData = JSON.parse(problemData);

  return (
    <section
      id="split-horizontal-left"
      className="ml-2 flex-grow overflow-y-scroll rounded-md bg-gray-200 dark:bg-[#0d1117]"
    >
      <div className="sticky top-0 z-[1] flex flex-row justify-between border-b-2 border-gray-50 text-[1rem] font-bold dark:border-[#1e1e1e] dark:bg-[#0d1117]">
        <div id="problemArea-title" className="p-[4px_4px_4px_30px]">
          Problem Description Area
        </div>
        <button
          id="button-Copy-ProblemArea"
          className="w-[120px] bg-slate-700 p-1 duration-300 hover:bg-slate-500"
        >
          copy
        </button>
      </div>
      <div
        id="problemArea"
        className="text-[16px] width_1440px:text-[18px] width_1680px:text-[20px]"
      >
        <div
          id="description"
          className="pt-1 text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]"
        >
          {parsedData?.problem_statement}
        </div>
        <div hidden id="function-signature"></div>
        <div
          id="example-1"
          className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]"
        ></div>
        <div id="example-1-input" className="font-light">
          {parsedData?.example1.input}
        </div>
        <div id="example-1-output" className="font-light"></div>
        <div id="example-1-explanation" className="font-light"></div>
        <div
          id="example-2"
          className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]"
        ></div>
        <div id="example-2-input" className="font-light"></div>
        <div id="example-2-output" className="font-light"></div>
        <div id="example-2-explanation" className="font-light"></div>
        <div
          id="example-3"
          className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]"
        ></div>
        <div id="example-3-input" className="font-light"></div>
        <div id="example-3-output" className="font-light"></div>
        <div id="example-3-explanation" className="font-light"></div>
        <div
          id="notes"
          className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]"
        ></div>
        <div id="notes-time-complexity" className="font-light"></div>
        <div id="notes-space-complexity" className="font-light"></div>
        <div id="notes-edge-cases" className="font-light"></div>
        <div id="notes-other-considerations" className="font-light"></div>
      </div>
    </section>
  );
};

export default ProblemSection;
