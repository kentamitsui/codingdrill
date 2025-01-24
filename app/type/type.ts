import { Dispatch, SetStateAction } from "react";
import type * as monaco from "monaco-editor";

// 選択タグに対する型定義
export interface OptionProps {
  label: string; // セレクトボックスのラベル
  name: string; // セレクトボックスのname属性
  defaultSelected?: string; // 初期表示時のプレースホルダー的な値
  setSelected: Dispatch<SetStateAction<string>>; // 選択肢を更新する関数
  savedLocalStorageValue: string | null; // ローカルストレージに保存された値(nullを考慮)
  data:
    | Record<string, string> // 通常のoptionリスト
    | Record<string, Record<string, string>>;
  iconLight: string;
  iconDark: string;
}

// ボタンに対する型定義
export interface BaseButtonProps {
  type: "submit" | "reset" | "button";
  text: string;
  onClick: () => void | Promise<void>; // 同期・非同期の関数に対応
}

// AppContextに対する型定義
export interface AppContextProps {
  isApiLoading: boolean | undefined;
  setIsApiLoading: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  isQuestionCreating: boolean | undefined;
  setIsQuestionCreating: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  isReviewCreating: boolean | undefined;
  setIsReviewCreating: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  difficulty: string;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  dataType: string;
  setDataType: React.Dispatch<React.SetStateAction<string>>;
  topic: string;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  uiLanguage: string;
  setUiLanguage: React.Dispatch<React.SetStateAction<string>>;
  formattedQuestionText: string;
  setFormattedQuestionText: React.Dispatch<React.SetStateAction<string>>;
  saveData: UpdateSaveDataEntryProps[];
  setSaveData: React.Dispatch<React.SetStateAction<UpdateSaveDataEntryProps[]>>;
  jsonFormattedQuestionText: ProblemContentProps | null;
  setJsonFormattedQuestionText: React.Dispatch<
    React.SetStateAction<ProblemContentProps | null>
  >;
  reviewText: ReviewResponseProps | null;
  setReviewText: React.Dispatch<
    React.SetStateAction<ReviewResponseProps | null>
  >;
  //// エディタ関連の状態管理
  storedEditorLanguage: string;
  setStoredEditorLanguage: React.Dispatch<React.SetStateAction<string>>;
  currentEditorLanguage: string;
  setCurrentEditorLanguage: React.Dispatch<React.SetStateAction<string>>;
  storedEditorCode: string | null;
  setStoredEditorCode: React.Dispatch<React.SetStateAction<string | null>>;
  currentEditorInputed: string | null;
  setCurrentEditorInputed: React.Dispatch<React.SetStateAction<string | null>>;
  editorFontSize: string;
  setEditorFontSize: React.Dispatch<React.SetStateAction<string>>;
  editorTheme: string;
  setEditorTheme: React.Dispatch<React.SetStateAction<string>>;
  currentTheme: string | undefined;
  setCurrentTheme: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// PanelContextに対する型定義
export interface PanelContextType {
  initialHorizontalSizes: number[];
  initialVerticalSizes: number[];
  horizontalPanelSizes: number[];
  verticalPanelSizes: number[];
  setHorizontalPanelSizes: React.Dispatch<React.SetStateAction<number[]>>;
  setVerticalPanelSizes: React.Dispatch<React.SetStateAction<number[]>>;
  resetHorizontalPanelSizes: () => void;
  resetVerticalPanelSizes: () => void;
  handleHorizontalDragEnd: (newSizes: number[]) => void;
  handleVerticalDragEnd: (newSizes: number[]) => void;
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
  currentSelectedSavedDataId: number | null;
  setCurrentSelectedSavedDataId: (id: number | null) => void;
  saveToLocalStorage: (data: SaveToLocalStorageProps) => void;
  loadSavedData: () => void;
  handleDeleteSelected: () => void;
  clearLocalStorage: () => void;
}

// SaveToLocalStorageに対する型定義
export interface SaveToLocalStorageProps {
  difficulty: string;
  dataType: string;
  topic: string;
  uiLanguage: string;
  questionText: ProblemContentProps | null;
  editorLanguage: string;
  editorCode: string;
  reviewText: string;
}

// SavedDataEntryに対する型定義
export interface SavedDataEntryProps {
  id: number | null;
  difficulty: string;
  dataType: string;
  topic: string;
  uiLanguage: string;
  problemContent: ProblemContentProps;
  editorLanguage: string;
  editorContent: string;
  evaluation: ReviewResponseProps;
  timestamp: string;
}

// SetUpdateFunctionsに対する型定義
export interface SetUpdateFunctionsProps {
  difficulty: (value: string) => void;
  dataType: (value: string) => void;
  topic: (value: string) => void;
  uiLanguage: (value: string) => void;
  problemContent: (value: ProblemContentProps | null) => void;
  editorLanguage: (value: string) => void;
  editorContent: (value: string) => void;
  evaluation: (value: ReviewResponseProps | null) => void;
}

// UpdateSaveDataEntryに対する型定義
export interface UpdateSaveDataEntryProps {
  id: number | null;
  timestamp: string;
  difficulty: string;
  dataType: string;
  topic: string;
  uiLanguage: string;
  questionText: ProblemContentProps | null;
  editorLanguage: string;
  editorCode: string;
  reviewText: ReviewResponseProps | null;
}

// ProblemContentのベースとなる型定義
interface ProblemContentBase {
  problemStatement: string;
  functionSignature: string;
  constraints: {
    size?: string;
    valueRange?: string;
    kRange?: string;
  };
}

// Exampleの型定義
interface ExampleProps {
  input: string;
  output: string;
  explanation: string;
}

// Analysisの型定義
interface AnalysisProps {
  timeComplexity: string;
  spaceComplexity: string;
  edgeCases: string;
  otherConsiderations: string;
}

// 各Propsを継承し型定義を行う
export interface ProblemContentProps extends ProblemContentBase {
  example1?: ExampleProps;
  example2?: ExampleProps;
  example3?: ExampleProps;
  edgeCase1?: ExampleProps;
  edgeCase2?: ExampleProps;
  edgeCase3?: ExampleProps;
  analysis?: AnalysisProps;
  hints?: string;
}

// Paragraph(APIからのレスポンスを展開する)に対する型定義
export interface QuestionParagraphProps {
  content: ProblemContentProps | null;
  titleText: string;
  paragraphContent: string | null | undefined;
}

// ReviewSectionに対する型定義
export interface ReviewResponseProps {
  algorithmExplanation: string | null;
  clarity: string | null;
  efficiency: string | null;
  testCoverage: string | null;
  technicalAccuracy: string | null;
  suggestionsImprovement: string | null;
  improvementExample: string | null;
}

// Paragraph(APIからのレスポンスを展開する)に対する型定義
export interface ReviewParagraphProps {
  content: ReviewResponseProps | null;
  titleText: string;
  paragraphContent: string | null | undefined;
}

// Loadingに対する型定義
export interface LoadingProps {
  isCreating: boolean | undefined;
  text: string;
}

// ReactSelectに対する型定義
export interface ReactSelectProps {
  selectedSaveData: number | null;
  isApiLoading: boolean | undefined;
  handleChangeSavedData: (event: any) => void;
  saveData: UpdateSaveDataEntryProps[];
  currentTheme: string | undefined;
}
