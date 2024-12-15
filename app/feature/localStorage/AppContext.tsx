import React, { createContext, useContext, useEffect, useState } from "react";
import { AppContextProps } from "@/app/type/type";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const SelectedDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Sidebar.tsxで選択された値の状態管理
  const [difficulty, setDifficulty] = useState<string>("");
  const [dataType, setDataType] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [reviewData, setReviewData] = useState([]);
  const [formattedProblemContent, setFormattedProblemContent] =
    useState<string>("");
  // ローカルストレージから呼び出された"selectedLanguage(文章を表示する際の翻訳言語)"の状態管理
  const [loadedSelectedLanguage, setLoadedSelectedLanguage] =
    useState<string>("");

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
        loadedSelectedLanguage,
        setLoadedSelectedLanguage,
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
