import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
// import updateSelectBox from "./updateSaveData";
import {
  LocalStorageContextTypeProps,
  SavedDataEntryProps,
  SetFunctionsProps,
} from "../../type/type";
import { useAppContext } from "@/app/components/AppContext";
const LocalStorageContext = createContext<
  LocalStorageContextTypeProps | undefined
>(undefined);

// ローカルストレージに関するコンテキストを提供する
export const useLocalStorageContext = (): LocalStorageContextTypeProps => {
  // ローカルストレージに関するコンテキストを提供する
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
  const { setSaveData } = useAppContext();
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
    const loadData = JSON.parse(localStorage.getItem("savedData") || "[]");
    const selectedLoadData: SavedDataEntryProps = loadData.find(
      (entry: SavedDataEntryProps) => entry.id === id,
    );

    if (!selectedLoadData) {
      alert("Data not found.");
      return;
    }

    if (!confirm("Is it correct to load this data?")) {
      return;
    }

    // 各セクションのセット関数にデータを渡して状態を更新
    setFunctions.difficulty(selectedLoadData.difficulty);
    setFunctions.dataType(selectedLoadData.dataType);
    setFunctions.topic(selectedLoadData.topic);
    setFunctions.selectedLanguage(selectedLoadData.selectedLanguage);
    setFunctions.problemContent(selectedLoadData.problemContent);
    setFunctions.editorLanguage(selectedLoadData.editorLanguage);
    setFunctions.editorContent(selectedLoadData.editorContent);
    setFunctions.evaluation(selectedLoadData.evaluation);
  };

  // 選択されたデータを削除する関数
  const handleDeleteSelected = (id: string | number) => {
    // ローカルストレージのデータを取得
    const deleteData = JSON.parse(localStorage.getItem("savedData") || "[]");
    // 選択されたデータ以外を全てフィルタリングする
    const filterData = deleteData.filter(
      (entry: SavedDataEntryProps) => entry.id !== id,
    );

    console.log("Updated data after deletion:", deleteData);

    if (!filterData) {
      alert("Please select a valid option to delete.");
      return;
    }

    if (!confirm("Is it correct to delete this data?")) {
      return;
    }

    // フィルタリングされたデータを設置する事で、データを削除することと同等の機能を実装
    localStorage.setItem("savedData", JSON.stringify(filterData));

    // 状態を更新して UI に反映
    const savedLocalStorageData =
      JSON.parse(localStorage.getItem("savedData") || "[]") || [];
    if (savedLocalStorageData === undefined) return;
    setSaveData(savedLocalStorageData);
    // const updatedDataWithTimestamp = updatedData.map((entry) => ({
    //   ...entry,
    //   timestamp: new Date().toISOString(),
    // }));
    // updateSelectBox(updatedDataWithTimestamp); // UI の選択肢を更新
  };

  // ローカルストレージのデータを全て削除する関数
  const clearLocalStorage = () => {
    if (!confirm("Is this correct want to delete all data?")) {
      return;
    }
    if (!confirm("Are you sure you want to delete all data?")) {
      return;
    }
    localStorage.clear();
    setSavedData([]);
    // updateSelectBox([]);
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
