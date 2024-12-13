import React, { useEffect } from "react";
import { DisplayProblemProps } from "../type/type";
import { useAppContext } from "../feature/localStorage/AppContext";

// 受け取ったJSONデータをキー毎に割り振る
const ProblemSection: React.FC<DisplayProblemProps> = ({
  displayProblemData,
  getIsDisabledData,
}) => {
  const { setFormattedProblemContent } = useAppContext();

  // クリップボードに文字列をコピーする関数
  useEffect(() => {
    const description = displayProblemData
      ? `Description\n${displayProblemData.problemStatement}\n\n`
      : "";
    const example1 = displayProblemData
      ? `Example 1\nInput: ${displayProblemData.example1.input}\nOutput: ${displayProblemData.example1.output}\nExplanation: ${displayProblemData.example1.explanation}\n\n`
      : "";
    const example2 = displayProblemData
      ? `Example 2\nInput: ${displayProblemData.example2.input}\nOutput: ${displayProblemData.example2.output}\nExplanation: ${displayProblemData.example2.explanation}\n\n`
      : "";
    const example3 = displayProblemData
      ? `Example 3\nInput: ${displayProblemData.example3.input}\nOutput: ${displayProblemData.example3.output}\nExplanation: ${displayProblemData.example3.explanation}\n\n`
      : "";
    const notes = displayProblemData
      ? `Notes\nTime Complexity: ${displayProblemData.notes.timeComplexity}\nSpace Complexity: ${displayProblemData.notes.spaceComplexity}\nEdge Cases: ${displayProblemData.notes.edgeCases}\nOther Consideration: ${displayProblemData.notes.otherConsiderations}`
      : "";

    const fullText = description + example1 + example2 + example3 + notes;

    setFormattedProblemContent(fullText);
  });

  const copyToClipboard = () => {
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
      <div className="p-[15px_30px] text-[16px] leading-normal tracking-wider width_1440px:text-[18px] width_1680px:text-[20px]">
        <div className="whitespace-break-spaces text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {displayProblemData
            ? "Description\n" + displayProblemData?.problemStatement
            : null}
        </div>
        <div hidden></div>
        <div className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {displayProblemData ? "Example 1" : null}
        </div>
        <div className="font-light">
          {displayProblemData
            ? "Input: " + displayProblemData?.example1.input
            : null}
        </div>
        <div className="font-light">
          {displayProblemData
            ? "Output: " + displayProblemData?.example1.output
            : null}
        </div>
        <div className="font-light">
          {displayProblemData
            ? "Explanation: " + displayProblemData?.example1.explanation
            : null}
        </div>
        <div className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {displayProblemData ? "Example 2" : null}
        </div>
        <div className="font-light">
          {displayProblemData
            ? "Input: " + displayProblemData?.example2.input
            : null}
        </div>
        <div className="font-light">
          {displayProblemData
            ? "Output: " + displayProblemData?.example2.output
            : null}
        </div>
        <div className="font-light">
          {displayProblemData
            ? "Explanation: " + displayProblemData?.example2.explanation
            : null}
        </div>
        <div className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {displayProblemData ? "Example 3" : null}
        </div>
        <div className="font-light">
          {displayProblemData
            ? "Input: " + displayProblemData?.example3.input
            : null}
        </div>
        <div className="font-light">
          {displayProblemData
            ? "Output: " + displayProblemData?.example3.output
            : null}
        </div>
        <div className="font-light">
          {displayProblemData
            ? "Explanation: " + displayProblemData?.example3.explanation
            : null}
        </div>
        <div className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {displayProblemData ? "Notes" : null}
        </div>
        <div className="grid gap-[10px]">
          <div className="font-light">
            {displayProblemData
              ? "Time Complexity: " + displayProblemData?.notes.timeComplexity
              : null}
          </div>
          <div className="font-light">
            {displayProblemData
              ? "Space Complexity: " + displayProblemData?.notes.spaceComplexity
              : null}
          </div>
          <div className="font-light">
            {displayProblemData
              ? "Edge Cases: " + displayProblemData?.notes.edgeCases
              : null}
          </div>
          <div className="font-light">
            {displayProblemData
              ? "Other Consideration: " +
                displayProblemData?.notes.otherConsiderations
              : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
