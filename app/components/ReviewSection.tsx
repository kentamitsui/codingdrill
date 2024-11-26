import { ReviewProps } from "../type/type";

export const ReviewSection: React.FC<ReviewProps> = ({
  setResponseReviewData,
  getIsDisabledData,
}) => {
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
          className={`w-[120px] bg-gray-400 p-1 duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${getIsDisabledData === true ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={getIsDisabledData}
        >
          copy
        </button>
      </div>
      <div
        id="result_scoring"
        className="flex flex-col whitespace-break-spaces p-[15px_30px] text-[18px] font-medium width_1440px:text-[19px] width_1680px:text-[20px]"
      >
        {/* <div id="code-executetime-memoryconsumption">
          {setResponseReviewData
            ? "code executetime memoryconsumption\n" +
              setResponseReviewData.clarity_and_specificity
            : null}
        </div> */}
        <div id="clarity-and-specificity">
          {setResponseReviewData
            ? "clarity and specificity:\n" +
              setResponseReviewData.generalEvaluation.clarityAndSpecificity
            : null}
        </div>
        <div id="originality-and-applicability" className="mt-5">
          {setResponseReviewData
            ? "originality and applicability:\n" +
              setResponseReviewData.generalEvaluation
                .originalityAndApplicability
            : null}
        </div>
        <div id="diversity-and-complexity" className="mt-5">
          {setResponseReviewData
            ? "diversity and complexity:\n" +
              setResponseReviewData.generalEvaluation.diversityAndComplexity
            : null}
        </div>
        <div id="technical-requirements" className="mt-5">
          {setResponseReviewData
            ? "technical requirement:\n" +
              setResponseReviewData.generalEvaluation.technicalRequirements
            : null}
        </div>
        <div id="evaluation-criteria" className="mt-5">
          {setResponseReviewData
            ? "evaluation criteria:\n" +
              setResponseReviewData.generalEvaluation.evaluationCriteria
            : null}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
