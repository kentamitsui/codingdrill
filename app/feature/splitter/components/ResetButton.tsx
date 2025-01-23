import { useAppContext } from "@/app/context/AppContext";
import { usePanelContext } from "@/app/feature/splitter/context/PanelContext";
import Image from "next/image";

interface ResetButtonProps {
  lightSvgSrc: string;
  darkSvgSrc: string;
  altText: string;
}

// パネルサイズをリセットするボタン
export default function ResetButton({
  lightSvgSrc,
  darkSvgSrc,
  altText,
}: ResetButtonProps) {
  const { currentTheme } = useAppContext();
  const { resetHorizontalPanelSizes, resetVerticalPanelSizes } =
    usePanelContext();

  // 水平方向・垂直方向のパネルサイズをリセットする関数
  const handlePanelSizeReset = () => {
    resetHorizontalPanelSizes();
    resetVerticalPanelSizes();
  };

  return (
    <button
      onClick={handlePanelSizeReset}
      className="flex w-[120px] items-center justify-center rounded-md bg-gray-400 p-1 font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
    >
      Restore
      <Image
        className="ml-2"
        src={currentTheme === "dark" ? lightSvgSrc : darkSvgSrc}
        alt={altText}
        width={20}
        height={20}
      />
    </button>
  );
}
