import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import updateSelectBox from "./updateSaveData";
import {
  LocalStorageContextTypeProps,
  SavedDataEntryProps,
  SetFunctionsProps,
} from "../../type/type";

const LocalStorageContext = createContext<
  LocalStorageContextTypeProps | undefined
>(undefined);

// ローカルストレージに関するコンテキストを提供する
export const useLocalStorageContext = (): LocalStorageContextTypeProps => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error(
      "useLocalStorageContext must be used within a LocalStorageProvider",
    );
  }
  return context;
};

// 各ファイルで、ローカルストレージに関するコンテキストを使用出来るようにするプロバイダー
export const LocalStorageProvider = ({ children }: { children: ReactNode }) => {
  const [savedData, setSavedData] = useState<SavedDataEntryProps[]>([]);

  useEffect(() => {
    const getLocalStorageData = JSON.parse(
      localStorage.getItem("savedData") || "[]" || "undefined",
    );
    setSavedData(getLocalStorageData);
  }, []);

  // ローカルストレージを更新する関数
  const updateLocalStorage = (data: SavedDataEntryProps[]) => {
    localStorage.setItem("savedData", JSON.stringify(data));
    setSavedData(data);
  };

  // ローカルストレージからデータを取得して、各セクションのセット関数にデータを渡して状態を更新
  const loadSavedData = (
    id: string | number,
    setFunctions: SetFunctionsProps,
  ) => {
    const savedData = JSON.parse(localStorage.getItem("savedData") || "[]");
    const selectedEntry: SavedDataEntryProps | undefined = savedData.find(
      (entry: SavedDataEntryProps) => entry.id === id,
    );

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

  // 選択されたデータを削除する関数
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
    const updatedData: SavedDataEntryProps[] = savedData.filter(
      (entry: SavedDataEntryProps) => entry.id.toString() !== selectedId,
    );

    // ローカルストレージを更新
    localStorage.setItem("savedData", JSON.stringify(updatedData));

    // 状態を更新して UI に反映
    const updatedDataWithTimestamp = updatedData.map((entry) => ({
      ...entry,
      timestamp: new Date().toISOString(),
    }));
    updateSelectBox(updatedDataWithTimestamp); // UI の選択肢を更新
  };

  // ローカルストレージのデータを全て削除する関数
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
