import { useAppContext } from "./AppContext";
import React from "react";
import { ReusableReviewContentsProps } from "../type/type";
import { LoadingAnimation } from "./LoadingAnimation";

export const ReviewSection: React.FC = () => {
  const { isDisabled, isCreateReview, jsonFormattedReviewContent } =
    useAppContext();

  const ReusableParagraph: React.FC<ReusableReviewContentsProps> = ({
    content,
    titleText,
    paragraphContent,
  }) => {
    return (
      <div>
        {/* タイトル */}
        <p className="text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
          {content ? titleText : null}
        </p>
        {/* 複数行対応の本文 */}
        <div className="ml-4 whitespace-break-spaces text-[16px] font-normal width_1440px:ml-5 width_1440px:text-[18px] width_1680px:ml-[22px] width_1680px:text-[20px]">
          {content &&
            [paragraphContent].map((line, index) => <p key={index}>{line}</p>)}
        </div>
      </div>
    );
  };

  const copyToClipboard = () => {
    if (!jsonFormattedReviewContent) {
      alert("No review content to copy.");
      return;
    }

    const algorithmExplanation = `Explanation of the algorithm:\n${jsonFormattedReviewContent.algorithmExplanation}\n\n`;
    const clarity = `Clarity and specificity:\n${jsonFormattedReviewContent.clarity}\n\n`;
    const efficiency = `Efficiency: ${jsonFormattedReviewContent.efficiency}\n\n`;
    const testCoverage = `Test coverage: ${jsonFormattedReviewContent.testCoverage}\n\n`;
    const technicalAccuracy = `Technical accuracy: ${jsonFormattedReviewContent.technicalAccuracy}\n\n`;
    const suggestionsImprovement = `Improvement suggestions: ${jsonFormattedReviewContent.suggestionsImprovement}\n\n`;
    const improvementExample = `Example improvement: ${jsonFormattedReviewContent.improvementExample}`;

    const formattedReviewContent =
      algorithmExplanation +
      clarity +
      efficiency +
      testCoverage +
      technicalAccuracy +
      suggestionsImprovement +
      improvementExample;

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
          className={`w-[120px] bg-gray-400 p-1 duration-300 ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-gray-600"} dark:bg-slate-700 dark:${isDisabled ? "" : "hover:bg-slate-500"}`}
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
        <LoadingAnimation isCreating={isCreateReview} />
        <ReusableParagraph
          content={jsonFormattedReviewContent}
          titleText="Explanation of the algorithm:"
          paragraphContent={jsonFormattedReviewContent?.algorithmExplanation}
        />
        <ReusableParagraph
          content={jsonFormattedReviewContent}
          titleText="Clarity and specificity:"
          paragraphContent={jsonFormattedReviewContent?.clarity}
        />
        <ReusableParagraph
          content={jsonFormattedReviewContent}
          titleText="Efficiency:"
          paragraphContent={jsonFormattedReviewContent?.efficiency}
        />
        <ReusableParagraph
          content={jsonFormattedReviewContent}
          titleText="Test coverage:"
          paragraphContent={jsonFormattedReviewContent?.testCoverage}
        />
        <ReusableParagraph
          content={jsonFormattedReviewContent}
          titleText="Technical accuracy:"
          paragraphContent={jsonFormattedReviewContent?.technicalAccuracy}
        />
        <ReusableParagraph
          content={jsonFormattedReviewContent}
          titleText="Improvement suggestions:"
          paragraphContent={jsonFormattedReviewContent?.suggestionsImprovement}
        />
        <ReusableParagraph
          content={jsonFormattedReviewContent}
          titleText="Example improvement:"
          paragraphContent={jsonFormattedReviewContent?.improvementExample}
        />
      </div>
    </div>
  );
};

export default ReviewSection;
