import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AppContextProps,
  ReviewResponseProps,
  ProblemContentProps,
  UpdateSaveDataEntryProps,
} from "@/app/type/type";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const SelectedDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // API使用中の状態管理
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false);
  const [isQuestionCreating, setIsQuestionCreating] = useState<boolean>(false);
  const [isReviewCreating, setIsReviewCreating] = useState<boolean>(false);
  ////////////////////////////////
  // Sidebar.tsxで選択された難易度、データタイプ、トピック、UI言語を管理
  const [difficulty, setDifficulty] = useState<string>("");
  const [dataType, setDataType] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [uiLanguage, setUiLanguage] = useState<string>("");
  ////////////////////////////////
  // APIから出力された問題文をJSON形式で管理
  const [jsonQuestionText, setJsonQuestionText] =
    useState<ProblemContentProps | null>(null);
  // APIに送信する問題文(テキストベース)を管理(APIのリクエスト、クリップボードコピー時に使用)
  const [storedQuestionText, setStoredQuestionText] = useState<string>("");
  // APIから出力されたフィードバックを管理(初期値ではデータが無いのでnull)
  const [reviewText, setReviewText] = useState<ReviewResponseProps | null>(
    null,
  );
  ////////////////////////////////
  // ローカルストレージから取得したデータを管理
  const [saveData, setSaveData] = useState<UpdateSaveDataEntryProps[]>([]);

  // ローカルストレージから呼び出された"エディタ言語、エディタの入力内容"のデータ管理
  const [storedEditorLanguage, setStoredEditorLanguage] =
    useState<string>("python");
  // 直近で選択されたエディタの言語を管理
  const [currentEditorLanguage, setCurrentEditorLanguage] =
    useState<string>("");
  // エディタのフォントサイズを管理
  const [editorFontSize, setEditorFontSize] = useState<string>("14");
  // エディタのテーマを管理
  const [editorTheme, setEditorTheme] = useState<string>("vs-dark");
  // ローカルストレージから呼び出されたエディタの入力内容のデータ管理
  const [storedEditorCode, setStoredEditorCode] = useState<string | null>(null);
  // エディタの入力内容をチェックするための状態管理
  const [currentEditorInputed, setCurrentEditorInputed] = useState<
    string | null
  >("");

  // カラーテーマを管理
  const [currentTheme, setCurrentTheme] = useState<string | undefined>("");

  // ローカルストレージからデータを取得し、react-selectコンポーネントに表示されるセーブデータオプションを更新
  useEffect(() => {
    const savedLocalStorageData =
      JSON.parse(localStorage.getItem("savedData") || "[]") || [];

    if (savedLocalStorageData === undefined) return;
    setSaveData(savedLocalStorageData);
  }, [setSaveData]);
  return (
    <AppContext.Provider
      value={{
        isApiLoading,
        setIsApiLoading,
        isQuestionCreating,
        setIsQuestionCreating,
        isReviewCreating,
        setIsReviewCreating,
        difficulty,
        setDifficulty,
        dataType,
        setDataType,
        topic,
        setTopic,
        uiLanguage,
        setUiLanguage,
        jsonQuestionText,
        setJsonQuestionText,
        storedQuestionText,
        setStoredQuestionText,
        saveData,
        setSaveData,
        reviewText,
        setReviewText,
        storedEditorLanguage,
        setStoredEditorLanguage,
        currentEditorLanguage,
        setCurrentEditorLanguage,
        storedEditorCode,
        setStoredEditorCode,
        currentEditorInputed,
        setCurrentEditorInputed,
        editorFontSize,
        setEditorFontSize,
        editorTheme,
        setEditorTheme,
        currentTheme,
        setCurrentTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
