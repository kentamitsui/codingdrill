import { UpdateSaveDataEntryProps } from "@/app/type/type";
import React from "react";
import Select from "react-select";

interface ReactSelectProps {
  currentSelectedSavedData: string;
  isDisabled: boolean | undefined;
  handleChangeSavedData: (event: any) => void;
  saveData: UpdateSaveDataEntryProps[];
}

const ReactSelect = ({
  currentSelectedSavedData,
  isDisabled,
  handleChangeSavedData,
  saveData,
}: ReactSelectProps) => {
  // オプションのデータをreact-select用に変換
  const options =
    saveData &&
    saveData?.map((entry) => ({
      value: entry.id,
      label: `Data ${entry.id}: ${entry.timestamp} - difficulty: ${entry.difficulty} / data type: ${entry.dataType} / topic: ${entry.topic} / translate: ${entry.selectedLanguage}`,
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
  }

  const customStyles: CustomStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "0.375rem", // rounded-md
      padding: "0.25rem", // p-1
      transition: "background-color 300ms", // duration-300
      backgroundColor: currentSelectedSavedData !== "" ? "#9CA3AF" : "#E5E7EB", // bg-gray-400 or bg-gray-200
      cursor: isDisabled ? "not-allowed" : "pointer",
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
  };

  return (
    <Select
      name="data"
      id="saveData"
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
