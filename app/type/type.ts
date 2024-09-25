import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { Dispatch, SetStateAction } from "react";

// 選択タグに対する型定義
export interface SelectProps {
  label?: string;
  data: { [key: string]: { [key: string]: string } | string }; // `optgroup`内に`option`を持つ可能性があるため修正
  name: string; // セレクトボックスのname属性
  id: string; // セレクトボックスのid属性
  defaultSelected?: string; // デフォルトのラベルを可変にするためのプロップ
  setSelected: Dispatch<SetStateAction<string>>;
}

// ボタンに対する型定義
export interface ButtonProps {
  id?: string;
  type?: "submit" | "reset" | "button" | undefined;
  text?: string;
  onClick?: () => void | Promise<void>;
}
