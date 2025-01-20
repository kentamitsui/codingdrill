import { useEffect, useState } from "react";
import { SelectProps } from "@/app/type/type";
import { useAppContext } from "@/app/context/AppContext";
export const Options: React.FC<SelectProps> = ({
  label,
  data,
  name,
  defaultSelected,
  setSelected,
  savedLocalStorageValue,
  iconLight,
  iconDark,
}) => {
  const { isApiLoading, currentTheme } = useAppContext();
  const [currentSelected, setCurrentSelected] = useState("");

  useEffect(() => {
    // 更新関数を用いて、loadボタンが押された時にローカルストレージのデータを呼び出し、optionタグを動的に変更する
    if (
      savedLocalStorageValue !== null &&
      savedLocalStorageValue !== currentSelected
    ) {
      setCurrentSelected(savedLocalStorageValue);
    }
  }, [savedLocalStorageValue, currentSelected]);

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
        className={`w-full rounded-md p-1 duration-300 hover:bg-gray-400 dark:hover:bg-slate-700 ${
          currentTheme === "light"
            ? currentSelected !== ""
              ? "bg-gray-400"
              : "bg-gray-200"
            : currentSelected !== ""
              ? "bg-slate-700"
              : "bg-menu"
        } ${currentSelected !== "" ? "hover:opacity-50" : ""} ${
          isApiLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        } `}
        name={name}
        disabled={isApiLoading}
        value={currentSelected}
        onChange={handleChangeColor}
        style={{
          backgroundImage: `url(${
            currentTheme === "dark" ? iconLight : iconDark
          })`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "calc(100% - 20px) center",
          paddingRight: "30px", // 選択肢の文字と重ならないよう画像分のスペースを確保
          appearance: "auto",
        }}
      >
        <option disabled={true} className="text-start" value={""}>
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
