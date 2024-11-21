export default function ReviewSection({ setResponseReviewData }) {
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
          className="w-[120px] bg-gray-400 p-1 duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
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
            ? "clarity-and-specificity\n" +
              setResponseReviewData.general_evaluation.clarity_and_specificity
            : null}
        </div>
        <div id="originality-and-applicability" className="mt-5">
          {setResponseReviewData
            ? "originality-and-applicability\n" +
              setResponseReviewData.general_evaluation
                .originality_and_applicability
            : null}
        </div>
        <div id="diversity-and-complexity" className="mt-5">
          {setResponseReviewData
            ? "diversity-and-complexity\n" +
              setResponseReviewData.general_evaluation.diversity_and_complexity
            : null}
        </div>
        <div id="technical-requirements" className="mt-5">
          {setResponseReviewData
            ? "technical-requirement\n" +
              setResponseReviewData.general_evaluation.technical_requirements
            : null}
        </div>
        <div id="evaluation-criteria" className="mt-5">
          {setResponseReviewData
            ? "evaluation-criteria\n" +
              setResponseReviewData.general_evaluation.evaluation_criteria
            : null}
        </div>
      </div>
    </div>
  );
}
