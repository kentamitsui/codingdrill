import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  LocalStorageContextTypeProps,
  SavedDataEntryProps,
  SetFunctionsProps,
} from "@/app/type/type";
import { useAppContext } from "@/app/context/AppContext";
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
  // セーブデータの選択に伴う背景色の状態管理に使用
  const [currentSelectedSavedData, setCurrentSelectedSavedData] = useState<
    number | string
  >("");

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
    setFunctions.uiLanguage(selectedLoadData.uiLanguage);
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
    // 選択されたデータのIDを取得
    const selectedDeleteData: SavedDataEntryProps = deleteData.find(
      (entry: SavedDataEntryProps) => entry.id === id,
    );

    if (!selectedDeleteData) {
      alert("Please select a valid option to delete.");
      return;
    }

    if (!confirm("Is it correct to delete this data?")) {
      return;
    }

    // フィルタリングされたデータを設置する事で、データを削除することと同等の機能を実装
    localStorage.setItem("savedData", JSON.stringify(filterData));

    // 状態を更新してUIに反映
    const savedLocalStorageData =
      JSON.parse(localStorage.getItem("savedData") || "[]") || [];
    if (savedLocalStorageData === undefined) return;
    setSaveData(savedLocalStorageData);

    // currentSelectedSavedData をリセットする
    if (id === currentSelectedSavedData) {
      setCurrentSelectedSavedData(""); // 空文字を渡す事で未選択時の背景色に戻す
    }
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

    // 状態を更新してUIに反映
    const savedLocalStorageData =
      JSON.parse(localStorage.getItem("savedData") || "[]") || [];
    if (savedLocalStorageData === undefined) return;
    setSaveData(savedLocalStorageData);
    setCurrentSelectedSavedData(""); // 空文字を渡す事で未選択時の背景色に戻す
  };

  return (
    <LocalStorageContext.Provider
      value={{
        savedData,
        currentSelectedSavedData,
        setCurrentSelectedSavedData,
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
