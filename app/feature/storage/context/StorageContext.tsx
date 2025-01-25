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
  SaveToLocalStorageProps,
  SetUpdateFunctionsProps,
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
  const { saveData, setSaveData } = useAppContext();
  // セーブデータの選択に伴う背景色の状態管理に使用
  const [currentSelectedSavedDataId, setCurrentSelectedSavedDataId] = useState<
    number | null
  >(null);

  // ローカルストレージからデータを取得
  useEffect(() => {
    const getLocalStorageData = JSON.parse(
      localStorage.getItem("savedData") || "[]",
    );
    setSaveData(getLocalStorageData);
  }, []);

  // ローカルストレージにデータを保存する関数
  const saveToLocalStorage = (data: SaveToLocalStorageProps) => {
    // ローカルストレージからデータを取得
    const savedData =
      JSON.parse(localStorage.getItem("savedData") || "[]") || [];

    // 保存データの最大値を取得
    const maxId = savedData.reduce(
      (max: number, entry: SavedDataEntryProps) =>
        entry.id > max ? entry.id : max,
      0,
    );

    // 連番を振って新しいデータを作成
    const newEntry = {
      id: maxId + 1,
      timestamp: new Date().toLocaleString(),
      ...data,
    };

    // ローカルストレージにデータを保存
    savedData.push(newEntry);
    localStorage.setItem("savedData", JSON.stringify(savedData));
  };

  // ローカルストレージからデータを取得して、各セクションのセット関数にデータを渡して状態を更新
  const loadSavedData = (updateFunctions: SetUpdateFunctionsProps) => {
    // 既にstate管理しているデータを使用
    if (!saveData || saveData.length === 0) {
      alert("No saved data available.");
      return;
    }

    // 選択されたデータが存在するかをチェック
    if (currentSelectedSavedDataId === null) {
      alert("No data selected.");
      return;
    }

    const selectedLoadData = saveData.find(
      (entry) => entry.id === currentSelectedSavedDataId,
    );

    if (!selectedLoadData) {
      alert("Error: Could not load the selected data.");
      return;
    }

    // 確認ダイアログ
    if (!confirm("Are you sure you want to load this data?")) {
      return;
    }

    // 各セクションのセット関数にデータを渡して状態を更新
    updateFunctions.difficulty(selectedLoadData.difficulty);
    updateFunctions.dataType(selectedLoadData.dataType);
    updateFunctions.topic(selectedLoadData.topic);
    updateFunctions.uiLanguage(selectedLoadData.uiLanguage);
    updateFunctions.questionText(selectedLoadData.questionText);
    updateFunctions.editorLanguage(selectedLoadData.editorLanguage);
    updateFunctions.editorContent(selectedLoadData.editorCode);
    updateFunctions.reviewText(selectedLoadData.reviewText);
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
      setSaveData([]);
      setCurrentSelectedSavedDataId(null); // 選択状態を未選択にリセット
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  return (
    <LocalStorageContext.Provider
      value={{
        currentSelectedSavedDataId,
        setCurrentSelectedSavedDataId,
        saveToLocalStorage,
        loadSavedData,
        handleDeleteSelected,
        clearLocalStorage,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
