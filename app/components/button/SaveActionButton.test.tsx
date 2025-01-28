// SaveActionButton.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import SaveActionButton from "./SaveActionButton";
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
    "ボタンがクリックされたときに onClick が呼ばれる  (text=%s)",
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
});
