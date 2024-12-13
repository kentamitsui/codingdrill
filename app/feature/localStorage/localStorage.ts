import updateSelectBox from "./updateSaveData";

const saveToLocalStorage = (data) => {
  const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
  const timestamp = new Date().toLocaleString();

  const newEntry = {
    id: savedData.length + 1, // idに連番を振る
    timestamp,
    ...data,
  };

  // 100個以上のデータは、古い日付から削除する
  if (savedData.length >= 100) savedData.shift();

  // ローカルストレージにデータを保存
  savedData.push(newEntry);
  localStorage.setItem("savedData", JSON.stringify(savedData));

  // 選択タグを最新の状態に更新
  updateSelectBox(savedData);
};

export default saveToLocalStorage;
