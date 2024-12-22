import { useAppContext } from "./AppContext";
import { ButtonProps } from "../type/type";
import { useEffect, useState } from "react";

export default function Button({ id, type, text, onClick }: ButtonProps) {
  const { isDisabled, difficulty, dataType, topic, selectedLanguage } =
    useAppContext();
  // 選択肢が全て選択されたかどうかの状態管理に使用
  const [isAllSelected, setIsAllSelected] = useState(false);

  // 全ての選択肢が選択されたかどうかを判定する
  useEffect(() => {
    if (
      difficulty !== "" &&
      dataType !== "" &&
      topic !== "" &&
      selectedLanguage !== ""
    ) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [difficulty, dataType, topic, selectedLanguage]);

  const isButtonDisabled = isDisabled || !isAllSelected;

  return (
    <button
      id={id}
      type={type}
      className={`w-full rounded-[15px] bg-gray-400 p-1 text-[14px] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${
        isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={isButtonDisabled}
    >
      {text}
    </button>
  );
}
