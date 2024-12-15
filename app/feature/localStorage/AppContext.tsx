import React, { createContext, useContext, useEffect, useState } from "react";
import { AppContextProps, ReviewResponse } from "@/app/type/type";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const SelectedDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Sidebar.tsxで選択された値の状態管理
  const [difficulty, setDifficulty] = useState<string>("");
  const [dataType, setDataType] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  // APIから出力された問題文を、JSON形式からテキストに再構築されたデータの状態管理
  const [jsonFormattedProblemContent, setJsonFormattedProblemContent] =
    useState<string>("");
  // APIから出力された問題文を、JSON形式からテキストに再構築されたデータの状態管理
  // 主に、クリップボードへのコピー機能やAPIに渡す際のデータとして使用
  // *** テキスト形式なので、ProblemSection.tsxで整形して表示は出来ない ***
  const [formattedProblemContent, setFormattedProblemContent] =
    useState<string>("");
  // APIから出力された総評のJSON形式文章を状態管理
  const [jsonFormattedReviewContent, setJsonFormattedReviewContent] =
    useState<ReviewResponse | null>(null);
  const [reviewData, setReviewData] = useState([]);
  // ローカルストレージから呼び出された"selectedLanguage(文章を表示する際の翻訳言語)"の状態管理
  const [loadedSelectedLanguage, setLoadedSelectedLanguage] =
    useState<string>("");
  // ローカルストレージから呼び出された"editorLanguage(文章を表示する際の翻訳言語)"の状態管理
  const [loadedEditorLanguage, setLoadedEditorLanguage] = useState<
    string | null
  >("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
    setReviewData(savedData);
  }, []);

  return (
    <AppContext.Provider
      value={{
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
        reviewData,
        setReviewData,
        jsonFormattedReviewContent,
        setJsonFormattedReviewContent,
        loadedSelectedLanguage,
        setLoadedSelectedLanguage,
        loadedEditorLanguage,
        setLoadedEditorLanguage,
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
