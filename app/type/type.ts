import { Dispatch, SetStateAction } from "react";
import type * as monaco from "monaco-editor";

///////////////////////////////
// 共通で使用される型定義
///////////////////////////////

// QuestionTextのベースとなる型定義
interface QuestionTextBase {
  problemStatement: string;
  functionSignature: string;
  constraints: {
    size: string;
    valueRange: string;
    kRange: string;
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

// APIから取得した問題文の型定義
export interface QuestionTextProps extends QuestionTextBase {
  example1: ExampleProps;
  example2: ExampleProps;
  example3: ExampleProps;
  edgeCase1: ExampleProps;
  edgeCase2: ExampleProps;
  edgeCase3: ExampleProps;
  analysis: AnalysisProps;
  hints: string;
}

// APIから取得したレビューの型定義
export interface ReviewResponseProps {
  algorithmExplanation: string | null;
  clarity: string | null;
  efficiency: string | null;
  testCoverage: string | null;
  technicalAccuracy: string | null;
  suggestionsImprovement: string | null;
  improvementExample: string | null;
}

///////////////////////////////
// UIコンポーネント関連の型定義
///////////////////////////////

// 選択タグの型定義
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

// ボタンの型定義
export interface BaseButtonProps {
  type: "submit" | "reset" | "button";
  text: string;
  onClick: () => void | Promise<void>; // 同期・非同期の関数に対応
}

// ReactSelectの型定義
export interface ReactSelectProps {
  selectedSaveData: number | null;
  isApiLoading: boolean | undefined;
  handleChangeSavedData: (event: any) => void;
  saveData: UpdateSaveDataEntryProps[];
}

// Monaco Editorの型定義
export interface MonacoEditorProps {
  fontSize: number;
  editorLanguage: string;
  editorTheme: string;
  onMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  onChange?: (value: string | undefined) => void;
}

///////////////////////////////
// コンテキスト関連の型定義
///////////////////////////////

// AppContextの型定義
export interface AppContextProps {
  ////////////////////////////////
  // APIリクエストの状態管理（リクエスト中のボタン制御に使用）
  ////////////////////////////////
  isApiLoading: boolean; // APIの処理中フラグ
  setIsApiLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isQuestionCreating: boolean; // 問題生成中フラグ
  setIsQuestionCreating: React.Dispatch<React.SetStateAction<boolean>>;
  isReviewCreating: boolean; // レビュー生成中フラグ
  setIsReviewCreating: React.Dispatch<React.SetStateAction<boolean>>;

  ////////////////////////////////
  // エディタの状態管理（コードエディタの設定・入力状態を管理）
  ////////////////////////////////
  storedEditorLanguage: string; // ローカルストレージから復元されたエディタの言語
  setStoredEditorLanguage: React.Dispatch<React.SetStateAction<string>>;
  currentEditorLanguage: string; // 現在選択されているエディタの言語
  setCurrentEditorLanguage: React.Dispatch<React.SetStateAction<string>>;
  storedEditorCode: string | null; // ローカルストレージから復元されたエディタのコード
  setStoredEditorCode: React.Dispatch<React.SetStateAction<string | null>>;
  currentEditorInputed: string | null; // 現在エディタに入力されているコード
  setCurrentEditorInputed: React.Dispatch<React.SetStateAction<string | null>>;
  editorFontSize: string; // エディタのフォントサイズ
  setEditorFontSize: React.Dispatch<React.SetStateAction<string>>;
  editorTheme: string; // エディタのテーマ（ダークモードなど）
  setEditorTheme: React.Dispatch<React.SetStateAction<string>>;

  ////////////////////////////////
  // サイドバーの選択状態管理（ユーザーの選択を保持）
  ////////////////////////////////
  difficulty: string; // 選択された難易度
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  dataType: string; // 選択されたデータタイプ
  setDataType: React.Dispatch<React.SetStateAction<string>>;
  topic: string; // 選択されたトピック
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  uiLanguage: string; // 選択されたUI言語
  setUiLanguage: React.Dispatch<React.SetStateAction<string>>;

  ////////////////////////////////
  // 問題文とレビューの状態管理（APIから取得・送信するデータ）
  ////////////////////////////////
  saveData: UpdateSaveDataEntryProps[]; // 保存された問題データ
  setSaveData: React.Dispatch<React.SetStateAction<UpdateSaveDataEntryProps[]>>;
  storedQuestionText: string; // APIに送信する問題文（テキスト形式）
  setStoredQuestionText: React.Dispatch<React.SetStateAction<string>>;
  jsonQuestionText: QuestionTextProps | null; // APIから取得した問題文（JSON形式）
  setJsonQuestionText: React.Dispatch<
    React.SetStateAction<QuestionTextProps | null>
  >;
  reviewText: ReviewResponseProps | null; // APIから取得したレビュー内容（JSON形式）
  setReviewText: React.Dispatch<
    React.SetStateAction<ReviewResponseProps | null>
  >;

  ////////////////////////////////
  // アプリ全体のテーマ管理（ライト/ダークモード）
  ////////////////////////////////
  currentTheme: string | undefined; // カラーテーマ（ライト/ダークモード）
  setCurrentTheme: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// PanelContextの型定義
export interface PanelLayoutContextProps {
  ////////////////////////////////
  // 初期パネルサイズ（変更不可）
  ////////////////////////////////
  initialHorizontalSizes: readonly number[]; // 水平方向のパネルの初期サイズ
  initialVerticalSizes: readonly number[]; // 垂直方向のパネルの初期サイズ

  ////////////////////////////////
  // 現在のパネルサイズ（状態管理）
  ////////////////////////////////
  horizontalPanelSizes: number[]; // 水平方向のパネルサイズ
  verticalPanelSizes: number[]; // 垂直方向のパネルサイズ
  setHorizontalPanelSizes: React.Dispatch<React.SetStateAction<number[]>>; // 水平方向のパネルサイズを更新
  setVerticalPanelSizes: React.Dispatch<React.SetStateAction<number[]>>; // 垂直方向のパネルサイズを更新

  ////////////////////////////////
  // パネルサイズのリセット処理
  ////////////////////////////////
  resetHorizontalSizes: () => void; // 水平方向のパネルサイズをリセット
  resetVerticalSizes: () => void; // 垂直方向のパネルサイズをリセット

  ////////////////////////////////
  // ドラッグ終了時のパネルサイズ更新処理
  ////////////////////////////////
  updateHorizontalSizes: (newSizes: number[]) => void; // 水平方向のパネルサイズ更新
  updateVerticalSizes: (newSizes: number[]) => void; // 垂直方向のパネルサイズ更新
}

// LocalStorageContextの型定義
export interface LocalStorageContextTypeProps {
  currentSelectedSavedDataId: number | null;
  setCurrentSelectedSavedDataId: (id: number | null) => void;
  saveToLocalStorage: (data: SaveToLocalStorageProps) => void;
  loadSavedData: (updateFunctions: SetUpdateFunctionsProps) => void;
  handleDeleteSelected: () => void;
  clearLocalStorage: () => void;
}

///////////////////////////////
// 保存データ管理の型定義
///////////////////////////////

// SaveToLocalStorageの型定義
export interface SaveToLocalStorageProps {
  difficulty: string;
  dataType: string;
  topic: string;
  uiLanguage: string;
  questionText: QuestionTextProps;
  editorLanguage: string;
  editorCode: string;
  reviewText: ReviewResponseProps;
}

// SavedDataEntryの型定義
export interface SavedDataEntryProps extends SaveToLocalStorageProps {
  id: number;
  timestamp: string;
}

// UpdateSaveDataEntryの型定義
export interface UpdateSaveDataEntryProps extends SaveToLocalStorageProps {
  id: number | null;
  timestamp: string;
}

// SetUpdateFunctions(loadsavedataに使用)の型定義
export interface SetUpdateFunctionsProps {
  difficulty: (value: string) => void;
  dataType: (value: string) => void;
  topic: (value: string) => void;
  uiLanguage: (value: string) => void;
  questionText: (value: QuestionTextProps) => void;
  editorLanguage: (value: string) => void;
  editorContent: (value: string) => void;
  reviewText: (value: ReviewResponseProps) => void;
}

///////////////////////////////
// ユーティリティ型定義
///////////////////////////////

// clipboardCopyButtonの型定義
export interface clipboardCopyProps {
  context: string | null;
}

// Paragraph(問題文のコピー時に使用)の型定義
export interface QuestionParagraphProps {
  content: QuestionTextProps | null;
  titleText: string;
  paragraphContent: string | null | undefined;
}

// Paragraph(フィードバックのコピー時に使用)の型定義
export interface ReviewParagraphProps {
  content: ReviewResponseProps | null;
  titleText: string;
  paragraphContent: string | null | undefined;
}

// Loadingの型定義
export interface LoadingProps {
  isCreating: boolean | undefined;
  text: string;
}
