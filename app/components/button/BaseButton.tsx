import React from "react";
import Image from "next/image";
import { useAppContext } from "@/app/context/AppContext";
import { BaseButtonProps } from "@/app/type/type";
import menuData from "@/app/config/config.json";

const BaseButton = ({ type, text, onClick }: BaseButtonProps) => {
  const {
    isApiLoading,
    difficulty,
    dataType,
    topic,
    uiLanguage,
    currentTheme,
  } = useAppContext();
  // 選択肢が全て選択されているかどうか、またAPI通信中かどうかでdisabled属性を切り替える
  const isAllSelected =
    difficulty !== "" && dataType !== "" && topic !== "" && uiLanguage !== "";
  const isButtonDisabled = isApiLoading || !isAllSelected; // NOT論理(!)を使用

  return (
    <button
      type={type}
      className={`flex w-full items-center justify-between rounded-[15px] bg-gray-400 p-1 text-[14px] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${
        isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
      } `}
      onClick={onClick}
      disabled={isButtonDisabled}
    >
      <span className="flex-1 text-center">{text}</span>
      <Image
        src={
          currentTheme === "dark"
            ? menuData.svgIcon.submitLight
            : menuData.svgIcon.submitDark
        }
        alt=""
        width={20}
        height={20}
      />
    </button>
  );
};

export default BaseButton;
