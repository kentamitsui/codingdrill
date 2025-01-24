import { useEffect, useState } from "react";
import { OptionProps } from "@/app/type/type";
import { useAppContext } from "@/app/context/AppContext";

const Option: React.FC<OptionProps> = ({
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
  const [currentSelected, setCurrentSelected] = useState<string>("");

  useEffect(() => {
    // 更新関数を用いて、loadボタンが押された時にローカルストレージのデータを呼び出し、optionタグを動的に変更する
    if (savedLocalStorageValue && savedLocalStorageValue !== currentSelected) {
      setCurrentSelected(savedLocalStorageValue);
    }
  }, [savedLocalStorageValue, currentSelected]);

  // 選択が変更される度に、useStateで値を管理・変更する
  const handleChangeColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currentValue = event.target.value;
    setCurrentSelected(currentValue);
    setSelected(currentValue);
  };

  // 型ガード関数を使用して、optionsの型をRecord<string, string>であると判定させる。
  // 1. optionsをunknownとして受け取る(unknownは型定義が保証されるまで操作出来ない)
  // 2. 型述語を利用して、return = trueの場合に`options`の型をRecord<string, string>として返す
  //////////////////////////
  // returnの中身について
  // 1. typeofを使用して、optionsがobject型であるかどうか判定
  // 2. 通常の設定ではnullもobjectとして判定されるので、nullは除外する
  const isOptgroup = (options: unknown): options is Record<string, string> => {
    return typeof options === "object" && options !== null;
  };

  return (
    <>
      <label htmlFor={label} className="sr-only">
        {label}
      </label>
      <select
        className={`w-full rounded-md p-1 duration-300 hover:bg-gray-400 dark:hover:bg-slate-700 ${
          currentTheme === "light"
            ? currentSelected
              ? "bg-gray-400"
              : "bg-gray-200"
            : currentSelected
              ? "bg-slate-700"
              : "bg-menu"
        } ${currentSelected ? "hover:opacity-50" : ""} ${
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
        {Object.entries(data).map(([groupLabel, options]) =>
          isOptgroup(options) ? (
            <optgroup key={groupLabel} label={groupLabel}>
              {Object.entries(options).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </optgroup>
          ) : (
            <option key={groupLabel} value={groupLabel}>
              {options}
            </option>
          ),
        )}
      </select>
    </>
  );
};

export default Option;
