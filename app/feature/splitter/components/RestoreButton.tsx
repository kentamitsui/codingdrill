import React from "react";
import { useAppContext } from "@/app/context/AppContext";
import { usePanelContext } from "@/app/feature/splitter/context/PanelContext";
import menuData from "@/app/config/config.json";
import Image from "next/image";

// パネルサイズをリセットするボタン
const RestoreButton = () => {
  const { currentTheme } = useAppContext();
  const { resetHorizontalSizes, resetVerticalSizes } = usePanelContext();

  // 水平方向・垂直方向のパネルサイズをリセットする関数
  const handlePanelSizeReset = () => {
    resetHorizontalSizes();
    resetVerticalSizes();
  };

  return (
    <button
      type="button"
      onClick={handlePanelSizeReset}
      className="flex w-[120px] items-center justify-center rounded-md bg-gray-400 p-1 font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
    >
      Restore
      <Image
        className="ml-2"
        src={
          currentTheme === "dark"
            ? menuData.svgIcon.resetLight
            : menuData.svgIcon.resetDark
        }
        alt={"restore layout"}
        width={20}
        height={20}
      />
    </button>
  );
};

export default RestoreButton;
