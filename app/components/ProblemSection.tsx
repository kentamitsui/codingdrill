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

    const functionSignature = jsonFormattedProblemContent
      ? `function Signature\n${jsonFormattedProblemContent.functionSignature}\n\n`
      : "";

    const inputFormat = jsonFormattedProblemContent
      ? `inputFormat\n${jsonFormattedProblemContent.inputFormat}\n\n`
      : "";

    const outputFormat = jsonFormattedProblemContent
      ? `outputFormat\n${jsonFormattedProblemContent.outputFormat}\n\n`
      : "";

    const size = jsonFormattedProblemContent
      ? `size\n${jsonFormattedProblemContent.constraints.size}\n\n`
      : "";

    const valueRange = jsonFormattedProblemContent
      ? `valueRange\n${jsonFormattedProblemContent.constraints.valueRange}\n\n`
      : "";

    const kRange = jsonFormattedProblemContent
      ? `kRange\n${jsonFormattedProblemContent.constraints.kRange}\n\n`
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

    const edgeCase1 = jsonFormattedProblemContent
      ? `edgeCase 1\nInput: ${jsonFormattedProblemContent.edgeCase1.input}\nOutput: ${jsonFormattedProblemContent.edgeCase1.output}\nExplanation: ${jsonFormattedProblemContent.edgeCase1.explanation}\n\n`
      : "";

    const edgeCase2 = jsonFormattedProblemContent
      ? `edgeCase 2\nInput: ${jsonFormattedProblemContent.edgeCase2.input}\nOutput: ${jsonFormattedProblemContent.edgeCase2.output}\nExplanation: ${jsonFormattedProblemContent.edgeCase2.explanation}\n\n`
      : "";

    const analysis = jsonFormattedProblemContent
      ? `analysis\nTime Complexity: ${jsonFormattedProblemContent.analysis.timeComplexity}\nSpace Complexity: ${jsonFormattedProblemContent.analysis.spaceComplexity}\nEdge Cases: ${jsonFormattedProblemContent.analysis.edgeCases}\nOther Consideration: ${jsonFormattedProblemContent.analysis.otherConsiderations}`
      : "";

    const hints = jsonFormattedProblemContent
      ? `hints\n ${jsonFormattedProblemContent.hints}`
      : "";

    const formattedProblemContent =
      description +
      functionSignature +
      inputFormat +
      outputFormat +
      size +
      valueRange +
      kRange +
      example1 +
      example2 +
      example3 +
      edgeCase1 +
      edgeCase2 +
      analysis +
      hints;

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
        <div className="grid gap-5 whitespace-break-spaces">
          <div>
            <p className="text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
              {jsonFormattedProblemContent ? "Description\n" : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? jsonFormattedProblemContent.problemStatement + "\n"
                : null}
            </p>
          </div>
          <div>
            <p className="text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
              {jsonFormattedProblemContent ? "Function Signature\n" : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? jsonFormattedProblemContent.functionSignature + "\n"
                : null}
            </p>
          </div>
          <div>
            <p className="text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
              {jsonFormattedProblemContent ? "Input Format\n" : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? jsonFormattedProblemContent.inputFormat + "\n"
                : null}
            </p>
          </div>
          <div>
            <p className="text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
              {jsonFormattedProblemContent ? "Output Format\n" : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? jsonFormattedProblemContent.outputFormat + "\n"
                : null}
            </p>
          </div>
          <div className="grid gap-[5px]">
            <p className="text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
              {jsonFormattedProblemContent ? "Constraints\n" : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Size: " + jsonFormattedProblemContent.constraints.size + "\n"
                : null}
              {jsonFormattedProblemContent
                ? "Value Range: " +
                  jsonFormattedProblemContent.constraints.valueRange +
                  "\n"
                : null}
              {jsonFormattedProblemContent
                ? "K Range: " +
                  jsonFormattedProblemContent.constraints.kRange +
                  "\n"
                : null}
            </p>
          </div>
          <div className="mt-8 grid gap-[5px]">
            <p className="text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
              {jsonFormattedProblemContent ? "Example 1" : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Input: " + jsonFormattedProblemContent?.example1.input
                : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Output: " + jsonFormattedProblemContent?.example1.output
                : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Explanation: " +
                  jsonFormattedProblemContent?.example1.explanation
                : null}
            </p>
          </div>
          <div className="grid gap-[5px]">
            <p className="text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
              {jsonFormattedProblemContent ? "Example 2" : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Input: " + jsonFormattedProblemContent?.example2.input
                : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Output: " + jsonFormattedProblemContent?.example2.output
                : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Explanation: " +
                  jsonFormattedProblemContent?.example2.explanation
                : null}
            </p>
          </div>
          <div className="grid gap-[5px]">
            <p className="text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
              {jsonFormattedProblemContent ? "Example 3" : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Input: " + jsonFormattedProblemContent?.example3.input
                : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Output: " + jsonFormattedProblemContent?.example3.output
                : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Explanation: " +
                  jsonFormattedProblemContent?.example3.explanation
                : null}
            </p>
          </div>
          <div className="grid gap-[5px]">
            <p className="text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
              {jsonFormattedProblemContent ? "Edge Case 1" : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Input: " + jsonFormattedProblemContent?.edgeCase1.input
                : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Output: " + jsonFormattedProblemContent?.edgeCase1.output
                : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Explanation: " +
                  jsonFormattedProblemContent?.edgeCase1.explanation
                : null}
            </p>
          </div>
          <div className="grid gap-[5px]">
            <p className="text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
              {jsonFormattedProblemContent ? "Edge Case 2" : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Input: " + jsonFormattedProblemContent?.edgeCase2.input
                : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Output: " + jsonFormattedProblemContent?.edgeCase2.output
                : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? "Explanation: " +
                  jsonFormattedProblemContent?.edgeCase2.explanation
                : null}
            </p>
          </div>
          <div>
            <p className="mt-8 text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
              {jsonFormattedProblemContent ? "Analysis" : null}
            </p>
            <div className="grid gap-[5px]">
              <p className="font-light">
                {jsonFormattedProblemContent
                  ? "Time Complexity: " +
                    jsonFormattedProblemContent?.analysis.timeComplexity
                  : null}
              </p>
              <p className="font-light">
                {jsonFormattedProblemContent
                  ? "Space Complexity: " +
                    jsonFormattedProblemContent?.analysis.spaceComplexity
                  : null}
              </p>
              <p className="font-light">
                {jsonFormattedProblemContent
                  ? "Edge Cases: " +
                    jsonFormattedProblemContent?.analysis.edgeCases
                  : null}
              </p>
              <p className="font-light">
                {jsonFormattedProblemContent
                  ? "Other Consideration: " +
                    jsonFormattedProblemContent?.analysis.otherConsiderations
                  : null}
              </p>
            </div>
          </div>
          <div>
            <p className="mt-8 text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
              {jsonFormattedProblemContent ? "Hints" : null}
            </p>
            <p className="font-light">
              {jsonFormattedProblemContent
                ? jsonFormattedProblemContent?.hints
                : null}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
