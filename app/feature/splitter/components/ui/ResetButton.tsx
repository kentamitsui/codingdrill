import { usePanelContext } from "@/app/feature/splitter/context/PanelContext";

// パネルサイズをリセットするボタン
export default function ResetButton() {
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
      className="w-[120px] rounded-md bg-gray-400 p-1 font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
    >
      reset size
    </button>
  );
}
