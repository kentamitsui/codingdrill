import React from "react";
import Select, { components } from "react-select";
import { ReactSelectProps } from "@/app/type/type";
import "@/app/styles/globals.css";
import { useAppContext } from "@/app/context/AppContext";
import { useLocalStorageContext } from "@/app/feature/localStorage/context/localStorageContext";
import Image from "next/image";

export default function ReactSelect({
  handleChangeSavedData,
  saveData,
  currentTheme,
}: ReactSelectProps) {
  const { isApiLoading } = useAppContext();
  const { currentSelectedSavedDataId } = useLocalStorageContext();

  // ローカルストレージの保存データをreact-select用に変換して表示
  const options =
    saveData &&
    saveData?.map((entry) => ({
      value: entry.id,
      label:
        `Data ${entry.id}` +
        "\n" +
        `Time: ${entry.timestamp}` +
        "\n" +
        `Difficulty: ${entry.difficulty}   Data type: ${entry.dataType}` +
        "\n" +
        `Topic: ${entry.topic}   Translate: ${entry.uiLanguage}`,
    }));

  // カスタムのDropdownIndicatorを作成
  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        {/* SVG画像 */}
        <Image
          src={
            currentTheme === "dark"
              ? "/images/saveLight.svg"
              : "/images/saveDark.svg"
          }
          alt=""
          width={20}
          height={20}
          className="mr-1 h-5 w-5"
        />
        {/* デフォルトの下矢印 open時は向きが逆になる */}
        {props.selectProps.menuIsOpen ? (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke={currentTheme === "dark" ? "#ffffff" : "#000000"} // 矢印の色を切り替え
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-up"
            style={{
              margin: "auto",
            }}
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        ) : (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke={currentTheme === "dark" ? "#ffffff" : "#000000"} // 矢印の色を切り替え
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-down"
            style={{
              margin: "auto",
            }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        )}
      </components.DropdownIndicator>
    );
  };

  // プレースホルダーオプション
  const placeholderOption = { value: null, label: "None" };

  // 選択されたオプションを取得
  const selectedOption =
    options?.find((option) => option.value === currentSelectedSavedDataId) ||
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
      backgroundColor: state.isDisabled
        ? currentSelectedSavedDataId === null && currentTheme === "dark"
          ? "#0D1117"
          : currentSelectedSavedDataId === null && currentTheme === "light"
            ? "#e5e7eb"
            : currentSelectedSavedDataId !== null && currentTheme === "dark"
              ? "#334155"
              : currentSelectedSavedDataId !== null && currentTheme === "light"
                ? "#9ca3af"
                : ""
        : currentSelectedSavedDataId === null && currentTheme === "dark"
          ? "#0D1117"
          : currentSelectedSavedDataId === null && currentTheme === "light"
            ? "#e5e7eb"
            : currentSelectedSavedDataId !== null && currentTheme === "dark"
              ? "#334155"
              : currentSelectedSavedDataId !== null && currentTheme === "light"
                ? "#9ca3af"
                : "",
      borderColor: currentTheme === "dark" ? "#0D1117" : "#e5e7eb",
      pointerEvents: state.isDisabled ? "auto" : "auto", // ポインターイベントを上書きして有効化
      opacity: state.isDisabled ? 0.5 : 1,
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      "&:hover": {
        backgroundColor: state.isDisabled
          ? undefined // 無効化時はマウスオーバーで背景色を変更しない
          : currentTheme === "dark"
            ? "#334155"
            : "#9CA3AF",
        opacity: isApiLoading || currentSelectedSavedDataId !== null ? 0.5 : 1,
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
      color: currentTheme === "dark" ? "#ffffff" : "#000000", // 文字色の切り替え
      caretColor: currentTheme === "dark" ? "#ffffff" : "#000000", // カーソルの色
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
      padding: "0px",
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
      cursor: isApiLoading ? "not-allowed" : "pointer",
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
      isDisabled={isApiLoading} // 無効化を適用
      components={{ DropdownIndicator }}
      isClearable
      isSearchable
    />
  );
}
