import React from "react";
import { DisplayProblemProps } from "../type/type";

// 受け取ったJSONデータをキー毎に割り振る
const ProblemSection: React.FC<DisplayProblemProps> = ({ problemData }) => {
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
        className="p-[15px_30px] text-[16px] leading-[1.5] tracking-wider width_1440px:text-[18px] width_1680px:text-[20px]"
      >
        <div
          id="description"
          className="whitespace-break-spaces text-[20px] font-medium  width_1440px:text-[22px] width_1680px:text-[24px]"
        >
          {parsedData ? "Description\n" + parsedData.problem_statement : null}
        </div>
        <div hidden id="function-signature"></div>
        <div
          id="example-1"
          className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]"
        >
          {parsedData ? "Example 1" : null}
        </div>
        <div id="example-1-input" className="font-light">
          {parsedData ? "Input: " + parsedData.example1.input : null}
        </div>
        <div id="example-1-output" className="font-light">
          {parsedData ? "Output: " + parsedData.example1.output : null}
        </div>
        <div id="example-1-explanation" className="font-light">
          {parsedData
            ? "Explanation: " + parsedData?.example1.explanation
            : null}
        </div>
        <div
          id="example-2"
          className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]"
        >
          {parsedData ? "Example 2" : null}
        </div>
        <div id="example-2-input" className="font-light">
          {parsedData ? "Input: " + parsedData?.example2.input : null}
        </div>
        <div id="example-2-output" className="font-light">
          {parsedData ? "Output: " + parsedData?.example2.output : null}
        </div>
        <div id="example-2-explanation" className="font-light">
          {parsedData
            ? "Explanation: " + parsedData?.example2.explanation
            : null}
        </div>
        <div
          id="example-3"
          className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]"
        >
          {parsedData ? "Example 3" : null}
        </div>
        <div id="example-3-input" className="font-light">
          {parsedData ? "Input: " + parsedData?.example3.input : null}
        </div>
        <div id="example-3-output" className="font-light">
          {parsedData ? "Output: " + parsedData?.example3.output : null}
        </div>
        <div id="example-3-explanation" className="font-light">
          {parsedData
            ? "Explanation: " + parsedData?.example3.explanation
            : null}
        </div>
        <div
          id="notes"
          className="mt-[30px] text-[18px] font-medium width_1440px:text-[20px] width_1680px:text-[22px]"
        >
          {parsedData ? "Notes" : null}
          <div className="grid gap-[10px]">
            <div id="notes-time-complexity" className="font-light">
              {parsedData
                ? "Time Complexity: " + parsedData?.notes.time_complexity
                : null}
            </div>
            <div id="notes-space-complexity" className="font-light">
              {parsedData
                ? "Space Complexity: " + parsedData?.notes.space_complexity
                : null}
            </div>
            <div id="notes-edge-cases" className="font-light">
              {parsedData
                ? "Edge Cases: " + parsedData?.notes.edge_cases
                : null}
            </div>
            <div id="notes-other-considerations" className="font-light">
              {parsedData
                ? "Other Consideration: " +
                  parsedData?.notes.other_considerations
                : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
