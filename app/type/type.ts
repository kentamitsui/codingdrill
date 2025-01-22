import { Dispatch, SetStateAction } from "react";
import type * as monaco from "monaco-editor";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

// 選択タグに対する型定義
export interface SelectProps {
  label: string; // セレクトボックスのラベル
  data: { [key: string]: { [key: string]: string } | string }; // optionやoptgroupのデータ構造
  name: string; // セレクトボックスのname属性
  defaultSelected?: string; // 初期表示時の値
  setSelected: Dispatch<SetStateAction<string>>; // 更新関数
  savedLocalStorageValue: string;
  iconLight: StaticImport | string;
  iconDark: StaticImport | string;
}

// inputareaに対する型定義
export interface InputAreaButtonProps {
  id: string;
  type: "submit" | "reset" | "button";
  text: string;
  onClick: () => void | Promise<void>;
}

// ボタンに対する型定義
export interface ButtonProps extends InputAreaButtonProps {
  id: string;
  type: "submit" | "reset" | "button";
  text: string;
  iconLight: StaticImport | string;
  iconDark: StaticImport | string;
  onClick: () => void | Promise<void>;
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
  storedUiLanguage: string | null;
  setStoredUiLanguage: React.Dispatch<React.SetStateAction<string>>;
  storedEditorLanguage: string;
  setStoredEditorLanguage: React.Dispatch<React.SetStateAction<string>>;
  currentEditorLanguage: string;
  setCurrentEditorLanguage: React.Dispatch<React.SetStateAction<string>>;
  storedEditorCode: string | null;
  setStoredEditorCode: React.Dispatch<React.SetStateAction<string | null>>;
  currentEditorInputed: string | null;
  setCurrentEditorInputed: React.Dispatch<React.SetStateAction<string | null>>;
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
  storedEntriesPoint: SavedDataEntryProps[];
  currentSelectedSavedDataId: number | null;
  setCurrentSelectedSavedDataId: (id: number | null) => void;
  updateLocalStorage: (data: SavedDataEntryProps[]) => void;
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
  problemContent: ProblemContentProps | null;
  editorLanguage: string;
  editorContent: string;
  evaluation: string;
}

// SavedDataEntryに対する型定義
export interface SavedDataEntryProps {
  id: number;
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

// ReusableParagraph(APIからのレスポンスを展開する)に対する型定義
export interface ReusableProblemContentProps {
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

// ReusableParagraph(APIからのレスポンスを展開する)に対する型定義
export interface ReusableReviewContentsProps {
  content: ReviewResponseProps | null;
  titleText: string;
  paragraphContent: string | null | undefined;
}

// LoadingAnimationに対する型定義
export interface LoadingAnimationProps {
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
