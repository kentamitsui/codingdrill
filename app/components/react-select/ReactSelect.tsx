import { UpdateSaveDataEntryProps } from "@/app/type/type";
import React from "react";
import Select from "react-select";

interface ReactSelectProps {
  currentSelectedSavedData: string;
  isDisabled: boolean | undefined;
  handleChangeSavedData: (event: any) => void;
  saveData: UpdateSaveDataEntryProps[];
  currentTheme: string | undefined;
}

const ReactSelect = ({
  currentSelectedSavedData,
  isDisabled,
  handleChangeSavedData,
  saveData,
  currentTheme,
}: ReactSelectProps) => {
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
  const placeholderOption = { value: "", label: "Save Data" };

  // 選択されたオプションを取得
  const selectedOption =
    options?.find((option) => option.value === currentSelectedSavedData) ||
    null;

  // スタイルのカスタマイズ
  interface CustomStyles {
    control: (provided: any) => any;
    singleValue: (provided: any) => any;
    placeholder: (provided: any) => any;
    menu: (provided: any) => any;
    menuList: (provided: any) => any;
  }

  const customStyles: CustomStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "0.375rem", // rounded-md
      padding: "0.25rem", // p-1
      transition: "background-color 300ms", // duration-300
      backgroundColor:
        currentSelectedSavedData !== ""
          ? currentTheme === "dark"
            ? "#374151" // ダークモード時の背景色 (bg-gray-700 相当)
            : "#9CA3AF" // ライトモード時の背景色 (bg-gray-400 相当)
          : currentTheme === "dark"
            ? "#1F2937" // ダークモード時の背景色 (bg-gray-800 相当)
            : "#E5E7EB", // ライトモード時の背景色 (bg-gray-200 相当)      cursor: isDisabled ? "not-allowed" : "pointer",
      opacity: isDisabled ? 0.5 : 1,
      "&:hover": {
        backgroundColor: "#9CA3AF", // hover:bg-gray-400
        opacity: currentSelectedSavedData !== "" ? 0.5 : 1,
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: "start",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6B7280", // text-gray-500
    }),
    menu: (provided) => ({
      ...provided,
      width: "350px", // ドロップダウンメニュー全体の幅を指定
    }),
    menuList: (provided) => ({
      ...provided,
      width: "100%", // メニュー内のリストの幅を親要素(menu)に合わせる
      textAlign: "left", // 必要に応じてカスタマイズ
    }),
  };

  return (
    <Select
      name="data"
      id="saveData"
      className="whitespace-break-spaces"
      value={selectedOption}
      onChange={handleChangeSavedData}
      options={options && options.length > 0 ? options : [placeholderOption]}
      isDisabled={isDisabled}
      placeholder="Save Data"
      styles={customStyles}
      isClearable
    />
  );
};

export default ReactSelect;
