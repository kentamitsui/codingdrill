import { useAppContext } from "../feature/localStorage/AppContext";
import { ReviewProps } from "../type/type";

export const ReviewSection: React.FC<ReviewProps> = ({ getIsDisabledData }) => {
  const { reviewContent } = useAppContext();

  console.log(reviewContent);

  const copyToClipboard = () => {
    const explanationOfTheAlgorithm = reviewContent
      ? `explanation of the algorithm:\n${reviewContent.generalEvaluation.explanationOfTheAlgorithm}\n\n`
      : "";
    const clarityAndSpecificity = reviewContent
      ? `clarity and specificity:\n${reviewContent.generalEvaluation.clarityAndSpecificity}\n\n`
      : "";
    const originalityAndApplicability = reviewContent
      ? `originality and applicability: ${reviewContent.generalEvaluation.originalityAndApplicability}\n\n`
      : "";
    const diversityAndComplexity = reviewContent
      ? `diversity and complexity: ${reviewContent.generalEvaluation.diversityAndComplexity}\n\n`
      : "";
    const technicalRequirements = reviewContent
      ? `technical requirements: ${reviewContent.generalEvaluation.technicalRequirements}\n\n`
      : "";
    const evaluationCriteria = reviewContent
      ? `evaluation criteria: ${reviewContent.generalEvaluation.evaluationCriteria}`
      : "";

    const formattedReviewContent =
      explanationOfTheAlgorithm +
      clarityAndSpecificity +
      originalityAndApplicability +
      diversityAndComplexity +
      technicalRequirements +
      evaluationCriteria;

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
          {reviewContent
            ? "explanation of the algorithm:\n" +
              reviewContent.generalEvaluation.explanationOfTheAlgorithm
            : null}
        </div>
        <div id="clarity-and-specificity" className="leading-normal">
          {reviewContent
            ? "clarity and specificity:\n" +
              reviewContent.generalEvaluation.clarityAndSpecificity
            : null}
        </div>
        <div id="originality-and-applicability" className="leading-normal">
          {reviewContent
            ? "originality and applicability:\n" +
              reviewContent.generalEvaluation.originalityAndApplicability
            : null}
        </div>
        <div id="diversity-and-complexity" className="leading-normal">
          {reviewContent
            ? "diversity and complexity:\n" +
              reviewContent.generalEvaluation.diversityAndComplexity
            : null}
        </div>
        <div id="technical-requirements" className="leading-normal">
          {reviewContent
            ? "technical requirement:\n" +
              reviewContent.generalEvaluation.technicalRequirements
            : null}
        </div>
        <div id="evaluation-criteria" className="leading-normal">
          {reviewContent
            ? "evaluation criteria:\n" +
              reviewContent.generalEvaluation.evaluationCriteria
            : null}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
