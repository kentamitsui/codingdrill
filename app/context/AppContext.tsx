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
  // 選択タグやボタンに使用するdisabled属性の状態管理
  const [isApiLoading, setIsApiLoading] = useState<boolean | undefined>(false);
  const [isQuestionCreating, setIsQuestionCreating] = useState<
    boolean | undefined
  >(false);
  const [isReviewCreating, setIsReviewCreating] = useState<boolean | undefined>(
    false,
  );

  // Sidebar.tsxで選択された値のデータ管理
  const [difficulty, setDifficulty] = useState<string>("");
  const [dataType, setDataType] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [uiLanguage, setUiLanguage] = useState<string>("");

  // ローカルストレージから呼び出された"uiLanguage(文章を表示する際の言語)"の状態管理
  const [storedUiLanguage, setStoredUiLanguage] = useState<string>("");

  // APIから出力された問題文を、JSON形式からテキストに再構築されたデータの状態管理
  const [jsonFormattedQuestionText, setJsonFormattedQuestionText] =
    useState<ProblemContentProps | null>(null);
  // APIから出力された問題文を、JSON形式からテキストに再構築されたデータの状態管理
  // 主に、クリップボードへのコピー機能やAPIに渡す際のデータとして使用
  // *** テキスト形式なので、QuestionSection.tsxで整形して表示は出来ない ***
  const [formattedQuestionText, setFormattedQuestionText] =
    useState<string>("");

  // APIから出力されたJSON形式のデータ管理
  const [reviewText, setReviewText] = useState<ReviewResponseProps | null>(
    null,
  );
  // ローカルストレージから取得したデータを管理
  const [saveData, setSaveData] = useState<UpdateSaveDataEntryProps[]>([]);

  // ローカルストレージから呼び出された"エディタ言語、エディタの入力内容"のデータ管理
  const [storedEditorLanguage, setStoredEditorLanguage] = useState<
    string | null
  >("");
  const [storedEditorCode, setStoredEditorCode] = useState<string | null>(null);

  // エディタの入力内容をチェックするための状態管理
  const [checkEditorInputed, setCheckEditorInputed] = useState<string | null>(
    "",
  );
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
        jsonFormattedQuestionText,
        setJsonFormattedQuestionText,
        formattedQuestionText,
        setFormattedQuestionText,
        saveData,
        setSaveData,
        reviewText,
        setReviewText,
        storedUiLanguage,
        setStoredUiLanguage,
        storedEditorLanguage,
        setStoredEditorLanguage,
        storedEditorCode,
        setStoredEditorCode,
        checkEditorInputed,
        setCheckEditorInputed,
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
