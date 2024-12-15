import { Dispatch, SetStateAction } from "react";
import type * as monaco from "monaco-editor";
// 選択タグに対する型定義
export interface SelectProps {
  label?: string;
  data: { [key: string]: { [key: string]: string } | string }; // `optgroup`内に`option`を持つ可能性があるため修正
  name: string; // セレクトボックスのname属性
  disabled: boolean;
  defaultSelected?: string; // デフォルトのラベルを可変にするためのプロップ
  setSelected: Dispatch<SetStateAction<string>>;
  savedLocalStorageValue: string;
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
  setIsDisabledData: Dispatch<SetStateAction<boolean>>;
  getIsDisabledData: boolean;
  setEditorContent: Dispatch<SetStateAction<string | null>>;
}

// AppContextに対する型定義
export interface AppContextProps {
  difficulty: string;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  dataType: string;
  setDataType: React.Dispatch<React.SetStateAction<string>>;
  topic: string;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  formattedProblemContent: string;
  setFormattedProblemContent: React.Dispatch<React.SetStateAction<string>>;
  reviewData: string[];
  setReviewData: React.Dispatch<React.SetStateAction<never[]>>;
  jsonFormattedProblemContent: string;
  setJsonFormattedProblemContent: React.Dispatch<React.SetStateAction<string>>;
  jsonFormattedReviewContent: ReviewResponse | null;
  setJsonFormattedReviewContent: React.Dispatch<
    React.SetStateAction<ReviewResponse | null>
  >;
  loadedSelectedLanguage: string | null;
  setLoadedSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  loadedEditorLanguage: string | null;
  setLoadedEditorLanguage: React.Dispatch<React.SetStateAction<string | null>>;
}

// 問題文を表示する際の型定義
export interface DisplayProblemProps {
  getIsDisabledData: boolean;
}

// Splitterに対する型定義
export interface SplitterProps {
  setIsDisabledData: Dispatch<SetStateAction<boolean>>;
  getIsDisabledData: boolean;
  editorContent: string | null;
}

// PanelContextに対する型定義
export interface PanelContextType {
  resetPanelSizes: () => void;
}

// Monaco Editorに対する型定義
export interface MonacoEditorProps {
  fontSize: number;
  editorLanguage: string;
  editorTheme: string;
  onMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

// InputSectionに対する型定義
export interface InputSectionProps {
  problemData: string | null;
  setReviewData: Dispatch<SetStateAction<ReviewResponse | null>>;
  setIsDisabledData: Dispatch<SetStateAction<boolean>>;
  getIsDisabledData: boolean;
  editorContent: string | null;
}

// ReviewSectionに対する型定義
export interface GeneralEvaluation {
  explanationOfTheAlgorithm: string;
  clarityAndSpecificity: string;
  originalityAndApplicability: string;
  diversityAndComplexity: string;
  technicalRequirements: string;
  evaluationCriteria: string;
}

export interface ReviewResponse {
  generalEvaluation: GeneralEvaluation;
}

export interface ReviewProps {
  getIsDisabledData: boolean;
}
