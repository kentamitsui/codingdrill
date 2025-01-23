import React, { useEffect } from "react";
import { useAppContext } from "@/app/context/AppContext";
import { ReusableProblemContentProps } from "@/app/type/type";
import Loading from "@/app/components/loading/Loading";
import Image from "next/image";
import menuData from "@/app/config/config.json";

// 受け取ったJSONデータをキー毎に割り振る
const QuestionSection: React.FC = () => {
  const {
    isApiLoading,
    isQuestionCreating,
    jsonFormattedQuestionText,
    formattedQuestionText,
    setFormattedQuestionText,
    currentTheme,
  } = useAppContext();

  const ReusableParagraph: React.FC<ReusableProblemContentProps> = ({
    content,
    titleText,
    paragraphContent,
  }) => {
    return (
      <div className="whitespace-break-spaces">
        {/* タイトル */}
        <p className="text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {content ? titleText : null}
        </p>
        {/* 複数行対応の本文 */}
        <div className="ml-4 text-[16px] font-normal width_1440px:ml-5 width_1440px:text-[18px] width_1680px:ml-[22px] width_1680px:text-[20px]">
          {content &&
            [paragraphContent].map((line, index) => <p key={index}>{line}</p>)}
        </div>
      </div>
    );
  };

  // クリップボードに文字列をコピーする関数
  useEffect(() => {
    if (!jsonFormattedQuestionText) {
      return;
    }

    // 問題文やフォーマットについて
    const description = `Description\n${jsonFormattedQuestionText.problemStatement}\n\n`;
    const functionSignature = `function Signature\n${jsonFormattedQuestionText.functionSignature}\n\n`;
    const size = `size: ${jsonFormattedQuestionText.constraints.size}\n\n`;
    const valueRange = `valueRange: ${jsonFormattedQuestionText.constraints.valueRange}\n\n`;
    const kRange = `kRange: ${jsonFormattedQuestionText.constraints.kRange}\n\n`;
    // 例題やエッジケース等について
    const example1 = `Example 1\nInput:\n${jsonFormattedQuestionText.example1?.input}\nOutput: ${jsonFormattedQuestionText.example1?.output}\nExplanation: ${jsonFormattedQuestionText.example1?.explanation}\n\n`;
    const example2 = `Example 2\nInput:\n${jsonFormattedQuestionText.example2?.input}\nOutput: ${jsonFormattedQuestionText.example2?.output}\nExplanation: ${jsonFormattedQuestionText.example2?.explanation}\n\n`;
    const example3 = `Example 3\nInput:\n${jsonFormattedQuestionText.example3?.input}\nOutput: ${jsonFormattedQuestionText.example3?.output}\nExplanation: ${jsonFormattedQuestionText.example3?.explanation}\n\n`;
    const edgeCase1 = `edgeCase 1\nInput:\n${jsonFormattedQuestionText.edgeCase1?.input}\nOutput: ${jsonFormattedQuestionText.edgeCase1?.output}\nExplanation: ${jsonFormattedQuestionText.edgeCase1?.explanation}\n\n`;
    const edgeCase2 = `edgeCase 2\nInput:\n${jsonFormattedQuestionText.edgeCase2?.input}\nOutput: ${jsonFormattedQuestionText.edgeCase2?.output}\nExplanation: ${jsonFormattedQuestionText.edgeCase2?.explanation}\n\n`;
    const edgeCase3 = `edgeCase 3\nInput:\n${jsonFormattedQuestionText.edgeCase3?.input}\nOutput: ${jsonFormattedQuestionText.edgeCase3?.output}\nExplanation: ${jsonFormattedQuestionText.edgeCase3?.explanation}\n\n`;
    // 要件等について
    const analysis = `Analysis\nTime Complexity: ${jsonFormattedQuestionText.analysis?.timeComplexity}\nSpace Complexity: ${jsonFormattedQuestionText.analysis?.spaceComplexity}\nEdge Cases: ${jsonFormattedQuestionText.analysis?.edgeCases}\nOther Consideration: ${jsonFormattedQuestionText.analysis?.otherConsiderations}\n\n`;
    // ヒントについて
    const hints = `Hints\n${jsonFormattedQuestionText.hints}`;

    const formattedQuestionDetails =
      description +
      functionSignature +
      size +
      valueRange +
      kRange +
      example1 +
      example2 +
      example3 +
      edgeCase1 +
      edgeCase2 +
      edgeCase3 +
      analysis +
      hints;

    setFormattedQuestionText(formattedQuestionDetails);
  }, [jsonFormattedQuestionText, setFormattedQuestionText]);

  const copyToClipboard = () => {
    if (!formattedQuestionText || formattedQuestionText.trim().length === 0) {
      return;
    }

    navigator.clipboard
      .writeText(formattedQuestionText)
      .then(() => {
        alert("Copied to clipboard.");
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
          className={`flex w-[120px] items-center justify-between bg-gray-400 p-1 duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${isApiLoading || jsonFormattedQuestionText === null ? "cursor-not-allowed opacity-50" : ""} `}
          onClick={copyToClipboard}
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
          <ReusableParagraph
            content={jsonFormattedQuestionText}
            titleText="Description"
            paragraphContent={jsonFormattedQuestionText?.problemStatement}
          />
          <ReusableParagraph
            content={jsonFormattedQuestionText}
            titleText="Function Signature"
            paragraphContent={jsonFormattedQuestionText?.functionSignature}
          />
          <ReusableParagraph
            content={jsonFormattedQuestionText}
            titleText="Constraints"
            paragraphContent={`Size: ${jsonFormattedQuestionText?.constraints.size}\nValue Range: ${jsonFormattedQuestionText?.constraints.valueRange}\nK Range: ${jsonFormattedQuestionText?.constraints.kRange}`}
          />
          {/* 例題等の項目 */}
          <div className="mt-8">
            <ReusableParagraph
              content={jsonFormattedQuestionText}
              titleText="Example 1"
              paragraphContent={`Input:\n${jsonFormattedQuestionText?.example1?.input}\nOutput: ${jsonFormattedQuestionText?.example1?.output}\nExplanation: ${jsonFormattedQuestionText?.example1?.explanation}`}
            />
          </div>
          <ReusableParagraph
            content={jsonFormattedQuestionText}
            titleText="Example 2"
            paragraphContent={`Input:\n${jsonFormattedQuestionText?.example2?.input}\nOutput: ${jsonFormattedQuestionText?.example2?.output}\nExplanation: ${jsonFormattedQuestionText?.example2?.explanation}`}
          />
          <ReusableParagraph
            content={jsonFormattedQuestionText}
            titleText="Example 3"
            paragraphContent={`Input:\n${jsonFormattedQuestionText?.example3?.input}\nOutput: ${jsonFormattedQuestionText?.example3?.output}\nExplanation: ${jsonFormattedQuestionText?.example3?.explanation}`}
          />
          <ReusableParagraph
            content={jsonFormattedQuestionText}
            titleText="Edge Case 1"
            paragraphContent={`Input:\n${jsonFormattedQuestionText?.edgeCase1?.input}\nOutput: ${jsonFormattedQuestionText?.edgeCase1?.output}\nExplanation: ${jsonFormattedQuestionText?.edgeCase1?.explanation}`}
          />
          <ReusableParagraph
            content={jsonFormattedQuestionText}
            titleText="Edge Case 2"
            paragraphContent={`Input:\n${jsonFormattedQuestionText?.edgeCase2?.input}\nOutput: ${jsonFormattedQuestionText?.edgeCase2?.output}\nExplanation: ${jsonFormattedQuestionText?.edgeCase2?.explanation}`}
          />
          <ReusableParagraph
            content={jsonFormattedQuestionText}
            titleText="Edge Case 3"
            paragraphContent={`Input:\n${jsonFormattedQuestionText?.edgeCase3?.input}\nOutput: ${jsonFormattedQuestionText?.edgeCase3?.output}\nExplanation: ${jsonFormattedQuestionText?.edgeCase3?.explanation}`}
          />
          {/* analysis */}
          <div className="mt-8">
            <ReusableParagraph
              content={jsonFormattedQuestionText}
              titleText="Analysis"
              paragraphContent={`Time Complexity: ${
                jsonFormattedQuestionText?.analysis?.timeComplexity
              }\nSpace Complexity: ${jsonFormattedQuestionText?.analysis?.spaceComplexity}\nEdge Cases: ${jsonFormattedQuestionText?.analysis?.edgeCases}\nOther Consideration: ${jsonFormattedQuestionText?.analysis?.otherConsiderations}`}
            />
          </div>
          {/* hints */}
          <div className="mt-8">
            <ReusableParagraph
              content={jsonFormattedQuestionText}
              titleText="Hints"
              paragraphContent={`${jsonFormattedQuestionText?.hints}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionSection;
