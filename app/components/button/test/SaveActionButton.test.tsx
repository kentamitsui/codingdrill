// SaveActionButton.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import SaveActionButton from "../SaveActionButton";
import { useAppContext } from "@/app/context/AppContext";

// useAppContext のモック
vi.mock("@/app/context/AppContext", () => ({
  useAppContext: vi.fn(),
}));

describe("SaveActionButton Component", () => {
  const mockSetState = vi.fn();
  let mockContextValue: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // デフォルトのモック値を設定
    mockContextValue = {
      isApiLoading: false,
      currentTheme: "dark",
      setIsApiLoading: mockSetState,
    };

    (useAppContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockContextValue,
    );
  });

  it.each([["Load"], ["Delete"], ["All Delete"]])(
    "ボタンが正しくレンダリングされる (text=%s)",
    (text) => {
      render(<SaveActionButton type="button" text={text} onClick={() => {}} />);
      expect(
        screen.getByRole("button", { name: text }), // ボタン要素である事、text="Generate"のボタンを取得する事を確認
      ).toBeInTheDocument();
    },
  );

  it.each([["Load"], ["Delete"], ["All Delete"]])(
    "ボタンがクリックされたときに onClick が呼ばれる (text=%s)",
    async (text) => {
      const handleClick = vi.fn();
      render(
        <SaveActionButton type="button" text={text} onClick={handleClick} />,
      );

      const button = screen.getByRole("button", { name: text }); // `button` を取得

      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1); // `onClick` が1回呼ばれたことを確認
    },
  );

  it.each([["Load"], ["Delete"], ["All Delete"]])(
    "APIがローディング中のときはボタンが無効(disabled)になる (text=%s)",
    (text) => {
      mockContextValue = {
        ...mockContextValue,
        isApiLoading: true, // APIロード中に設定
      };

      (useAppContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
        mockContextValue,
      );

      render(<SaveActionButton type="button" text={text} onClick={() => {}} />);
      const button = screen.getByRole("button", { name: text }); // `button` を取得

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
    },
  );

  it.each([["Load"], ["Delete"], ["All Delete"]])(
    "ボタンのテキストが正しく表示される (text=%s)",
    (text) => {
      render(<SaveActionButton type="button" text={text} onClick={() => {}} />);

      // ✅ ボタンのテキストが適切に表示されているか確認
      expect(screen.getByText(text)).toBeInTheDocument();

      // ✅ ボタンとして取得できるかを確認（より厳密なテスト）
      expect(screen.getByRole("button", { name: text })).toBeInTheDocument();
    },
  );
});
