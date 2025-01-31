import React from "react";
import { render, screen } from "@testing-library/react";
import Paragraph from "@/app/components/common/Paragraph";
import {
  QuestionParagraphProps,
  ReviewParagraphProps,
  QuestionTextProps,
} from "@/app/type/type";
import { describe, it, expect } from "vitest";

const dummyQuestionText: QuestionTextProps = {
  problemStatement: "ダミーの問題文",
  functionSignature: "関数のシグネチャ",
  constraints: {
    size: "1 ≤ n ≤ 100",
    valueRange: "-10^9 ≤ ai ≤ 10^9",
    kRange: "1 ≤ k ≤ n",
  },
  example1: { input: "1 2", output: "3", explanation: "加算の例" },
  example2: { input: "2 3", output: "5", explanation: "加算の例" },
  example3: { input: "5 5", output: "10", explanation: "加算の例" },
  edgeCase1: { input: "0 0", output: "0", explanation: "ゼロの例" },
  edgeCase2: { input: "-1 -1", output: "-2", explanation: "負の数の例" },
  edgeCase3: { input: "100 100", output: "200", explanation: "最大値の例" },
  analysis: {
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    edgeCases: "負の数、ゼロ、大きな数",
    otherConsiderations: "特になし",
  },
  hints: "加算を実行するだけ",
};

describe("Paragraph Component", () => {
  it("タイトルが表示される (content が true の場合)", () => {
    const props: QuestionParagraphProps = {
      content: dummyQuestionText,
      titleText: "テストタイトル",
      paragraphContent: "これはテストの本文です。",
    };

    render(<Paragraph {...props} />);
    expect(screen.getByText("テストタイトル")).toBeInTheDocument();
  });

  it("タイトルが表示されない (content が false の場合)", () => {
    const props: QuestionParagraphProps = {
      content: null,
      titleText: "表示されないタイトル",
      paragraphContent: "これはテストの本文です。",
    };

    render(<Paragraph {...props} />);
    expect(screen.queryByText("表示されないタイトル")).not.toBeInTheDocument();
  });

  it("本文が表示される", () => {
    const props: QuestionParagraphProps = {
      content: dummyQuestionText,
      titleText: "レビュータイトル",
      paragraphContent: "これはレビューの本文です。",
    };

    render(<Paragraph {...props} />);
    expect(screen.getByText("これはレビューの本文です。")).toBeInTheDocument();
  });

  // it("本文が複数行対応で表示される", () => {
  //   const props: QuestionParagraphProps = {
  //     content: dummyQuestionText,
  //     titleText: "レビュータイトル",
  //     paragraphContent: "1行目\n2行目\n3行目",
  //   };

  //   render(<Paragraph {...props} />);

  //   expect(screen.getByText("1行目")).toBeInTheDocument();
  //   expect(screen.getByText("2行目")).toBeInTheDocument();
  //   expect(screen.getByText("3行目")).toBeInTheDocument();
  // });
});
