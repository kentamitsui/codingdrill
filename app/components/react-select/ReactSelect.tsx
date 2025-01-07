import React from "react";
import Select from "react-select";
import { ReactSelectProps } from "@/app/type/type";
import "../../globals.css";
import { useAppContext } from "../AppContext";

export default function ReactSelect({
  currentSelectedSavedData,
  handleChangeSavedData,
  saveData,
  currentTheme,
}: ReactSelectProps) {
  const { isDisabled } = useAppContext();
  // オプションのデータをreact-select用に変換
  const options =
    saveData &&
    saveData?.map((entry) => ({
      value: entry.id,
      label:
        `Data ${entry.id}` +
        "\n" +
        `Time: ${entry.timestamp}` +
        "\n" +
        `Difficulty: ${entry.difficulty} | Data type: ${entry.dataType}` +
        "\n" +
        `Topic: ${entry.topic} | Translate: ${entry.selectedLanguage}`,
    }));

  // プレースホルダーオプション
  const placeholderOption = { value: "", label: "None" };

  // 選択されたオプションを取得
  const selectedOption =
    options?.find((option) => option.value === currentSelectedSavedData) ||
    null;

  // スタイルのカスタマイズ
  interface CustomStyles {
    control: (provided: any, state: any) => any;
    valueContainer: (provided: any) => any;
    input: (provided: any) => any;
    indicatorsContainer: (provided: any) => any;
    indicatorSeparator: (provided: any) => any;
    dropdownIndicator: (provided: any) => any;
    singleValue: (provided: any) => any;
    placeholder: (provided: any) => any;
    menu: (provided: any) => any;
    menuList: (provided: any) => any;
    option: (provided: any, state: any) => any;
  }

  const customStyles: CustomStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "20px",
      minHeight: "30px",
      borderRadius: "6px", // rounded-md
      padding: "4px",
      transition: "300ms",
      backgroundColor:
        currentSelectedSavedData === "" && currentTheme === "dark"
          ? "#0D1117"
          : currentSelectedSavedData === "" && currentTheme === "light"
            ? "#e5e7eb"
            : currentSelectedSavedData !== "" && currentTheme === "dark"
              ? "#334155"
              : currentSelectedSavedData !== "" && currentTheme === "light"
                ? "#9ca3af"
                : "",
      borderColor: currentTheme === "dark" ? "#0D1117" : "#e5e7eb",
      pointerEvents: state.isDisabled ? "auto" : "auto", // ポインターイベントを上書きして有効化
      opacity: state.isDisabled ? 0.5 : 1,
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      "&:hover": {
        backgroundColor: currentTheme === "dark" ? "#334155" : "#9CA3AF",
        opacity: isDisabled || currentSelectedSavedData !== "" ? 0.5 : 1,
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "20px",
      padding: "0px",
      margin: "0px",
    }),
    input: (provided) => ({
      ...provided,
      height: "20px",
      padding: "0px",
      margin: "0px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "20px",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      height: "20px",
      paddingTop: "0px",
      paddingBottom: "0px",
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: "start",
      margin: "0px",
      color: currentTheme === "dark" ? "#d4d4d4" : "#000000", // 文字色
    }),
    placeholder: (provided) => ({
      ...provided,
      height: "20px",
      margin: "0px",
      color: currentTheme === "dark" ? "#d4d4d4" : "#000000", // 文字色
    }),
    menu: (provided) => ({
      ...provided,
      width: "350px", // ドロップダウンメニュー全体の幅を指定
      borderRadius: "8px", // rounded-md
      color: currentTheme === "dark" ? "#d4d4d4" : "#000000", // 文字色
    }),
    menuList: (provided) => ({
      ...provided,
      width: "100%", // メニュー内のリストの幅を親要素(menu)に合わせる
      textAlign: "left", // 必要に応じてカスタマイズ
      padding: "0px",
      borderRadius: "6px", // rounded-md
      color: currentTheme === "dark" ? "#d4d4d4" : "#000000", // 文字色
    }),
    option: (provided, state) => ({
      ...provided,
      whiteSpace: "break-spaces",
      backgroundColor: state.isSelected
        ? currentTheme === "dark"
          ? "#334155"
          : "#e5e7eb" // 選択時の背景色
        : state.isFocused
          ? currentTheme === "dark"
            ? "#475569"
            : "#f3f4f6" // ホバー時の背景色
          : currentTheme === "dark"
            ? "#1f2937"
            : "#ffffff", // 通常時の背景色
      color: state.isSelected
        ? currentTheme === "dark"
          ? "#d4d4d4"
          : "#000000" // 選択時の文字色
        : currentTheme === "dark"
          ? "#d4d4d4"
          : "#000000", // 通常時の文字色
      cursor: isDisabled ? "not-allowed" : "pointer",
    }),
  };

  return (
    <Select
      name="data"
      id="saveData"
      classNamePrefix="react-select"
      value={selectedOption}
      onChange={handleChangeSavedData}
      options={options && options.length > 0 ? options : [placeholderOption]}
      placeholder="Save Data"
      styles={customStyles}
      isDisabled={isDisabled} // 無効化を適用
      isClearable
    />
  );
}
