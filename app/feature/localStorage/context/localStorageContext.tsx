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
  const {
    setDifficulty,
    setDataType,
    setTopic,
    setUiLanguage,
    setJsonFormattedQuestionText,
    setStoredEditorLanguage,
    setStoredEditorCode,
    setReviewText,
    setSaveData,
  } = useAppContext();
  // ローカルストレージから取得したデータの一覧を状態管理
  const [storedEntriesPoint, setStoredEntriesPoint] = useState<
    SavedDataEntryProps[] | null
  >(null);
  // セーブデータの選択に伴う背景色の状態管理に使用
  const [currentSelectedSavedDataId, setCurrentSelectedSavedDataId] = useState<
    number | null
  >(null);

  // ローカルストレージからデータを取得して、状態を関数(storedEntriesPoint)に渡して更新
  // これで、他の関数で再利用可能なデータを取得出来る
  useEffect(() => {
    const getLocalStorageData = JSON.parse(
      localStorage.getItem("savedData") || "[]",
    );
    setStoredEntriesPoint(getLocalStorageData);
  }, []);

  // ローカルストレージを更新する関数
  const updateLocalStorage = (data: SavedDataEntryProps[]) => {
    localStorage.setItem("savedData", JSON.stringify(data));
    setStoredEntriesPoint(data);
  };

  // ローカルストレージからデータを取得して、各セクションのセット関数にデータを渡して状態を更新
  const loadSavedData = () => {
    // 既にstate管理しているデータを使用
    if (!storedEntriesPoint || storedEntriesPoint.length === 0) {
      alert("No saved data available.");
      return;
    }

    // 選択されたデータが存在するかをチェック
    if (currentSelectedSavedDataId === null) {
      alert("No data selected.");
      return;
    }

    const selectedLoadData = storedEntriesPoint.find(
      (entry) => entry.id === currentSelectedSavedDataId,
    );

    if (!selectedLoadData) {
      alert("Error: Could not load the selected data.");
      return;
    }

    // 確認ダイアログ
    if (!confirm("Are you sure you want to load this entry?")) {
      return;
    }

    // 各セクションのセット関数にデータを渡して状態を更新
    setDifficulty(selectedLoadData.difficulty);
    setDataType(selectedLoadData.dataType);
    setTopic(selectedLoadData.topic);
    setUiLanguage(selectedLoadData.uiLanguage);
    setJsonFormattedQuestionText(selectedLoadData.problemContent);
    setStoredEditorLanguage(selectedLoadData.editorLanguage);
    setStoredEditorCode(selectedLoadData.editorContent);
    setReviewText(selectedLoadData.evaluation);

    console.log(
      "storedEntriesPoint: ",
      storedEntriesPoint,
      "currentSelectedSavedDataId",
      currentSelectedSavedDataId,
    );
  };

  // 選択されたデータを削除する関数
  const handleDeleteSelected = () => {
    if (currentSelectedSavedDataId === null) {
      alert("No data selected.");
      return;
    }

    // ローカルストレージのデータを取得
    const deleteData = JSON.parse(localStorage.getItem("savedData") || "[]");

    // 選択されたデータが存在するかをチェック
    if (
      !deleteData.some(
        (entry: SavedDataEntryProps) => entry.id === currentSelectedSavedDataId,
      )
    ) {
      alert("Please select a valid data entry to delete.");
      return;
    }

    if (!confirm("Are you sure you want to delete this data?")) {
      return;
    }

    // 選択されたデータ以外をフィルタリングする
    const updatedData = deleteData.filter(
      (entry: SavedDataEntryProps) => entry.id !== currentSelectedSavedDataId,
    );

    // フィルタリングされたデータを設置する事で、データを削除することと同等の機能を実装
    localStorage.setItem("savedData", JSON.stringify(updatedData));

    // 状態を更新してUIに反映
    setSaveData(updatedData);
    // currentSelectedSavedDataId をリセットする
    setCurrentSelectedSavedDataId(null); // nullを渡す事で未選択時の背景色に戻す
  };

  // ローカルストレージのデータを全て削除する関数
  const clearLocalStorage = () => {
    // データの全削除なので、確認メッセージを二回出力
    if (!confirm("Is this correct want to delete all data?")) {
      return;
    }
    if (!confirm("Are you sure you want to delete all data?")) {
      return;
    }

    // try-catchでエラー処理を行う
    try {
      // ローカルストレージのデータを全て削除し、状態をリセット
      localStorage.clear();
      setStoredEntriesPoint([]);
      setSaveData([]);
      setCurrentSelectedSavedDataId(null); // 選択状態を未選択にリセット
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  return (
    <LocalStorageContext.Provider
      value={{
        storedEntriesPoint,
        currentSelectedSavedDataId,
        setCurrentSelectedSavedDataId,
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
