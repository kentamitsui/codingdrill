import { useAppContext } from "@/app/context/AppContext";
import { BaseButtonProps } from "@/app/type/type";
import Image from "next/image";
import menuData from "@/app/config/config.json";

const EditorActionButton = ({ type, text, onClick }: BaseButtonProps) => {
  const {
    isApiLoading,
    difficulty,
    dataType,
    topic,
    uiLanguage,
    jsonQuestionText,
    currentEditorInputed,
    currentTheme,
  } = useAppContext();
  // 選択肢が全て選択されたかどうかの状態管理に使用
  const isAllSelected =
    difficulty !== "" && dataType !== "" && topic !== "" && uiLanguage !== "";

  // 全ての選択肢が入力、問題文が出力済、エディタに何らかの入力があった場合、submitボタンのdisabled属性をfalseに切り替えて押せるようにする
  // NOT演算子(!)を活用
  const isEditorInputedState =
    !isAllSelected ||
    jsonQuestionText === null ||
    !currentEditorInputed ||
    currentEditorInputed.length < 1 ||
    currentEditorInputed.length > 5000;

  const isButtonDisabled = isApiLoading || isEditorInputedState;

  return (
    <button
      type={type}
      className={`flex w-full items-center justify-between rounded-[15px] bg-gray-400 p-1 text-[14px] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${isButtonDisabled ? "cursor-not-allowed opacity-50" : ""}`}
      onClick={onClick}
      disabled={isButtonDisabled}
    >
      <span className="flex-1 text-center">{text}</span>
      <Image
        src={
          currentTheme === "dark"
            ? text === "Copy"
              ? menuData.svgIcon.copyLight
              : menuData.svgIcon.submitLight
            : text === "Copy"
              ? menuData.svgIcon.copyDark
              : menuData.svgIcon.submitDark
        }
        alt=""
        width={20}
        height={20}
      />
    </button>
  );
};

export default EditorActionButton;
