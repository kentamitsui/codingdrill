import { SelectProps } from "../type/type";
import { useState } from "react";

export const Options: React.FC<SelectProps> = ({
  label,
  data,
  name,
  id,
  defaultSelected,
  setSelected,
}) => {
  const [selected, setLocalSelected] = useState("");
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
        className={`m-1 cursor-pointer rounded-md p-1 duration-300 
          ${selected !== "" ? "bg-gray-400" : "bg-gray-200"}
        dark:${selected !== "" ? "bg-slate-700" : "bg-menu"}
        hover:bg-gray-400 dark:hover:bg-slate-700`}
        name={name}
        id={id}
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
