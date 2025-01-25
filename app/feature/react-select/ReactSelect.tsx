import React from "react";
import Select, { components } from "react-select";
import { ReactSelectProps } from "@/app/type/type";
import "@/app/styles/globals.css";
import { useAppContext } from "@/app/context/AppContext";
import { useLocalStorageContext } from "@/app/feature/storage/context/StorageContext";
import Image from "next/image";

export default function ReactSelect({
  handleChangeSavedData,
  saveData,
}: ReactSelectProps) {
  const { isApiLoading, currentTheme } = useAppContext();
  const { currentSelectedSavedDataId } = useLocalStorageContext();

  // React-Selectのオプションデータを作成
  // ローカルストレージの保存データをreact-select用に変換して表示
  const options =
    saveData &&
    saveData?.map((entry) => ({
      value: entry.id,
      label:
        `Data ${entry.id}` +
        "\n" +
        `Date: ${entry.timestamp}` +
        "\n" +
        `Difficulty: ${entry.difficulty}   Data type: ${entry.dataType}` +
        "\n" +
        `Topic: ${entry.topic}   Translate: ${entry.uiLanguage}`,
    }));

  // カスタムのDropdownIndicator(アイコン付きドロップダウン)
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
          alt="save data icon"
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

  // プレースホルダーの設定(デフォルト値)
  const placeholderOption = {
    value: currentSelectedSavedDataId,
    label: "None",
  };

  // 現在選択中のオプションを取得
  const selectedOption =
    options?.find((option) => option.value === currentSelectedSavedDataId) ||
    null;

  // react-select のカスタムスタイル
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
    // 選択された値のコンテナ(選択エリアのスタイル)
    valueContainer: (provided) => ({
      ...provided,
      height: "20px", // 選択エリアの高さ
      padding: "0px", // 余白を削除
      margin: "0px", // マージンを削除
    }),
    // ユーザーが入力するテキストエリア(検索ボックス)
    input: (provided) => ({
      ...provided,
      height: "20px", // 入力エリアの高さ
      padding: "0px", // 余白を削除
      margin: "0px", // マージンを削除
      color: currentTheme === "dark" ? "#ffffff" : "#000000", // 文字色(テーマに応じて変更)
      caretColor: currentTheme === "dark" ? "#ffffff" : "#000000", // カーソルの色
    }),
    // インジケーターコンテナ(アイコン部分のスタイル)
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "20px", // アイコンエリアの高さ
    }),
    // インジケーター(区切り線)のスタイル(非表示)
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none", // 区切り線を非表示にする
    }),
    // ドロップダウンのインジケーター(開閉ボタンのアイコン)
    dropdownIndicator: (provided) => ({
      ...provided,
      height: "20px", // ドロップダウンアイコンの高さ
      padding: "0px", // 余白を削除
    }),
    // 選択された値(単一選択の場合のテキスト表示)
    singleValue: (provided) => ({
      ...provided,
      textAlign: "start", // テキストを左寄せ
      margin: "0px", // マージンを削除
      color: currentTheme === "dark" ? "#d4d4d4" : "#000000", // 文字色(テーマに応じて変更)
    }),
    // プレースホルダー(選択されていない場合の表示テキスト)
    placeholder: (provided) => ({
      ...provided,
      height: "20px", // プレースホルダーエリアの高さ
      margin: "0px", // マージンを削除
      color: currentTheme === "dark" ? "#d4d4d4" : "#000000", // 文字色(テーマに応じて変更)
    }),
    // ドロップダウンメニュー全体のスタイル
    menu: (provided) => ({
      ...provided,
      width: "350px", // ドロップダウンメニュー全体の幅を指定
      borderRadius: "8px", // rounded-md
      color: currentTheme === "dark" ? "#d4d4d4" : "#000000", // 文字色
    }),
    // ドロップダウンメニュー内のリストスタイル
    menuList: (provided) => ({
      ...provided,
      width: "100%", // リストの幅をメニューに合わせる
      textAlign: "left", // 左寄せ
      padding: "0px", // 余白を削除
      borderRadius: "6px", // 角を丸くする(rounded-md)
      color: currentTheme === "dark" ? "#d4d4d4" : "#000000", // 文字色(テーマに応じて変更)
    }),
    // 各オプション(選択肢)のスタイル
    option: (provided, state) => ({
      ...provided,
      whiteSpace: "break-spaces", // テキストの折り返しを有効化
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
      cursor: isApiLoading ? "not-allowed" : "pointer", // APIリクエスト中は無効化
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
      isDisabled={isApiLoading} // APIリクエスト中は無効化を適用
      components={{ DropdownIndicator }}
      isClearable // クリアボタンを表示
      isSearchable // 検索機能を有効化
    />
  );
}
