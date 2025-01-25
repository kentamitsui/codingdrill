import React, { useEffect, useMemo } from "react";
import { useAppContext } from "@/app/context/AppContext";
import Paragraph from "@/app/components/common/Paragraph";
import Loading from "@/app/components/loading/Loading";
import Image from "next/image";
import menuData from "@/app/config/config.json";
import clipboardCopy from "@/app/feature/clipboardCopy/clipboardCopy";

// 問題文を表示するコンポーネント
const QuestionSection: React.FC = () => {
  const {
    isApiLoading,
    isQuestionCreating,
    jsonQuestionText,
    setStoredQuestionText,
    currentTheme,
  } = useAppContext();

  // useMemoでメモ化
  const formattedQuestionDetails = useMemo(() => {
    if (jsonQuestionText === null) return "";

    return [
      `Description\n${jsonQuestionText.problemStatement}\n\n`,
      `Function Signature\n${jsonQuestionText.functionSignature}\n\n`,
      `size: ${jsonQuestionText.constraints.size}\n`,
      `valueRange: ${jsonQuestionText.constraints.valueRange}\n`,
      `kRange: ${jsonQuestionText.constraints.kRange}\n\n`,
      `Example 1\nInput:\n${jsonQuestionText.example1?.input}\nOutput: ${jsonQuestionText.example1?.output}\nExplanation: ${jsonQuestionText.example1?.explanation}\n\n`,
      `Example 2\nInput:\n${jsonQuestionText.example2?.input}\nOutput: ${jsonQuestionText.example2?.output}\nExplanation: ${jsonQuestionText.example2?.explanation}\n\n`,
      `Example 3\nInput:\n${jsonQuestionText.example3?.input}\nOutput: ${jsonQuestionText.example3?.output}\nExplanation: ${jsonQuestionText.example3?.explanation}\n\n`,
      `edgeCase 1\nInput:\n${jsonQuestionText.edgeCase1?.input}\nOutput: ${jsonQuestionText.edgeCase1?.output}\nExplanation: ${jsonQuestionText.edgeCase1?.explanation}\n\n`,
      `edgeCase 2\nInput:\n${jsonQuestionText.edgeCase2?.input}\nOutput: ${jsonQuestionText.edgeCase2?.output}\nExplanation: ${jsonQuestionText.edgeCase2?.explanation}\n\n`,
      `edgeCase 3\nInput:\n${jsonQuestionText.edgeCase3?.input}\nOutput: ${jsonQuestionText.edgeCase3?.output}\nExplanation: ${jsonQuestionText.edgeCase3?.explanation}\n\n`,
      `Analysis\nTime Complexity: ${jsonQuestionText.analysis?.timeComplexity}\nSpace Complexity: ${jsonQuestionText.analysis?.spaceComplexity}\nEdge Cases: ${jsonQuestionText.analysis?.edgeCases}\nOther Consideration: ${jsonQuestionText.analysis?.otherConsiderations}\n\n`,
      `Hints\n${jsonQuestionText.hints}`,
    ].join("");
  }, [jsonQuestionText]);

  // formattedQuestionDetailsが変更される度に、setStoredQuestionTextを更新
  useEffect(() => {
    if (formattedQuestionDetails.trim().length > 0) {
      setStoredQuestionText(formattedQuestionDetails);
    }
  }, [formattedQuestionDetails, setStoredQuestionText]);

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
          className={`flex w-[120px] items-center justify-between bg-gray-400 p-1 duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${isApiLoading || jsonQuestionText === null ? "cursor-not-allowed opacity-50" : ""} `}
          onClick={() => clipboardCopy({ context: formattedQuestionDetails })}
          disabled={isApiLoading}
        >
          <span className="flex-1 text-center">Copy</span>
          <Image
            src={
              currentTheme === "dark"
                ? menuData.svgIcon.copyLight
                : menuData.svgIcon.copyDark
            }
            alt=""
            width={20}
            height={20}
          />
        </button>
      </div>
      <div className="p-[15px_30px] leading-normal tracking-wider">
        <Loading isCreating={isQuestionCreating} text={"Now Creating"} />
        <div className="grid gap-5 whitespace-break-spaces">
          {/* description等の項目 */}
          <Paragraph
            content={jsonQuestionText}
            titleText="Description"
            paragraphContent={jsonQuestionText?.problemStatement}
          />
          <Paragraph
            content={jsonQuestionText}
            titleText="Function Signature"
            paragraphContent={jsonQuestionText?.functionSignature}
          />
          <Paragraph
            content={jsonQuestionText}
            titleText="Constraints"
            paragraphContent={`Size: ${jsonQuestionText?.constraints.size}\nValue Range: ${jsonQuestionText?.constraints.valueRange}\nK Range: ${jsonQuestionText?.constraints.kRange}`}
          />
          {/* 例題等の項目 */}
          <div className="mt-8">
            <Paragraph
              content={jsonQuestionText}
              titleText="Example 1"
              paragraphContent={`Input:\n${jsonQuestionText?.example1?.input}\nOutput: ${jsonQuestionText?.example1?.output}\nExplanation: ${jsonQuestionText?.example1?.explanation}`}
            />
          </div>
          <Paragraph
            content={jsonQuestionText}
            titleText="Example 2"
            paragraphContent={`Input:\n${jsonQuestionText?.example2?.input}\nOutput: ${jsonQuestionText?.example2?.output}\nExplanation: ${jsonQuestionText?.example2?.explanation}`}
          />
          <Paragraph
            content={jsonQuestionText}
            titleText="Example 3"
            paragraphContent={`Input:\n${jsonQuestionText?.example3?.input}\nOutput: ${jsonQuestionText?.example3?.output}\nExplanation: ${jsonQuestionText?.example3?.explanation}`}
          />
          <Paragraph
            content={jsonQuestionText}
            titleText="Edge Case 1"
            paragraphContent={`Input:\n${jsonQuestionText?.edgeCase1?.input}\nOutput: ${jsonQuestionText?.edgeCase1?.output}\nExplanation: ${jsonQuestionText?.edgeCase1?.explanation}`}
          />
          <Paragraph
            content={jsonQuestionText}
            titleText="Edge Case 2"
            paragraphContent={`Input:\n${jsonQuestionText?.edgeCase2?.input}\nOutput: ${jsonQuestionText?.edgeCase2?.output}\nExplanation: ${jsonQuestionText?.edgeCase2?.explanation}`}
          />
          <Paragraph
            content={jsonQuestionText}
            titleText="Edge Case 3"
            paragraphContent={`Input:\n${jsonQuestionText?.edgeCase3?.input}\nOutput: ${jsonQuestionText?.edgeCase3?.output}\nExplanation: ${jsonQuestionText?.edgeCase3?.explanation}`}
          />
          {/* analysis */}
          <div className="mt-8">
            <Paragraph
              content={jsonQuestionText}
              titleText="Analysis"
              paragraphContent={`Time Complexity: ${
                jsonQuestionText?.analysis?.timeComplexity
              }\nSpace Complexity: ${jsonQuestionText?.analysis?.spaceComplexity}\nEdge Cases: ${jsonQuestionText?.analysis?.edgeCases}\nOther Consideration: ${jsonQuestionText?.analysis?.otherConsiderations}`}
            />
          </div>
          {/* hints */}
          <div className="mt-8">
            <Paragraph
              content={jsonQuestionText}
              titleText="Hints"
              paragraphContent={`${jsonQuestionText?.hints}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionSection;
