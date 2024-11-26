import React from "react";
import { DisplayProblemProps } from "../type/type";

// 受け取ったJSONデータをキー毎に割り振る
const ProblemSection: React.FC<DisplayProblemProps> = ({
  displayProblemData,
  getIsDisabledData,
}) => {
  const parsedData = JSON.parse(displayProblemData);
  // console.log(displayProblemData);
  // クリップボードに文字列をコピーする関数
  const copyToClipboard = () => {
    const description = parsedData
      ? `Description\n${parsedData.problemStatement}\n\n`
      : "";
    const example1 = parsedData
      ? `Example 1\nInput: ${parsedData.example1.input}\nOutput: ${parsedData.example1.output}\nExplanation: ${parsedData.example1.explanation}\n\n`
      : "";
    const example2 = parsedData
      ? `Example 2\nInput: ${parsedData.example2.input}\nOutput: ${parsedData.example2.output}\nExplanation: ${parsedData.example2.explanation}\n\n`
      : "";
    const example3 = parsedData
      ? `Example 3\nInput: ${parsedData.example3.input}\nOutput: ${parsedData.example3.output}\nExplanation: ${parsedData.example3.explanation}\n\n`
      : "";
    const notes = parsedData
      ? `Notes\nTime Complexity: ${parsedData.notes.timeComplexity}\nSpace Complexity: ${parsedData.notes.spaceComplexity}\nEdge Cases: ${parsedData.notes.edgeCases}\nOther Consideration: ${parsedData.notes.otherConsiderations}`
      : "";

    const fullText = description + example1 + example2 + example3 + notes;

    navigator.clipboard
      .writeText(fullText)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy text.");
      });
  };

  return (
    <section
      id="split-horizontal-left"
      className="flex-grow overflow-y-scroll rounded-md bg-gray-200 dark:bg-[#0d1117]"
    >
      <div className="sticky top-0 z-10 flex flex-row justify-between border-b-2 border-gray-50 bg-gray-200 text-[1rem] font-bold dark:border-[#1e1e1e] dark:bg-[#0d1117]">
        <div id="problemArea-title" className="p-[4px_4px_4px_30px]">
          Description
        </div>
        <button
          className={`w-[120px] bg-gray-400 p-1 duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${getIsDisabledData === true ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          onClick={copyToClipboard}
          disabled={getIsDisabledData}
        >
          copy
        </button>
      </div>
      <div className="p-[15px_30px] text-[16px] leading-[1.5] tracking-wider width_1440px:text-[18px] width_1680px:text-[20px]">
        <div className="whitespace-break-spaces text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {parsedData ? "Description\n" + parsedData?.problemStatement : null}
        </div>
        <div hidden></div>
        <div className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {parsedData ? "Example 1" : null}
        </div>
        <div className="font-light">
          {parsedData ? "Input: " + parsedData?.example1.input : null}
        </div>
        <div className="font-light">
          {parsedData ? "Output: " + parsedData?.example1.output : null}
        </div>
        <div className="font-light">
          {parsedData
            ? "Explanation: " + parsedData?.example1.explanation
            : null}
        </div>
        <div className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {parsedData ? "Example 2" : null}
        </div>
        <div className="font-light">
          {parsedData ? "Input: " + parsedData?.example2.input : null}
        </div>
        <div className="font-light">
          {parsedData ? "Output: " + parsedData?.example2.output : null}
        </div>
        <div className="font-light">
          {parsedData
            ? "Explanation: " + parsedData?.example2.explanation
            : null}
        </div>
        <div className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {parsedData ? "Example 3" : null}
        </div>
        <div className="font-light">
          {parsedData ? "Input: " + parsedData?.example3.input : null}
        </div>
        <div className="font-light">
          {parsedData ? "Output: " + parsedData?.example3.output : null}
        </div>
        <div className="font-light">
          {parsedData
            ? "Explanation: " + parsedData?.example3.explanation
            : null}
        </div>
        <div className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {parsedData ? "Notes" : null}
        </div>
        <div className="grid gap-[10px]">
          <div className="font-light">
            {parsedData
              ? "Time Complexity: " + parsedData?.notes.timeComplexity
              : null}
          </div>
          <div className="font-light">
            {parsedData
              ? "Space Complexity: " + parsedData?.notes.spaceComplexity
              : null}
          </div>
          <div className="font-light">
            {parsedData ? "Edge Cases: " + parsedData?.notes.edgeCases : null}
          </div>
          <div className="font-light">
            {parsedData
              ? "Other Consideration: " + parsedData?.notes.otherConsiderations
              : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
