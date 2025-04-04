import React from "react";
import { QuestionParagraphProps, ReviewParagraphProps } from "@/app/type/type";

const Paragraph: React.FC<QuestionParagraphProps | ReviewParagraphProps> = ({
  content,
  titleText,
  paragraphContent,
}) => {
  // テキストを2行ずつに分割する関数
  const lineBreaks = (text: string, lineSizes: number = 2): string[] => {
    // 日本語では"。 "が文末にあり、それ以外の言語では". "が文末にある事を想定
    const delimiter = text.includes("。") ? "。" : ". ";
    // delimiterの定義に従って、句点でテキストを分割
    const lineSplits = text.split(delimiter);
    const lines = [];

    // 各文章を2つずつで一塊に加工し、linesに格納する
    for (let i = 0; i < lineSplits.length; i += lineSizes) {
      // sliceでlinesにpushする内容を上書きする
      const currentLines = lineSplits.slice(i, i + lineSizes);
      // 最終行かどうか確認する
      const isLastLines = i + lineSizes >= lineSplits.length;
      // 最終行以外の場合、かつ偶数行であればdelimiter.trim()を実行
      const extraPeriod =
        !isLastLines && currentLines.length === lineSizes
          ? delimiter.trim()
          : "";
      // delimiterを区切り文字として連結した文字列を返し、extraPeriod(句点)を文末に加える。
      const pushLines = currentLines.join(delimiter) + extraPeriod;
      lines.push(pushLines);
    }
    return lines;
  };

  return (
    <div className="whitespace-break-spaces">
      {/* タイトル */}
      <p className="text-[20px] font-medium width_1440px:text-[22px] width_1680px:text-[24px]">
        {content ? titleText : null}
      </p>
      {/* 複数行対応の本文 */}
      <div className="ml-4 text-[16px] font-normal width_1440px:ml-5 width_1440px:text-[18px] width_1680px:ml-[22px] width_1680px:text-[20px]">
        {content &&
          paragraphContent &&
          lineBreaks(paragraphContent).map((line, index) => (
            <p key={index}>{line}</p>
          ))}
      </div>
    </div>
  );
};

export default Paragraph;
