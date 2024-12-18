import { useAppContext } from "./AppContext";
import { ButtonProps } from "../type/type";

export default function Button({ id, type, text, onClick }: ButtonProps) {
  const { isDisabled } = useAppContext();

  return (
    <button
      id={id}
      type={type}
      className={`w-full rounded-[15px] bg-gray-400 p-1 text-[14px] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${
        isDisabled === true ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}
