// import updateSelectBox from "./updateSaveData";
import { SaveToLocalStorageProps } from "../../type/type";

const saveToLocalStorage = (data: SaveToLocalStorageProps) => {
  // ローカルストレージからデータを取得
  const savedData = JSON.parse(localStorage.getItem("savedData") || "[]") || [];

  // セーブデータの最大IDを検索
  interface SavedDataEntry {
    id: number;
    timestamp: string;
    [key: string]: any;
  }

  const maxId = savedData.reduce(
    (max: number, entry: SavedDataEntry) => (entry.id > max ? entry.id : max),
    0,
  );

  const timestamp = new Date().toLocaleString();

  const newEntry = {
    id: maxId + 1, // idに連番を振る
    timestamp,
    ...data,
  };

  // ローカルストレージにデータを保存
  savedData.push(newEntry);
  localStorage.setItem("savedData", JSON.stringify(savedData));

  // 選択タグを最新の状態に更新
  // updateSelectBox(savedData);
};

export default saveToLocalStorage;
