import { ButtonProps } from "../type/type";

export const Button: React.FC<ButtonProps> = ({
  id,
  type,
  text,
  clicked,
  onClick,
}) => {
  return (
    <button
      id={id}
      type={type}
      className={`m-1 rounded-[15px] bg-gray-400 p-1 text-[1rem] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${
        clicked === true ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={clicked}
    >
      {text}
    </button>
  );
};

export default Button;
