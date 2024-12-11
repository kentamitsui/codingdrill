import React, { createContext, useContext, useEffect, useState } from "react";
import { AppContextProps } from "@/app/type/type";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const SelectedDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [difficulty, setDifficulty] = useState<string>("");
  const [dataType, setDataType] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("reviewData")) || [];
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
        language,
        setLanguage,
        reviewData,
        setReviewData,
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
