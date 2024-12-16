import React, { useEffect } from "react";
import { useAppContext } from "./AppContext";

// 受け取ったJSONデータをキー毎に割り振る
const ProblemSection: React.FC = () => {
  const {
    isDisabled,
    jsonFormattedProblemContent,
    formattedProblemContent,
    setFormattedProblemContent,
  } = useAppContext();

  // クリップボードに文字列をコピーする関数
  useEffect(() => {
    const description = jsonFormattedProblemContent
      ? `Description\n${jsonFormattedProblemContent.problemStatement}\n\n`
      : "";
    const example1 = jsonFormattedProblemContent
      ? `Example 1\nInput: ${jsonFormattedProblemContent.example1.input}\nOutput: ${jsonFormattedProblemContent.example1.output}\nExplanation: ${jsonFormattedProblemContent.example1.explanation}\n\n`
      : "";
    const example2 = jsonFormattedProblemContent
      ? `Example 2\nInput: ${jsonFormattedProblemContent.example2.input}\nOutput: ${jsonFormattedProblemContent.example2.output}\nExplanation: ${jsonFormattedProblemContent.example2.explanation}\n\n`
      : "";
    const example3 = jsonFormattedProblemContent
      ? `Example 3\nInput: ${jsonFormattedProblemContent.example3.input}\nOutput: ${jsonFormattedProblemContent.example3.output}\nExplanation: ${jsonFormattedProblemContent.example3.explanation}\n\n`
      : "";
    const notes = jsonFormattedProblemContent
      ? `Notes\nTime Complexity: ${jsonFormattedProblemContent.notes.timeComplexity}\nSpace Complexity: ${jsonFormattedProblemContent.notes.spaceComplexity}\nEdge Cases: ${jsonFormattedProblemContent.notes.edgeCases}\nOther Consideration: ${jsonFormattedProblemContent.notes.otherConsiderations}`
      : "";

    const formattedProblemContent =
      description + example1 + example2 + example3 + notes;

    setFormattedProblemContent(formattedProblemContent);
  });

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(formattedProblemContent)
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
          className={`w-[120px] bg-gray-400 p-1 duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${isDisabled === true ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          onClick={copyToClipboard}
          disabled={isDisabled}
        >
          copy
        </button>
      </div>
      <div className="p-[15px_30px] text-[16px] leading-normal tracking-wider width_1440px:text-[18px] width_1680px:text-[20px]">
        <div className="whitespace-break-spaces text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {jsonFormattedProblemContent
            ? "Description\n" + jsonFormattedProblemContent?.problemStatement
            : null}
        </div>
        <div hidden></div>
        <div className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {jsonFormattedProblemContent ? "Example 1" : null}
        </div>
        <div className="font-light">
          {jsonFormattedProblemContent
            ? "Input: " + jsonFormattedProblemContent?.example1.input
            : null}
        </div>
        <div className="font-light">
          {jsonFormattedProblemContent
            ? "Output: " + jsonFormattedProblemContent?.example1.output
            : null}
        </div>
        <div className="font-light">
          {jsonFormattedProblemContent
            ? "Explanation: " +
              jsonFormattedProblemContent?.example1.explanation
            : null}
        </div>
        <div className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {jsonFormattedProblemContent ? "Example 2" : null}
        </div>
        <div className="font-light">
          {jsonFormattedProblemContent
            ? "Input: " + jsonFormattedProblemContent?.example2.input
            : null}
        </div>
        <div className="font-light">
          {jsonFormattedProblemContent
            ? "Output: " + jsonFormattedProblemContent?.example2.output
            : null}
        </div>
        <div className="font-light">
          {jsonFormattedProblemContent
            ? "Explanation: " +
              jsonFormattedProblemContent?.example2.explanation
            : null}
        </div>
        <div className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {jsonFormattedProblemContent ? "Example 3" : null}
        </div>
        <div className="font-light">
          {jsonFormattedProblemContent
            ? "Input: " + jsonFormattedProblemContent?.example3.input
            : null}
        </div>
        <div className="font-light">
          {jsonFormattedProblemContent
            ? "Output: " + jsonFormattedProblemContent?.example3.output
            : null}
        </div>
        <div className="font-light">
          {jsonFormattedProblemContent
            ? "Explanation: " +
              jsonFormattedProblemContent?.example3.explanation
            : null}
        </div>
        <div className="mt-[30px] text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {jsonFormattedProblemContent ? "Notes" : null}
        </div>
        <div className="grid gap-[10px]">
          <div className="font-light">
            {jsonFormattedProblemContent
              ? "Time Complexity: " +
                jsonFormattedProblemContent?.notes.timeComplexity
              : null}
          </div>
          <div className="font-light">
            {jsonFormattedProblemContent
              ? "Space Complexity: " +
                jsonFormattedProblemContent?.notes.spaceComplexity
              : null}
          </div>
          <div className="font-light">
            {jsonFormattedProblemContent
              ? "Edge Cases: " + jsonFormattedProblemContent?.notes.edgeCases
              : null}
          </div>
          <div className="font-light">
            {jsonFormattedProblemContent
              ? "Other Consideration: " +
                jsonFormattedProblemContent?.notes.otherConsiderations
              : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
