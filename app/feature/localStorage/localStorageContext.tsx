import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import updateSelectBox from "./updateSaveData";

const LocalStorageContext = createContext(null);

export const useLocalStorageContext = () => {
  return useContext(LocalStorageContext);
};

export const LocalStorageProvider = ({ children }) => {
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    const getLocalStorageData = JSON.parse(
      localStorage.getItem("savedData") || "[]" || "undefined",
    );
    setSavedData(getLocalStorageData);
  }, []);

  const updateLocalStorage = (data) => {
    localStorage.setItem("savedData", JSON.stringify(data));
    setSavedData(data);
  };

  const loadSavedData = (id, setFunctions) => {
    const savedData = JSON.parse(localStorage.getItem("savedData") || "[]");
    const selectedEntry = savedData.find((entry) => entry.id === id);

    if (!selectedEntry) {
      alert("Data not found.");
      return;
    }

    if (!confirm("Is it correct to load this data?")) {
      return;
    }

    // 各セクションのセット関数にデータを渡して状態を更新
    setFunctions.difficulty(selectedEntry.difficulty);
    setFunctions.dataType(selectedEntry.dataType);
    setFunctions.topic(selectedEntry.topic);
    setFunctions.selectedLanguage(selectedEntry.selectedLanguage);
    setFunctions.problemContent(selectedEntry.problemContent);
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

    if (!confirm("Is it correct to delete this data?")) {
      return;
    }

    // ローカルストレージのデータを取得し、選択された項目を削除
    const savedData = JSON.parse(localStorage.getItem("savedData") || "[]");
    const updatedData = savedData.filter(
      (entry) => entry.id.toString() !== selectedId,
    );

    // ローカルストレージを更新
    localStorage.setItem("savedData", JSON.stringify(updatedData));

    // 状態を更新して UI に反映
    updateSelectBox(updatedData); // UI の選択肢を更新
  };

  const clearLocalStorage = () => {
    if (!confirm("Is this correct want to delete all data?")) {
      return;
    }
    if (!confirm("Is this correct?")) {
      return;
    }
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
