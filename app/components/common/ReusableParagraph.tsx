import { ReusableProblemContentProps } from "@/app/type/type";

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

export default ReusableParagraph;
