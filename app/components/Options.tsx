import { useEffect, useState } from "react";
import { SelectProps } from "../type/type";
import { useAppContext } from "./AppContext";

export const Options: React.FC<SelectProps> = ({
  label,
  data,
  name,
  defaultSelected,
  setSelected,
  savedLocalStorageValue,
}) => {
  const { isDisabled } = useAppContext();
  const [currentSelected, setCurrentSelected] = useState("");

  useEffect(() => {
    // 更新関数を用いて、loadボタンが押された時にローカルストレージのデータを呼び出し、optionタグを動的に変更する
    if (savedLocalStorageValue !== null) {
      setCurrentSelected(savedLocalStorageValue);
    }
  }, [savedLocalStorageValue]);

  // 選択が変更される度に、useStateで値を管理・変更する
  const handleChangeColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currentValue = event.target.value;
    setCurrentSelected(currentValue);
    setSelected(currentValue);
  };

  return (
    <>
      <label htmlFor={label} className="sr-only">
        {label}
      </label>
      <select
        className={`w-full rounded-md p-1 duration-300 ${currentSelected !== "" ? "bg-gray-400" : "bg-gray-200"} dark:${currentSelected !== "" ? "bg-slate-700" : "bg-menu"} ${currentSelected !== "" ? "hover:opacity-50" : ""} ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} hover:bg-gray-400 dark:hover:bg-slate-700`}
        name={name}
        disabled={isDisabled}
        value={currentSelected}
        onChange={handleChangeColor}
      >
        <option
          disabled={currentSelected !== "" ? true : false}
          className="text-start"
        >
          {defaultSelected}
        </option>
        {label === "select-topic"
          ? // `optgroup`の構造をループで出力する
            Object.entries(data).map(([groupLabel, options]) => (
              <optgroup key={groupLabel} label={groupLabel}>
                {Object.entries(options).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </optgroup>
            ))
          : // 通常のオプションリストを表示
            Object.entries(data).map(([key, value]) => (
              <option key={key} value={key}>
                {typeof value === "string" ? value : ""}
              </option>
            ))}
      </select>
    </>
  );
};

export default Options;
