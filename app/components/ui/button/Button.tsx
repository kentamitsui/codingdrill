import { useAppContext } from "@/app/context/AppContext";
import { ButtonProps } from "@/app/type/type";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Button({
  id,
  type,
  text,
  iconLight,
  iconDark,
  onClick,
}: ButtonProps) {
  const {
    isApiLoading,
    difficulty,
    dataType,
    topic,
    uiLanguage,
    currentTheme,
  } = useAppContext();
  // 選択肢が全て選択されたかどうかの状態管理に使用
  const [isAllSelected, setIsAllSelected] = useState(false);

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

  const isButtonDisabled = isApiLoading || !isAllSelected;

  return (
    <button
      id={id}
      type={type}
      className={`flex w-full items-center justify-between rounded-[15px] bg-gray-400 p-1 text-[14px] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${
        isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
      } `}
      onClick={onClick}
      disabled={isButtonDisabled}
    >
      <span className="flex-1 text-center">{text}</span>
      <Image
        src={currentTheme === "dark" ? iconLight : iconDark}
        alt=""
        width={20}
        height={20}
      />
    </button>
  );
}
