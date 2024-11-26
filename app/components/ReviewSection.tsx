import { ReviewProps } from "../type/type";

export const ReviewSection: React.FC<ReviewProps> = ({
  setResponseReviewData,
  getIsDisabledData,
}) => {
  const copyToClipboard = () => {
    const clarityAndSpecificity = setResponseReviewData
      ? `clarity and specificity:\n${setResponseReviewData.generalEvaluation.clarityAndSpecificity}\n\n`
      : "";
    const originalityAndApplicability = setResponseReviewData
      ? `originality and applicability: ${setResponseReviewData.generalEvaluation.originalityAndApplicability}\n\n`
      : "";
    const diversityAndComplexity = setResponseReviewData
      ? `diversity and complexity: ${setResponseReviewData.generalEvaluation.diversityAndComplexity}\n\n`
      : "";
    const technicalRequirements = setResponseReviewData
      ? `technical requirements: ${setResponseReviewData.generalEvaluation.technicalRequirements}\n\n`
      : "";
    const evaluationCriteria = setResponseReviewData
      ? `evaluation criteria: ${setResponseReviewData.generalEvaluation.evaluationCriteria}`
      : "";

    const fullText =
      clarityAndSpecificity +
      originalityAndApplicability +
      diversityAndComplexity +
      technicalRequirements +
      evaluationCriteria;

    navigator.clipboard
      .writeText(fullText)
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
          className={`w-[120px] bg-gray-400 p-1 duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${getIsDisabledData === true ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={getIsDisabledData}
          onClick={copyToClipboard}
        >
          copy
        </button>
      </div>
      <div
        id="result_scoring"
        className="flex flex-col gap-5 whitespace-break-spaces p-[15px_30px] text-[18px] font-medium width_1440px:text-[19px] width_1680px:text-[20px]"
      >
        <div id="clarity-and-specificity" className="leading-normal">
          {setResponseReviewData
            ? "clarity and specificity:\n" +
              setResponseReviewData.generalEvaluation.clarityAndSpecificity
            : null}
        </div>
        <div id="originality-and-applicability" className="leading-normal">
          {setResponseReviewData
            ? "originality and applicability:\n" +
              setResponseReviewData.generalEvaluation
                .originalityAndApplicability
            : null}
        </div>
        <div id="diversity-and-complexity" className="leading-normal">
          {setResponseReviewData
            ? "diversity and complexity:\n" +
              setResponseReviewData.generalEvaluation.diversityAndComplexity
            : null}
        </div>
        <div id="technical-requirements" className="leading-normal">
          {setResponseReviewData
            ? "technical requirement:\n" +
              setResponseReviewData.generalEvaluation.technicalRequirements
            : null}
        </div>
        <div id="evaluation-criteria" className="leading-normal">
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
