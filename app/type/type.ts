import { Dispatch, SetStateAction } from "react";

// 選択タグに対する型定義
export interface SelectProps {
  label?: string;
  data: { [key: string]: { [key: string]: string } | string }; // `optgroup`内に`option`を持つ可能性があるため修正
  name: string; // セレクトボックスのname属性
  disabled: boolean;
  defaultSelected?: string; // デフォルトのラベルを可変にするためのプロップ
  setSelected: Dispatch<SetStateAction<string>>;
}

// ボタンに対する型定義
export interface ButtonProps {
  id?: string;
  type?: "submit" | "reset" | "button" | undefined;
  text?: string;
  clicked?: boolean;
  onClick?: () => void | Promise<void>;
}

// サイドバーに対する型定義
export interface SidebarProps {
  setProblemData: Dispatch<SetStateAction<string | null>>;
  setDisplayLanguageData: Dispatch<SetStateAction<string | null>>;
}

// レスポンスされたデータ(問題文)に対する型定義
export interface ProblemSectionProps {
  problemData: null | string;
  displayLanguageData: null | string;
}

// 問題文を表示する際の型定義
export interface DisplayProblemProps {
  problemData: string;
}
