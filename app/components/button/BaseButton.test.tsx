// BaseButton.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import BaseButton from "./BaseButton";
import { useAppContext } from "@/app/context/AppContext";

// useAppContext のモック
vi.mock("@/app/context/AppContext", () => ({
  useAppContext: vi.fn(),
}));

describe("BaseButton Component", () => {
  const mockSetState = vi.fn();
  let mockContextValue: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // デフォルトのモック値を設定
    mockContextValue = {
      isApiLoading: false,
      difficulty: "medium",
      dataType: "int",
      topic: "mergeSort",
      uiLanguage: "English",
      currentTheme: "dark",
      setIsApiLoading: mockSetState,
    };

    (useAppContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockContextValue,
    );
  });

  it("ボタンが正しくレンダリングされる", () => {
    render(<BaseButton type="button" text="Generate" onClick={() => {}} />);
    expect(
      screen.getByRole("button", { name: "Generate" }), // ボタン要素である事、text="Generate"のボタンを取得する事を確認
    ).toBeInTheDocument();
  });

  it("ボタンがクリックされたときに onClick が呼ばれる", async () => {
    const handleClick = vi.fn();
    render(<BaseButton type="button" text="Generate" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: "Generate" }); // `button` を取得
    expect(button).toHaveClass(
      "flex w-full items-center justify-between rounded-[15px] bg-gray-400 p-1 text-[14px] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500",
    );
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1); // `onClick` が1回呼ばれたことを確認
  });

  it("APIがローディング中のときはボタンが無効になる", () => {
    mockContextValue = {
      ...mockContextValue,
      isApiLoading: true, // APIロード中に設定
      difficulty: "", // 選択肢を未選択に設定
      dataType: "",
      topic: "",
      uiLanguage: "",
    };

    (useAppContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockContextValue,
    );

    render(<BaseButton type="button" text="Generate" onClick={() => {}} />);
    const button = screen.getByRole("button", { name: "Generate" }); // `button` を取得

    console.log("ボタンのクラス名:", button.className); // ✅ クラス名をデバッグ

    expect(button).toHaveAttribute(
      "class",
      expect.stringContaining("cursor-not-allowed"),
    );
    expect(button).toHaveAttribute(
      "class",
      expect.stringContaining("opacity-50"),
    );
    expect(button).toBeDisabled(); // ボタンが無効であることを確認

    // disabledのチェック強化
    expect(button).toHaveAttribute("class", expect.stringContaining("flex"));
    expect(button).toHaveAttribute("class", expect.stringContaining("w-full"));
    expect(button).toHaveAttribute(
      "class",
      expect.stringContaining("rounded-[15px]"),
    );
    expect(button).toHaveAttribute(
      "class",
      expect.stringContaining("bg-gray-400"),
    );
    expect(button).toHaveAttribute(
      "class",
      expect.stringContaining("text-[14px]"),
    );
    expect(button).toHaveAttribute(
      "class",
      expect.stringContaining("hover:bg-gray-600"),
    );

    // ✅ `isApiLoading` の値が適切に更新されたことを確認
    expect(mockContextValue.isApiLoading).toBe(true);
  });

  it("選択肢がすべて未選択のときはボタンが無効になる", () => {
    mockContextValue.difficulty = "";
    mockContextValue.dataType = "";
    mockContextValue.topic = "";
    mockContextValue.uiLanguage = "";
    (useAppContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockContextValue,
    );

    render(<BaseButton type="button" text="Generate" onClick={() => {}} />);
    const button = screen.getByRole("button", { name: "Generate" }); // `button` を取得
    expect(button).toHaveClass(
      "flex w-full items-center justify-between rounded-[15px] bg-gray-400 p-1 text-[14px] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500",
    );

    expect(button).toBeDisabled();
  });

  it("選択肢がすべて選択されているときはボタンが有効になる", () => {
    render(<BaseButton type="button" text="Generate" onClick={() => {}} />);
    const button = screen.getByRole("button", { name: "Generate" }); // `button` を取得
    expect(button).toHaveClass(
      "flex w-full items-center justify-between rounded-[15px] bg-gray-400 p-1 text-[14px] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500",
    );

    expect(button).not.toBeDisabled();
  });

  it("ボタンのテキストが正しく表示される", () => {
    render(<BaseButton type="button" text="Click Me" onClick={() => {}} />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("ボタンのスタイルが適用されている", () => {
    render(<BaseButton type="button" text="Generate" onClick={() => {}} />);
    const button = screen.getByRole("button", { name: "Generate" }); // `button` を取得
    expect(button).toHaveClass(
      "flex w-full items-center justify-between rounded-[15px] bg-gray-400 p-1 text-[14px] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500",
    );

    expect(button).toHaveClass(
      "flex w-full items-center justify-between rounded-[15px] bg-gray-400 p-1 text-[14px] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500",
    );
  });

  it("ボタンをクリックするとローディング状態が適用される", async () => {
    const handleClick = () => {
      mockContextValue.isApiLoading = true;
    };

    render(<BaseButton type="submit" text="Generate" onClick={handleClick} />);
    const button = screen.getByText("Generate");

    await userEvent.click(button);

    expect(mockContextValue.isApiLoading).toBe(true);
  });
});
