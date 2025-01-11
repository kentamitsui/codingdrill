import React, { useEffect } from "react";
import { useAppContext } from "../../../context/AppContext";
import { ReusableProblemContentProps } from "../../../type/type";
import { LoadingAnimation } from "../../ui/loadingAnimation/LoadingAnimation";

// 受け取ったJSONデータをキー毎に割り振る
const ProblemSection: React.FC = () => {
  const {
    isDisabled,
    isCreateProblem,
    jsonFormattedProblemContent,
    formattedProblemContent,
    setFormattedProblemContent,
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
    if (!jsonFormattedProblemContent) {
      return;
    }

    // 問題文やフォーマットについて
    const description = `Description\n${jsonFormattedProblemContent.problemStatement}\n\n`;
    const functionSignature = `function Signature\n${jsonFormattedProblemContent.functionSignature}\n\n`;
    const size = `size: ${jsonFormattedProblemContent.constraints.size}\n\n`;
    const valueRange = `valueRange: ${jsonFormattedProblemContent.constraints.valueRange}\n\n`;
    const kRange = `kRange: ${jsonFormattedProblemContent.constraints.kRange}\n\n`;
    // 例題やエッジケース等について
    const example1 = `Example 1\nInput:\n${jsonFormattedProblemContent.example1?.input}\nOutput: ${jsonFormattedProblemContent.example1?.output}\nExplanation: ${jsonFormattedProblemContent.example1?.explanation}\n\n`;
    const example2 = `Example 2\nInput:\n${jsonFormattedProblemContent.example2?.input}\nOutput: ${jsonFormattedProblemContent.example2?.output}\nExplanation: ${jsonFormattedProblemContent.example2?.explanation}\n\n`;
    const example3 = `Example 3\nInput:\n${jsonFormattedProblemContent.example3?.input}\nOutput: ${jsonFormattedProblemContent.example3?.output}\nExplanation: ${jsonFormattedProblemContent.example3?.explanation}\n\n`;
    const edgeCase1 = `edgeCase 1\nInput:\n${jsonFormattedProblemContent.edgeCase1?.input}\nOutput: ${jsonFormattedProblemContent.edgeCase1?.output}\nExplanation: ${jsonFormattedProblemContent.edgeCase1?.explanation}\n\n`;
    const edgeCase2 = `edgeCase 2\nInput:\n${jsonFormattedProblemContent.edgeCase2?.input}\nOutput: ${jsonFormattedProblemContent.edgeCase2?.output}\nExplanation: ${jsonFormattedProblemContent.edgeCase2?.explanation}\n\n`;
    const edgeCase3 = `edgeCase 3\nInput:\n${jsonFormattedProblemContent.edgeCase3?.input}\nOutput: ${jsonFormattedProblemContent.edgeCase3?.output}\nExplanation: ${jsonFormattedProblemContent.edgeCase3?.explanation}\n\n`;
    // 要件等について
    const analysis = `Analysis\nTime Complexity: ${jsonFormattedProblemContent.analysis?.timeComplexity}\nSpace Complexity: ${jsonFormattedProblemContent.analysis?.spaceComplexity}\nEdge Cases: ${jsonFormattedProblemContent.analysis?.edgeCases}\nOther Consideration: ${jsonFormattedProblemContent.analysis?.otherConsiderations}\n\n`;
    // ヒントについて
    const hints = `Hints\n${jsonFormattedProblemContent.hints}`;

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
  }, [jsonFormattedProblemContent, setFormattedProblemContent]);

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
          className={`w-[120px] bg-gray-400 p-1 duration-300 dark:bg-slate-700 ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-gray-600"} dark:${isDisabled ? "" : "hover:bg-slate-500"}`}
          onClick={copyToClipboard}
          disabled={isDisabled}
        >
          copy
        </button>
      </div>
      <div className="p-[15px_30px] leading-normal tracking-wider">
        <LoadingAnimation isCreating={isCreateProblem} />
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
              paragraphContent={`Input:\n${jsonFormattedProblemContent?.example1?.input}\nOutput: ${jsonFormattedProblemContent?.example1?.output}\nExplanation: ${jsonFormattedProblemContent?.example1?.explanation}`}
            />
          </div>
          <ReusableParagraph
            content={jsonFormattedProblemContent}
            titleText="Example 2"
            paragraphContent={`Input:\n${jsonFormattedProblemContent?.example2?.input}\nOutput: ${jsonFormattedProblemContent?.example2?.output}\nExplanation: ${jsonFormattedProblemContent?.example2?.explanation}`}
          />
          <ReusableParagraph
            content={jsonFormattedProblemContent}
            titleText="Example 3"
            paragraphContent={`Input:\n${jsonFormattedProblemContent?.example3?.input}\nOutput: ${jsonFormattedProblemContent?.example3?.output}\nExplanation: ${jsonFormattedProblemContent?.example3?.explanation}`}
          />
          <ReusableParagraph
            content={jsonFormattedProblemContent}
            titleText="Edge Case 1"
            paragraphContent={`Input:\n${jsonFormattedProblemContent?.edgeCase1?.input}\nOutput: ${jsonFormattedProblemContent?.edgeCase1?.output}\nExplanation: ${jsonFormattedProblemContent?.edgeCase1?.explanation}`}
          />
          <ReusableParagraph
            content={jsonFormattedProblemContent}
            titleText="Edge Case 2"
            paragraphContent={`Input:\n${jsonFormattedProblemContent?.edgeCase2?.input}\nOutput: ${jsonFormattedProblemContent?.edgeCase2?.output}\nExplanation: ${jsonFormattedProblemContent?.edgeCase2?.explanation}`}
          />
          <ReusableParagraph
            content={jsonFormattedProblemContent}
            titleText="Edge Case 3"
            paragraphContent={`Input:\n${jsonFormattedProblemContent?.edgeCase3?.input}\nOutput: ${jsonFormattedProblemContent?.edgeCase3?.output}\nExplanation: ${jsonFormattedProblemContent?.edgeCase3?.explanation}`}
          />
          {/* analysis */}
          <div className="mt-8">
            <ReusableParagraph
              content={jsonFormattedProblemContent}
              titleText="Analysis"
              paragraphContent={`Time Complexity: ${
                jsonFormattedProblemContent?.analysis?.timeComplexity
              }\nSpace Complexity: ${jsonFormattedProblemContent?.analysis?.spaceComplexity}\nEdge Cases: ${jsonFormattedProblemContent?.analysis?.edgeCases}\nOther Consideration: ${jsonFormattedProblemContent?.analysis?.otherConsiderations}`}
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
