import React, { useEffect } from "react";
import { useAppContext } from "./AppContext";

// 受け取ったJSONデータをキー毎に割り振る
const ProblemSection: React.FC = () => {
  const {
    isDisabled,
    isCreateProblem,
    jsonFormattedProblemContent,
    formattedProblemContent,
    setFormattedProblemContent,
  } = useAppContext();

  interface ReusableParagraphProps {
    content: string | null;
    titleText: string;
    paragraphContent: string | null;
  }

  const ReusableParagraph: React.FC<ReusableParagraphProps> = ({
    content,
    titleText,
    paragraphContent,
  }) => {
    // 複数行対応のために改行文字で分割
    const splitLines = (text: string | null) => {
      return text ? text.split("\n") : [];
    };

    return (
      <div>
        {/* タイトル */}
        <p className="text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {content ? titleText : null}
        </p>
        {/* 複数行対応の本文 */}
        <div className="ml-4 font-normal width_1440px:ml-5 width_1680px:ml-[22px]">
          {content &&
            splitLines(paragraphContent || "").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
        </div>
      </div>
    );
  };

  // クリップボードに文字列をコピーする関数
  useEffect(() => {
    // 問題文やフォーマットについて
    const description = jsonFormattedProblemContent
      ? `Description\n${jsonFormattedProblemContent.problemStatement}\n\n`
      : "";
    const functionSignature = jsonFormattedProblemContent
      ? `function Signature\n${jsonFormattedProblemContent.functionSignature}\n\n`
      : "";
    const size = jsonFormattedProblemContent
      ? `size: ${jsonFormattedProblemContent.constraints.size}\n\n`
      : "";
    const valueRange = jsonFormattedProblemContent
      ? `valueRange: ${jsonFormattedProblemContent.constraints.valueRange}\n\n`
      : "";
    const kRange = jsonFormattedProblemContent
      ? `kRange: ${jsonFormattedProblemContent.constraints.kRange}\n\n`
      : "";
    // 例題やエッジケース等について
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
    const edgeCase3 = jsonFormattedProblemContent
      ? `edgeCase 2\nInput: ${jsonFormattedProblemContent.edgeCase3.input}\nOutput: ${jsonFormattedProblemContent.edgeCase3.output}\nExplanation: ${jsonFormattedProblemContent.edgeCase3.explanation}\n\n`
      : "";
    // 要件等について
    const analysis = jsonFormattedProblemContent
      ? `Analysis\nTime Complexity: ${jsonFormattedProblemContent.analysis.timeComplexity}\nSpace Complexity: ${jsonFormattedProblemContent.analysis.spaceComplexity}\nEdge Cases: ${jsonFormattedProblemContent.analysis.edgeCases}\nOther Consideration: ${jsonFormattedProblemContent.analysis.otherConsiderations}\n\n`
      : "";
    // ヒントについて
    const hints = jsonFormattedProblemContent
      ? `Hints\n${jsonFormattedProblemContent.hints}`
      : "";

    const formattedProblemContent =
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

  // 問題文作成中のアニメーション
  const loadingAnimation =
    isCreateProblem === true ? (
      <div
        className="flex flex-row items-baseline justify-center"
        aria-label="now creating problem"
      >
        <p className="mr-3 flex animate-pulse justify-end text-2xl">
          Now creating
        </p>
        <div className="flex flex-row items-center justify-center gap-3">
          <div
            className="h-2 w-2 animate-ping rounded-full bg-blue-600"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="h-2 w-2 animate-ping rounded-full bg-blue-600"
            style={{ animationDelay: "0.125s" }}
          ></div>
          <div
            className="h-2 w-2 animate-ping rounded-full bg-blue-600"
            style={{ animationDelay: "0.15s" }}
          ></div>
        </div>
      </div>
    ) : (
      ""
    );

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
        {loadingAnimation}
        <div className="grid gap-5 whitespace-break-spaces">
          {/* description等の項目 */}
          <ReusableParagraph
            content={jsonFormattedProblemContent}
            titleText="Description"
            paragraphContent={jsonFormattedProblemContent?.problemStatement}
          />
          <ReusableParagraph
            content={jsonFormattedProblemContent}
            titleText="Function Signature"
            paragraphContent={jsonFormattedProblemContent?.functionSignature}
          />
          <ReusableParagraph
            content={jsonFormattedProblemContent}
            titleText="Constraints"
            paragraphContent={`Size: ${jsonFormattedProblemContent?.constraints.size}\nValue Range: ${jsonFormattedProblemContent?.constraints.valueRange}\nK Range: ${jsonFormattedProblemContent?.constraints.kRange}`}
          />
          {/* 例題等の項目 */}
          <div className="mt-8">
            <ReusableParagraph
              content={jsonFormattedProblemContent}
              titleText="Example 1"
              paragraphContent={`Input: ${jsonFormattedProblemContent?.example1.input}\nOutput: ${jsonFormattedProblemContent?.example1.output}\nExplanation: ${jsonFormattedProblemContent?.example1.explanation}`}
            />
          </div>
          <ReusableParagraph
            content={jsonFormattedProblemContent}
            titleText="Example 2"
            paragraphContent={`Input: ${jsonFormattedProblemContent?.example2.input}\nOutput: ${jsonFormattedProblemContent?.example2.output}\nExplanation: ${jsonFormattedProblemContent?.example2.explanation}`}
          />
          <ReusableParagraph
            content={jsonFormattedProblemContent}
            titleText="Example 3"
            paragraphContent={`Input: ${jsonFormattedProblemContent?.example3.input}\nOutput: ${jsonFormattedProblemContent?.example3.output}\nExplanation: ${jsonFormattedProblemContent?.example3.explanation}`}
          />
          <ReusableParagraph
            content={jsonFormattedProblemContent}
            titleText="Edge Case 1"
            paragraphContent={`Input: ${jsonFormattedProblemContent?.edgeCase1.input}\nOutput: ${jsonFormattedProblemContent?.edgeCase1.output}\nExplanation: ${jsonFormattedProblemContent?.edgeCase1.explanation}`}
          />
          <ReusableParagraph
            content={jsonFormattedProblemContent}
            titleText="Edge Case 2"
            paragraphContent={`Input: ${jsonFormattedProblemContent?.edgeCase2.input}\nOutput: ${jsonFormattedProblemContent?.edgeCase2.output}\nExplanation: ${jsonFormattedProblemContent?.edgeCase2.explanation}`}
          />
          <ReusableParagraph
            content={jsonFormattedProblemContent}
            titleText="Edge Case 3"
            paragraphContent={`Input: ${jsonFormattedProblemContent?.edgeCase3.input}\nOutput: ${jsonFormattedProblemContent?.edgeCase3.output}\nExplanation: ${jsonFormattedProblemContent?.edgeCase3.explanation}`}
          />
          {/* analysis */}
          <div className="mt-8">
            <ReusableParagraph
              content={jsonFormattedProblemContent}
              titleText="Analysis"
              paragraphContent={`Time Complexity: ${
                jsonFormattedProblemContent?.analysis.timeComplexity
              }\nSpace Complexity: ${jsonFormattedProblemContent?.analysis.spaceComplexity}\nEdge Cases: ${jsonFormattedProblemContent?.analysis.edgeCases}\nOther Consideration: ${jsonFormattedProblemContent?.analysis.otherConsiderations}`}
            />
          </div>
          {/* hints */}
          <div className="mt-8">
            <ReusableParagraph
              content={jsonFormattedProblemContent}
              titleText="Hints"
              paragraphContent={`${jsonFormattedProblemContent?.hints}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
