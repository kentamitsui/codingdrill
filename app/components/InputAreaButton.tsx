import { useAppContext } from "./AppContext";
import { ButtonProps } from "../type/type";
import { useEffect, useState } from "react";

export default function InputAreaButton({
  id,
  type,
  text,
  onClick,
}: ButtonProps) {
  const {
    isDisabled,
    difficulty,
    dataType,
    topic,
    selectedLanguage,
    jsonFormattedProblemContent,
    checkEditorInputed,
  } = useAppContext();
  // 選択肢が全て選択されたかどうかの状態管理に使用
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isEditorInputedState, setIsEditorInputedState] =
    useState<boolean>(true);

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

  // 全ての選択肢が入力、問題文が出力済、エディタに何らかの入力があった場合、submitボタンのdisabled属性をfalseに切り替えて押せるようにする
  useEffect(() => {
    if (
      isAllSelected === true &&
      jsonFormattedProblemContent !== null &&
      checkEditorInputed !== ""
    ) {
      setIsEditorInputedState(false);
    } else {
      setIsEditorInputedState(true);
    }
  }, [isAllSelected, jsonFormattedProblemContent, checkEditorInputed]);

  const isButtonDisabled = isDisabled || isEditorInputedState;

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
