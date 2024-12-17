import React, { createContext, useContext, useEffect, useState } from "react";
import { AppContextProps, ReviewResponse } from "@/app/type/type";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const SelectedDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 選択タグやボタンのdisabled属性の管理(問題文・総評文の作成=>出力時にボタンを押せないようにする)
  const [isDisabled, setIsDisabled] = useState<boolean | undefined>(false);

  // Sidebar.tsxで選択された値のデータ管理
  const [difficulty, setDifficulty] = useState<string>("");
  const [dataType, setDataType] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  // ローカルストレージから呼び出された"selectedLanguage(文章を表示する際の翻訳言語)"の状態管理
  const [loadedSelectedLanguage, setLoadedSelectedLanguage] =
    useState<string>("");

  // APIから出力された問題文を、JSON形式からテキストに再構築されたデータの状態管理
  const [jsonFormattedProblemContent, setJsonFormattedProblemContent] =
    useState<string | null>(null);
  // APIから出力された問題文を、JSON形式からテキストに再構築されたデータの状態管理
  // 主に、クリップボードへのコピー機能やAPIに渡す際のデータとして使用
  // *** テキスト形式なので、ProblemSection.tsxで整形して表示は出来ない ***
  const [formattedProblemContent, setFormattedProblemContent] =
    useState<string>("");

  // APIから出力されたJSON形式のデータ管理
  const [jsonFormattedReviewContent, setJsonFormattedReviewContent] =
    useState<ReviewResponse | null>(null);
  // ローカルストレージから取得した
  const [saveData, setSaveData] = useState<string[]>([]);

  // ローカルストレージから呼び出された"エディタ言語、エディタの入力内容"のデータ管理
  const [loadedEditorLanguage, setLoadedEditorLanguage] = useState<
    string | null
  >("");
  const [loadedEditorContent, setLoadedEditorContent] = useState<string | null>(
    null,
  );

  // ローカルストレージに
  useEffect(() => {
    const savedLocalStorageData =
      JSON.parse(localStorage.getItem("savedData")) || [];
    if (savedLocalStorageData === undefined) return;
    setSaveData(savedLocalStorageData);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isDisabled,
        setIsDisabled,
        difficulty,
        setDifficulty,
        dataType,
        setDataType,
        topic,
        setTopic,
        selectedLanguage,
        setSelectedLanguage,
        jsonFormattedProblemContent,
        setJsonFormattedProblemContent,
        formattedProblemContent,
        setFormattedProblemContent,
        saveData,
        setSaveData,
        jsonFormattedReviewContent,
        setJsonFormattedReviewContent,
        loadedSelectedLanguage,
        setLoadedSelectedLanguage,
        loadedEditorLanguage,
        setLoadedEditorLanguage,
        loadedEditorContent,
        setLoadedEditorContent,
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
