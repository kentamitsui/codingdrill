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
  const [formattedProblemContent, setFormattedProblemContent] =
    useState<string>("");
  const [reviewContent, setReviewContent] = useState<ReviewResponse | null>(
    null,
  );
  const [reviewData, setReviewData] = useState([]);
  // ローカルストレージから呼び出された"selectedLanguage(文章を表示する際の翻訳言語)"の状態管理
  const [loadedSelectedLanguage, setLoadedSelectedLanguage] =
    useState<string>("");
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
        formattedProblemContent,
        setFormattedProblemContent,
        reviewData,
        setReviewData,
        reviewContent,
        setReviewContent,
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
