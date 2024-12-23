import { useAppContext } from "./AppContext";
import React from "react";
import { ReusableReviewContentsProps } from "../type/type";

export const ReviewSection: React.FC = () => {
  const { isDisabled, isCreateReview, jsonFormattedReviewContent } =
    useAppContext();

  const ReusableParagraph: React.FC<ReusableReviewContentsProps> = ({
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
        <div className="ml-4 whitespace-break-spaces text-[16px] font-normal width_1440px:ml-5 width_1440px:text-[18px] width_1680px:ml-[22px] width_1680px:text-[20px]">
          {content &&
            splitLines(paragraphContent || "").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
        </div>
      </div>
    );
  };

  const copyToClipboard = () => {
    const algorithmExplanation = jsonFormattedReviewContent
      ? `Explanation of the algorithm:\n${jsonFormattedReviewContent.evaluation.algorithmExplanation}\n\n`
      : "";
    const clarity = jsonFormattedReviewContent
      ? `Clarity and specificity:\n${jsonFormattedReviewContent.evaluation.clarity}\n\n`
      : "";
    const efficiency = jsonFormattedReviewContent
      ? `Efficiency: ${jsonFormattedReviewContent.evaluation.efficiency}\n\n`
      : "";
    const testCoverage = jsonFormattedReviewContent
      ? `Test coverage: ${jsonFormattedReviewContent.evaluation.testCoverage}\n\n`
      : "";
    const technicalAccuracy = jsonFormattedReviewContent
      ? `Technical accuracy: ${jsonFormattedReviewContent.evaluation.technicalAccuracy}\n\n`
      : "";
    const improvementSuggestions = jsonFormattedReviewContent
      ? `Improvement suggestions: ${jsonFormattedReviewContent.evaluation.improvementSuggestions}\n\n`
      : "";
    const exampleImprovement = jsonFormattedReviewContent
      ? `Example improvement: ${jsonFormattedReviewContent.evaluation.exampleImprovement}`
      : "";

    const formattedReviewContent =
      algorithmExplanation +
      clarity +
      efficiency +
      testCoverage +
      technicalAccuracy +
      improvementSuggestions +
      exampleImprovement;

    navigator.clipboard
      .writeText(formattedReviewContent)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy text.");
      });
  };

  // レビュー作成中のローディングアニメーション
  const loadingAnimation =
    isCreateReview === true ? (
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
    <div
      id="split-vertical-right"
      className="h-full overflow-y-scroll rounded-b-md bg-gray-200 dark:bg-[#0d1117]"
    >
      <div className="sticky top-0 z-[1] flex flex-row justify-between border-b-2 border-gray-50 bg-gray-200 text-[1rem] font-bold dark:border-[#1e1e1e] dark:bg-[#0d1117]">
        <div id="reviewDisplayArea-title" className="p-[4px_4px_4px_30px]">
          Review
        </div>
        <button
          id="button-Copy-ReviewArea"
          className={`w-[120px] bg-gray-400 p-1 duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${isDisabled === true ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={isDisabled}
          onClick={copyToClipboard}
        >
          copy
        </button>
      </div>
      <div
        id="result_scoring"
        className="flex flex-col gap-5 p-[15px_30px] leading-normal tracking-wider"
      >
        {loadingAnimation}
        <ReusableParagraph
          content={jsonFormattedReviewContent}
          titleText="Explanation of the algorithm:"
          paragraphContent={
            jsonFormattedReviewContent?.evaluation.algorithmExplanation
          }
        />
        <ReusableParagraph
          content={jsonFormattedReviewContent}
          titleText="Clarity and specificity:"
          paragraphContent={jsonFormattedReviewContent?.evaluation.clarity}
        />
        <ReusableParagraph
          content={jsonFormattedReviewContent}
          titleText="Efficiency:"
          paragraphContent={jsonFormattedReviewContent?.evaluation.efficiency}
        />
        <ReusableParagraph
          content={jsonFormattedReviewContent}
          titleText="Test coverage:"
          paragraphContent={jsonFormattedReviewContent?.evaluation.testCoverage}
        />
        <ReusableParagraph
          content={jsonFormattedReviewContent}
          titleText="Technical accuracy:"
          paragraphContent={
            jsonFormattedReviewContent?.evaluation.technicalAccuracy
          }
        />
        <ReusableParagraph
          content={jsonFormattedReviewContent}
          titleText="Improvement suggestions:"
          paragraphContent={
            jsonFormattedReviewContent?.evaluation.improvementSuggestions
          }
        />
        <ReusableParagraph
          content={jsonFormattedReviewContent}
          titleText="Example improvement:"
          paragraphContent={
            jsonFormattedReviewContent?.evaluation.exampleImprovement
          }
        />
      </div>
    </div>
  );
};

export default ReviewSection;
