import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/app/components/footer/Footer";
import { describe, test, expect } from "vitest";

// クラス名を調整したら、併せてテストケースも変更
describe("Footer Component", () => {
  test("renders the footer with the correct current year and company text", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    // 正規表現で現在の年とテキストの一部を含むかを確認
    const footerText = screen.getByText(
      new RegExp(
        `©\\s*${currentYear}\\s*CodingDrill\\. All rights reserved\\. Powered by`,
        "i",
      ),
    );
    expect(footerText).toBeInTheDocument();
  });

  test("renders a link to OpenAI with correct attributes", () => {
    render(<Footer />);
    // 「OpenAI ChatGPT API」というテキストのリンク要素を取得
    const linkElement = screen.getByRole("link", {
      name: /OpenAI ChatGPT API/i,
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "https://openai.com/");
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("footer element has the expected class names", () => {
    // <footer> 要素は、通常 role="contentinfo" を持ちます
    render(<Footer />);
    const footerElement = screen.getByRole("contentinfo");
    // Footer.tsx のクラス名は "bg:opacity-0 text-center text-xs" となっているので、それをチェック
    expect(footerElement).toHaveClass("bg:opacity-0");
    expect(footerElement).toHaveClass("text-center");
    expect(footerElement).toHaveClass("text-xs");
  });
});
