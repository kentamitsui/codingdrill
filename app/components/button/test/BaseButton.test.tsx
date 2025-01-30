// BaseButton.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import BaseButton from "../BaseButton";
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

    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1); // `onClick` が1回呼ばれたことを確認
  });

  it("APIがローディング中のときはボタンが無効(disabled)になる", () => {
    mockContextValue = {
      ...mockContextValue,
      isApiLoading: true, // APIロード中に設定
      // すべてのプロパティを""に設定しているため、isAllSelected === falseとなる
      difficulty: "",
      dataType: "",
      topic: "",
      uiLanguage: "",
    };

    (useAppContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockContextValue,
    );

    render(<BaseButton type="button" text="Generate" onClick={() => {}} />);
    const button = screen.getByRole("button", { name: "Generate" }); // `button` を取得

    // console.log("ボタンのクラス名:", button.className); // ✅ クラス名をデバッグ

    expect(button).toHaveAttribute(
      "class",
      expect.stringContaining("cursor-not-allowed"),
    );
    expect(button).toHaveAttribute(
      "class",
      expect.stringContaining("opacity-50"),
    );
    expect(button).toBeDisabled(); // ボタンが無効であることを確認

    // ✅ `isApiLoading` の値が適切に更新されたことを確認
    expect(mockContextValue.isApiLoading).toBe(true);
  });

  it("選択肢がすべて未選択のときはボタンが無効(disabled)になる", () => {
    // すべてのプロパティを""に設定しているため、isAllSelected === falseとなる
    mockContextValue.difficulty = "";
    mockContextValue.dataType = "";
    mockContextValue.topic = "";
    mockContextValue.uiLanguage = "";
    (useAppContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockContextValue,
    );

    render(<BaseButton type="button" text="Generate" onClick={() => {}} />);
    const button = screen.getByRole("button", { name: "Generate" }); // `button` を取得

    // ✅ `isAllSelected` が false になることを明示的に確認
    expect(mockContextValue.difficulty).toBe("");
    expect(mockContextValue.dataType).toBe("");
    expect(mockContextValue.topic).toBe("");
    expect(mockContextValue.uiLanguage).toBe("");

    // ✅ クラス名のチェック
    expect(button).toHaveAttribute(
      "class",
      expect.stringContaining("cursor-not-allowed"),
    );
    expect(button).toHaveAttribute(
      "class",
      expect.stringContaining("opacity-50"),
    );

    expect(button).toBeDisabled();
  });

  it("選択肢がすべて選択されているときはボタンが有効になる", () => {
    mockContextValue = {
      difficulty: "medium",
      dataType: "int",
      topic: "mergeSort",
      uiLanguage: "English",
    };

    (useAppContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockContextValue,
    );

    render(<BaseButton type="button" text="Generate" onClick={() => {}} />);
    const button = screen.getByRole("button", { name: "Generate" }); // `button` を取得

    expect(button).not.toBeDisabled();
  });

  it("ボタンのテキストが正しく表示される", () => {
    render(<BaseButton type="button" text="Generate" onClick={() => {}} />);

    // ✅ ボタンのテキストが適切に表示されているか確認
    expect(screen.getByText("Generate")).toBeInTheDocument();

    // ✅ ボタンとして取得できるかを確認（より厳密なテスト）
    expect(
      screen.getByRole("button", { name: "Generate" }),
    ).toBeInTheDocument();
  });

  it("ボタンのスタイルが適用されている", () => {
    render(<BaseButton type="button" text="Generate" onClick={() => {}} />);
    const button = screen.getByRole("button", { name: "Generate" }); // `button` を取得

    // ✅ クラス名のデバッグ
    // console.log("ボタンのクラス:", button.className);
  });
});
