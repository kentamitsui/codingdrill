// BaseButton.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import BaseButton from "./BaseButton";
import { useAppContext } from "@/app/context/AppContext";

// useAppContextのモック
vi.mock("@/app/context/AppContext", () => ({
  useAppContext: vi.fn(() => ({
    isApiLoading: false,
    difficulty: "medium",
    dataType: "json",
    topic: "react",
    uiLanguage: "japanese",
    currentTheme: "dark",
  })),
}));

describe("BaseButton Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("ボタンが正しくレンダリングされる", () => {
    render(<BaseButton type="button" text="送信" onClick={() => {}} />);
    expect(screen.getByText("送信")).toBeInTheDocument();
  });

  it("ボタンがクリックされたときに onClick が呼ばれる", () => {
    const handleClick = vi.fn();
    render(<BaseButton type="button" text="送信" onClick={handleClick} />);

    const button = screen.getByText("送信");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("APIがローディング中のときはボタンが無効になる", () => {
    (useAppContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isApiLoading: true,
    });

    render(<BaseButton type="button" text="送信" onClick={() => {}} />);
    const button = screen.getByText("送信");

    expect(button).toBeDisabled();
  });

  it("選択肢がすべて未選択のときはボタンが無効になる", () => {
    (useAppContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isApiLoading: false,
      difficulty: "",
      dataType: "",
      topic: "",
      uiLanguage: "",
    });

    render(<BaseButton type="button" text="送信" onClick={() => {}} />);
    const button = screen.getByText("送信");

    expect(button).toBeDisabled();
  });

  it("選択肢がすべて選択されているときはボタンが有効になる", () => {
    (useAppContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isApiLoading: false,
      difficulty: "medium",
      dataType: "json",
      topic: "react",
      uiLanguage: "ja",
    });

    render(<BaseButton type="button" text="送信" onClick={() => {}} />);
    const button = screen.getByText("送信");

    expect(button).not.toBeDisabled();
  });
});
