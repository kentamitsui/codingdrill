import { Dispatch, SetStateAction } from "react";
import type * as monaco from "monaco-editor";
// 選択タグに対する型定義
export interface SelectProps {
  label: string;
  data: { [key: string]: { [key: string]: string } | string }; // `optgroup`内に`option`を持つ可能性があるため修正
  name: string; // セレクトボックスのname属性
  defaultSelected?: string; // デフォルトのラベルを可変にするためのプロップ
  setSelected: Dispatch<SetStateAction<string>>;
  savedLocalStorageValue: string;
}

// ボタンに対する型定義
export interface ButtonProps {
  id: string;
  type: "submit" | "reset" | "button" | undefined;
  text: string;
  onClick: () => void | Promise<void>;
}

// AppContextに対する型定義
export interface AppContextProps {
  isDisabled: boolean | undefined;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean | undefined>>;
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
  saveData: string[];
  setSaveData: React.Dispatch<React.SetStateAction<string[]>>;
  jsonFormattedProblemContent: string | null;
  setJsonFormattedProblemContent: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  jsonFormattedReviewContent: ReviewResponse | null;
  setJsonFormattedReviewContent: React.Dispatch<
    React.SetStateAction<ReviewResponse | null>
  >;
  loadedSelectedLanguage: string | null;
  setLoadedSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  loadedEditorLanguage: string | null;
  setLoadedEditorLanguage: React.Dispatch<React.SetStateAction<string | null>>;
  loadedEditorContent: string | null;
  setLoadedEditorContent: React.Dispatch<React.SetStateAction<string | null>>;
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
