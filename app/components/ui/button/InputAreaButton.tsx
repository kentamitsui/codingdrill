import { useAppContext } from "@/app/context/AppContext";
import { InputAreaButtonProps } from "@/app/type/type";
import { useEffect, useState } from "react";
import Image from "next/image";
import menuData from "@/app/config/config.json";

export default function InputAreaButton({
  id,
  type,
  text,
  onClick,
}: InputAreaButtonProps) {
  const {
    isApiLoading,
    difficulty,
    dataType,
    topic,
    uiLanguage,
    jsonFormattedQuestionText,
    editorInputedLength,
    currentTheme,
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
      uiLanguage !== ""
    ) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [difficulty, dataType, topic, uiLanguage]);

  // 全ての選択肢が入力、問題文が出力済、エディタに何らかの入力があった場合、submitボタンのdisabled属性をfalseに切り替えて押せるようにする
  useEffect(() => {
    if (
      isAllSelected === true &&
      jsonFormattedQuestionText !== null &&
      editorInputedLength &&
      editorInputedLength?.length >= 1 &&
      editorInputedLength?.length <= 5000
    ) {
      setIsEditorInputedState(false);
    } else if (editorInputedLength && editorInputedLength?.length >= 5001) {
      setIsEditorInputedState(true);
    } else {
      setIsEditorInputedState(true);
    }
  }, [isAllSelected, jsonFormattedQuestionText, editorInputedLength]);

  const isButtonDisabled =
    isApiLoading ||
    isEditorInputedState ||
    (editorInputedLength && editorInputedLength?.length <= 0) ||
    false;

  return (
    <button
      id={id}
      type={type}
      className={`flex w-full items-center justify-between rounded-[15px] bg-gray-400 p-1 text-[14px] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${isButtonDisabled ? "cursor-not-allowed opacity-50" : ""}`}
      onClick={onClick}
      disabled={isButtonDisabled}
    >
      <span className="flex-1 text-center">{text}</span>
      <Image
        src={
          text === "Copy"
            ? currentTheme === "dark"
              ? menuData.svgIcon.copyLight
              : menuData.svgIcon.copyDark
            : currentTheme === "dark"
              ? menuData.svgIcon.submitLight
              : menuData.svgIcon.submitDark
        }
        alt=""
        width={20}
        height={20}
      />
    </button>
  );
}
