import { useAppContext } from "@/app/context/AppContext";
import React, { useMemo } from "react";
import Paragraph from "@/app/components/common/Paragraph";
import Loading from "@/app/components/loading/Loading";
import Image from "next/image";
import menuData from "@/app/config/config.json";
import clipboardCopy from "@/app/feature/clipboardCopy/clipboardCopy";

const ReviewSection: React.FC = () => {
  const { isApiLoading, isReviewCreating, reviewText, currentTheme } =
    useAppContext();

  const formattedReviewText = useMemo(() => {
    if (reviewText === null) return null;

    return [
      `Explanation of the algorithm:\n${reviewText.algorithmExplanation}\n\n`,
      `Clarity and specificity:\n${reviewText.clarity}\n\n`,
      `Efficiency: ${reviewText.efficiency}\n\n`,
      `Test coverage: ${reviewText.testCoverage}\n\n`,
      `Technical accuracy: ${reviewText.technicalAccuracy}\n\n`,
      `Improvement suggestions: ${reviewText.suggestionsImprovement}\n\n`,
      `Example improvement: ${reviewText.improvementExample}`,
    ].join("");
  }, [reviewText]);

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
          className={`flex w-[120px] items-center justify-between bg-gray-400 p-1 duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${isApiLoading || reviewText === null ? "cursor-not-allowed opacity-50" : ""} `}
          disabled={isApiLoading}
          onClick={() => clipboardCopy({ context: formattedReviewText })}
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
      <div
        id="result_scoring"
        className="flex flex-col gap-5 p-[15px_30px] leading-normal tracking-wider"
      >
        <Loading isCreating={isReviewCreating} text={"Now Creating"} />
        <Paragraph
          content={reviewText}
          titleText="Explanation of the algorithm:"
          paragraphContent={reviewText?.algorithmExplanation}
        />
        <Paragraph
          content={reviewText}
          titleText="Clarity and specificity:"
          paragraphContent={reviewText?.clarity}
        />
        <Paragraph
          content={reviewText}
          titleText="Efficiency:"
          paragraphContent={reviewText?.efficiency}
        />
        <Paragraph
          content={reviewText}
          titleText="Test coverage:"
          paragraphContent={reviewText?.testCoverage}
        />
        <Paragraph
          content={reviewText}
          titleText="Technical accuracy:"
          paragraphContent={reviewText?.technicalAccuracy}
        />
        <Paragraph
          content={reviewText}
          titleText="Improvement suggestions:"
          paragraphContent={reviewText?.suggestionsImprovement}
        />
        <Paragraph
          content={reviewText}
          titleText="Example improvement:"
          paragraphContent={reviewText?.improvementExample}
        />
      </div>
    </div>
  );
};

export default ReviewSection;
