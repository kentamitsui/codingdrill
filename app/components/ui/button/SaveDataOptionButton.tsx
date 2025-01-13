import { useAppContext } from "@/app/context/AppContext";
import { ButtonProps } from "@/app/type/type";
import Image from "next/image";

export default function SaveDataOptionButton({
  id,
  type,
  text,
  iconLight,
  iconDark,
  onClick,
}: ButtonProps) {
  const { isDisabled, currentTheme } = useAppContext();

  return (
    <button
      id={id}
      type={type}
      className={`flex w-full items-center justify-between rounded-[15px] bg-gray-400 p-1 text-[14px] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${
        isDisabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={isDisabled}
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
