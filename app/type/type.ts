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
  isCreateProblem: boolean | undefined;
  setIsCreateProblem: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  isCreateReview: boolean | undefined;
  setIsCreateReview: React.Dispatch<React.SetStateAction<boolean | undefined>>;
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
  saveData: UpdateSaveDataEntryProps[];
  setSaveData: React.Dispatch<React.SetStateAction<UpdateSaveDataEntryProps[]>>;
  jsonFormattedProblemContent: ProblemContent | null;
  setJsonFormattedProblemContent: React.Dispatch<
    React.SetStateAction<ProblemContent | null>
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
  checkEditorInputed: string | undefined;
  setCheckEditorInputed: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
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
  onChange?: (value: string | undefined) => void;
}

// LocalStorageContextに対する型定義
export interface LocalStorageContextTypeProps {
  savedData: SavedDataEntryProps[];
  updateLocalStorage: (data: SavedDataEntryProps[]) => void;
  loadSavedData: (id: string, setFunctions: SetFunctionsProps) => void;
  handleDeleteSelected: () => void;
  clearLocalStorage: () => void;
}

// SaveToLocalStorageに対する型定義
export interface SaveToLocalStorageProps {
  difficulty: string;
  dataType: string;
  topic: string;
  selectedLanguage: string;
  problemContent: ProblemContent | null;
  editorLanguage: string;
  editorContent: string;
  evaluation: string;
}

// SavedDataEntryに対する型定義
export interface SavedDataEntryProps {
  id: string;
  difficulty: string;
  dataType: string;
  topic: string;
  selectedLanguage: string;
  problemContent: ProblemContent;
  editorLanguage: string;
  editorContent: string;
  evaluation: ReviewResponse;
  timestamp: string;
}

// SetFunctionsに対する型定義
export interface SetFunctionsProps {
  difficulty: (value: string) => void;
  dataType: (value: string) => void;
  topic: (value: string) => void;
  selectedLanguage: (value: string) => void;
  problemContent: (value: ProblemContent) => void;
  editorLanguage: (value: string) => void;
  editorContent: (value: string) => void;
  evaluation: (value: ReviewResponse) => void;
}

// UpdateSaveDataEntryに対する型定義
export interface UpdateSaveDataEntryProps {
  id: string;
  timestamp: string;
  difficulty: string;
  dataType: string;
  topic: string;
  selectedLanguage: string;
}

// ProblemContentに対する型定義
export interface ProblemContent {
  problemStatement: string;
  functionSignature: string;
  constraints: {
    size: string;
    valueRange: string;
    kRange: string;
  };
  example1: {
    input: string;
    output: string;
    explanation: string;
  };
  example2: {
    input: string;
    output: string;
    explanation: string;
  };
  example3: {
    input: string;
    output: string;
    explanation: string;
  };
  edgeCase1: {
    input: string;
    output: string;
    explanation: string;
  };
  edgeCase2: {
    input: string;
    output: string;
    explanation: string;
  };
  edgeCase3: {
    input: string;
    output: string;
    explanation: string;
  };
  analysis: {
    timeComplexity: string;
    spaceComplexity: string;
    edgeCases: string;
    otherConsiderations: string;
  };
  hints: string;
}

// ReusableParagraph(APIからのレスポンスを展開する)に対する型定義
export interface ReusableProblemContentProps {
  content: ProblemContent | null;
  titleText: string;
  paragraphContent: string | null | undefined;
}

// ReviewSectionに対する型定義
export interface ReviewResponse {
  evaluation: {
    algorithmExplanation: string | null;
    clarity: string | null;
    efficiency: string | null;
    testCoverage: string | null;
    technicalAccuracy: string | null;
    improvementSuggestions: string | null;
    exampleImprovement: string | null;
  };
}

// ReusableParagraph(APIからのレスポンスを展開する)に対する型定義
export interface ReusableReviewContentsProps {
  content: ReviewResponse | null;
  titleText: string;
  paragraphContent: string | null | undefined;
}
