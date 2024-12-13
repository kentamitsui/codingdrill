import { createContext, useContext, useEffect, useState } from "react";
import updateSelectBox from "./updateSaveData";

const LocalStorageContext = createContext(null);

export const useLocalStorageContext = () => {
  return useContext(LocalStorageContext);
};

export const LocalStorageProvider = ({ children }) => {
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    const getLocalStorageData = JSON.parse(
      localStorage.getItem("reviewData") || "[]",
    );
    setSavedData(getLocalStorageData);
  }, []);

  const updateLocalStorage = (data) => {
    localStorage.setItem("reviewData", JSON.stringify(data));
    setSavedData(data);
  };

  const loadSavedData = (id, setFunctions) => {
    const savedData = JSON.parse(localStorage.getItem("reviewData") || "[]");
    const selectedEntry = savedData.find((entry) => entry.id === id);

    if (!selectedEntry) {
      alert("Data not found.");
      return;
    }

    // 各セクションのセット関数にデータを渡して状態を更新
    setFunctions.difficulty(selectedEntry.difficulty);
    setFunctions.dataType(selectedEntry.dataType);
    setFunctions.topic(selectedEntry.topic);
    setFunctions.selectedLanguage(selectedEntry.selectedLanguage);
    setFunctions.problemContent(JSON.parse(selectedEntry.problemContent));
    setFunctions.editorLanguage(selectedEntry.editorLanguage);
    setFunctions.editorContent(selectedEntry.editorContent);
    setFunctions.evaluation(selectedEntry.evaluation);
  };

  const handleDeleteSelected = () => {
    const selectElement = document.getElementById(
      "saveData",
    ) as HTMLSelectElement;
    const selectedId = selectElement.value; // 選択されたオプションの ID を取得

    if (!selectedId) {
      alert("Please select a valid option to delete.");
      return;
    }

    // ローカルストレージのデータを取得し、選択された項目を削除
    const savedData = JSON.parse(localStorage.getItem("reviewData") || "[]");
    const updatedData = savedData.filter(
      (entry) => entry.id.toString() !== selectedId,
    );

    // ローカルストレージを更新
    localStorage.setItem("reviewData", JSON.stringify(updatedData));

    // 状態を更新して UI に反映
    updateSelectBox(updatedData); // UI の選択肢を更新
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setSavedData([]);
    updateSelectBox([]);
  };

  return (
    <LocalStorageContext.Provider
      value={{
        savedData,
        updateLocalStorage,
        loadSavedData,
        handleDeleteSelected,
        clearLocalStorage,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
