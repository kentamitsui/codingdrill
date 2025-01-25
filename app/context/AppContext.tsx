import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AppContextProps,
  ReviewResponseProps,
  QuestionTextProps,
  UpdateSaveDataEntryProps,
} from "@/app/type/type";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const SelectedDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  ////////////////////////////////
  // APIリクエストの状態管理（リクエスト中のボタン制御に使用）
  ////////////////////////////////
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false); // APIの処理中フラグ
  const [isQuestionCreating, setIsQuestionCreating] = useState<boolean>(false); // 問題生成中フラグ
  const [isReviewCreating, setIsReviewCreating] = useState<boolean>(false); // レビュー生成中フラグ

  ////////////////////////////////
  // エディタの状態管理
  ////////////////////////////////
  const [storedEditorLanguage, setStoredEditorLanguage] =
    useState<string>("python"); // ローカルストレージから復元されたエディタの言語
  const [currentEditorLanguage, setCurrentEditorLanguage] =
    useState<string>(""); // 現在選択されているエディタの言語
  const [editorFontSize, setEditorFontSize] = useState<string>("14"); // エディタのフォントサイズ
  const [editorTheme, setEditorTheme] = useState<string>("vs-dark"); // エディタのテーマ（ダークモードなど）
  const [storedEditorCode, setStoredEditorCode] = useState<string | null>(null); // ローカルストレージから復元されたエディタのコード
  const [currentEditorInputed, setCurrentEditorInputed] = useState<
    string | null
  >(""); // 現在エディタに入力されているコード

  ////////////////////////////////
  // サイドバーの選択状態管理（ユーザーの選択を保持）
  ////////////////////////////////
  const [difficulty, setDifficulty] = useState<string>(""); // 選択された難易度
  const [dataType, setDataType] = useState<string>(""); // 選択されたデータタイプ
  const [topic, setTopic] = useState<string>(""); // 選択されたトピック
  const [uiLanguage, setUiLanguage] = useState<string>(""); // 選択されたUI言語

  ////////////////////////////////
  // 問題文とレビューの状態管理
  ////////////////////////////////
  const [jsonQuestionText, setJsonQuestionText] =
    useState<QuestionTextProps | null>(null); // APIから取得した問題文（JSON形式）
  const [storedQuestionText, setStoredQuestionText] = useState<string>(""); // APIに送信する問題文（テキスト形式）
  const [reviewText, setReviewText] = useState<ReviewResponseProps | null>(
    null,
  ); // APIから取得したレビュー内容

  ////////////////////////////////
  // ローカルストレージのデータ管理
  ////////////////////////////////
  const [saveData, setSaveData] = useState<UpdateSaveDataEntryProps[]>([]); // 保存された問題データ

  ////////////////////////////////
  // アプリ全体のテーマ管理
  ////////////////////////////////
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(""); // カラーテーマ（ライト/ダークモード）

  ////////////////////////////////
  // ローカルストレージからデータを取得し、セーブデータを更新
  ////////////////////////////////
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
        storedEditorLanguage,
        setStoredEditorLanguage,
        currentEditorLanguage,
        setCurrentEditorLanguage,
        editorFontSize,
        setEditorFontSize,
        editorTheme,
        setEditorTheme,
        storedEditorCode,
        setStoredEditorCode,
        currentEditorInputed,
        setCurrentEditorInputed,
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
        reviewText,
        setReviewText,
        saveData,
        setSaveData,
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
