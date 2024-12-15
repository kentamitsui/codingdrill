import { useEffect, useState } from "react";
import { SelectProps } from "../type/type";

export const Options: React.FC<SelectProps> = ({
  label,
  data,
  name,
  disabled,
  defaultSelected,
  setSelected,
  savedLocalStorageValue,
}) => {
  const [selected, setLocalSelected] = useState("");

  useEffect(() => {
    // 更新関数を用いて、loadボタンが押された時にローカルストレージのデータを呼び出し、optionタグの文字列を動的に変更する
    if (savedLocalStorageValue !== undefined) {
      setLocalSelected(savedLocalStorageValue);
    }
  }, [savedLocalStorageValue]);

  const handleChangeColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setLocalSelected(value);

    if (setSelected) {
      setSelected(value);
    }
  };

  return (
    <>
      <label htmlFor={label}></label>
      <select
        className={`m-1 w-[142px] rounded-md p-1 duration-300 ${selected !== "" ? "bg-gray-400" : "bg-gray-200"} dark:${selected !== "" ? "bg-slate-700" : "bg-menu"} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} hover:bg-gray-400 dark:hover:bg-slate-700`}
        name={name}
        disabled={disabled}
        value={selected} // 状態関数と表示内容を同期させるために設定
        onChange={handleChangeColor}
      >
        <option
          disabled={selected !== "" ? true : false}
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
