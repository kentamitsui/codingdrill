"use client";

import { usePanelContext } from "./PanelContext";

export default function ResetButton() {
  const { resetPanelSizes } = usePanelContext();

  return (
    <button
      onClick={resetPanelSizes}
      className="w-[120px] rounded-md bg-gray-400 p-1 font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
    >
      reset panel
    </button>
  );
}
