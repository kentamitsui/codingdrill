import React, { createContext, useContext, useEffect, useState } from "react";
import { AppContextProps } from "@/app/type/type";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const SelectedDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [selectedDataType, setSelectedDataType] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedLanguagePreference, setSelectedLanguagePreference] =
    useState<string>("");
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("reviewData")) || [];
    setReviewData(savedData);
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedDifficulty,
        setSelectedDifficulty,
        selectedDataType,
        setSelectedDataType,
        selectedTopic,
        setSelectedTopic,
        selectedLanguagePreference,
        setSelectedLanguagePreference,
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
