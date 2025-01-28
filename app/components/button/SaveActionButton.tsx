import React from "react";
import Image from "next/image";
import { useAppContext } from "@/app/context/AppContext";
import { BaseButtonProps } from "@/app/type/type";
import menuData from "@/app/config/config.json";

const SaveActionButton = ({ type, text, onClick }: BaseButtonProps) => {
  const { isApiLoading, currentTheme } = useAppContext();

  return (
    <button
      type={type}
      className={`flex w-full items-center justify-between rounded-[15px] bg-gray-400 p-1 text-[14px] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${
        isApiLoading ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={isApiLoading}
    >
      <span className="flex-1 text-center">{text}</span>
      <Image
        src={
          currentTheme === "dark"
            ? text === "Load"
              ? menuData.svgIcon.loadLight
              : text === "Delete"
                ? menuData.svgIcon.deleteLight
                : text === "All Delete"
                  ? menuData.svgIcon.deleteAllLight
                  : menuData.svgIcon.loadDark
            : text === "Load"
              ? menuData.svgIcon.loadDark
              : text === "Delete"
                ? menuData.svgIcon.deleteDark
                : text === "All Delete"
                  ? menuData.svgIcon.deleteAllDark
                  : menuData.svgIcon.loadLight
        }
        alt={""}
        width={20}
        height={20}
      />
    </button>
  );
};

export default SaveActionButton;
