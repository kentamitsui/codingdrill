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

  // 最終行が奇数の場合
  it("本文が複数行に分割されて表示される", () => {
    const props: QuestionParagraphProps = {
      content: dummyQuestionText,
      titleText: "レビュータイトル",
      paragraphContent: "1行目。2行目。3行目。",
    };

    render(<Paragraph {...props} />);

    // 各行が個別の <p> タグとしてレンダリングされているか確認
    expect(screen.getByText("1行目。2行目。")).toBeInTheDocument();
    expect(screen.getByText("3行目。")).toBeInTheDocument();
  });

  // 最終行が奇数の場合
  it("英語の文章が複数行に分割されて表示される", () => {
    const props: QuestionParagraphProps = {
      content: dummyQuestionText,
      titleText: "English Test",
      paragraphContent: "This is line 1. This is line 2. This is line 3.",
    };

    render(<Paragraph {...props} />);

    expect(
      screen.getByText("This is line 1. This is line 2."),
    ).toBeInTheDocument();
    expect(screen.getByText("This is line 3.")).toBeInTheDocument();
  });

  // 最終行が偶数の場合
  it("本文が複数行に分割されて表示され、最終行が偶数である", () => {
    const props: QuestionParagraphProps = {
      content: dummyQuestionText,
      titleText: "レビュータイトル",
      paragraphContent: "1行目。2行目。3行目。4行目。",
    };

    render(<Paragraph {...props} />);

    // 各行が個別の <p> タグとしてレンダリングされているか確認
    expect(screen.getByText("1行目。2行目。")).toBeInTheDocument();
    expect(screen.getByText("3行目。4行目。")).toBeInTheDocument();
  });

  // 最終行が奇数の場合
  it("英語の文章が複数行に分割されて表示され、最終行が偶数である", () => {
    const props: QuestionParagraphProps = {
      content: dummyQuestionText,
      titleText: "English Test",
      paragraphContent:
        "This is line 1. This is line 2. This is line 3. This is line 4.",
    };

    render(<Paragraph {...props} />);

    expect(
      screen.getByText("This is line 1. This is line 2."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("This is line 3. This is line 4."),
    ).toBeInTheDocument();
  });
});
