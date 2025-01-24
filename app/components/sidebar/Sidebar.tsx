"use client";

import menuData from "@/app/config/config.json";
import Option from "@/app/components/option/Option";
import BaseButton from "@/app/components/button/BaseButton";
import SaveActionButton from "@/app/components/button/SaveActionButton";
import { useAppContext } from "@/app/context/AppContext";
import { useLocalStorageContext } from "@/app/feature/storage/context/StorageContext";
import dynamic from "next/dynamic";
const ReactSelect = dynamic(
  () => import("@/app/feature/react-select/ReactSelect"),
  {
    ssr: false,
  },
);
import Image from "next/image";
import { ProblemContentProps } from "@/app/type/type";

const Sidebar = () => {
  // アプリ全体の状態管理（問題作成、データ取得）
  const {
    isApiLoading,
    setIsApiLoading,
    setIsQuestionCreating,
    difficulty,
    setDifficulty,
    dataType,
    setDataType,
    topic,
    setTopic,
    uiLanguage,
    setUiLanguage,
    saveData,
    setJsonFormattedQuestionText,
    setReviewText,
    setStoredEditorCode,
    currentTheme,
  } = useAppContext();
  // ローカルストレージに関するデータ管理
  const {
    currentSelectedSavedDataId,
    setCurrentSelectedSavedDataId,
    loadSavedData,
    handleDeleteSelected,
    clearLocalStorage,
  } = useLocalStorageContext();

  // セーブデータの状態(ID)を更新する
  const handleChangeSavedData = (selectedOption: { value: number } | null) => {
    setCurrentSelectedSavedDataId(selectedOption?.value || null);
  };

  // 問題文を生成する
  const handleCreateQuestion = async () => {
    // ボタンが押されたら、各エリアの内容を空にする
    setJsonFormattedQuestionText(null);
    setStoredEditorCode("");
    setReviewText(null);
    // ボタンが押されたら、ボタンコンポーネントに対してcursor-not-allowed等のスタイルを追加する
    setIsApiLoading(true);
    // ボタンが押されたら、アニメーションを表示する
    setIsQuestionCreating(true);

    try {
      const response = await fetch("/api/createQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          difficulty,
          dataType,
          topic,
          uiLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create a question.");
      }

      const { responseText } = await response.json();

      if (responseText) {
        // APIからのレスポンスがあれば、Buttonコンポーネントのスタイルを元に戻す
        setIsApiLoading(false);
        // ローディングアニメーションを非表示にする
        setIsQuestionCreating(false);
      }

      // 型ガード関数を使用して、APIからのレスポンスが正しい形式であるかを判定する
      const isProblemContentProps = (
        responseObject: unknown,
      ): responseObject is ProblemContentProps => {
        return typeof responseObject === "object" && responseObject !== null;
      };

      // AppContextのセット関数にデータを設置する
      if (isProblemContentProps(JSON.parse(responseText))) {
        setJsonFormattedQuestionText(JSON.parse(responseText));
        setUiLanguage(uiLanguage);
      } else {
        console.error("Invalid API response format:", JSON.parse(responseText));
      }
    } catch (error) {
      console.error("Error occurred while creating a problem:", error);
      alert("Error occurred while creating the problem.");
    }
  };

  return (
    <aside className="flex max-h-[300px] w-[150px] flex-col rounded-md bg-gray-200 p-1 text-sm dark:bg-[#0d1117]">
      <div className="flex flex-col gap-2">
        <Option
          label={"select-difficulty"}
          data={menuData.menuLists.difficulty}
          name={"difficulty"}
          defaultSelected={"Difficulty"}
          setSelected={setDifficulty}
          savedLocalStorageValue={difficulty}
          iconDark={menuData.svgIcon.difficultyDark}
          iconLight={menuData.svgIcon.difficultyLight}
        />
        <Option
          label={"select-type"}
          data={menuData.menuLists.dataType}
          name={"type"}
          defaultSelected={"Data Type"}
          setSelected={setDataType}
          savedLocalStorageValue={dataType}
          iconDark={menuData.svgIcon.dataDark}
          iconLight={menuData.svgIcon.dataLight}
        />
        <Option
          label={"select-topic"}
          data={menuData.menuLists.topics}
          name={"topic"}
          defaultSelected={"Topic"}
          setSelected={setTopic}
          savedLocalStorageValue={topic}
          iconLight={menuData.svgIcon.topicLight}
          iconDark={menuData.svgIcon.topicDark}
        />
        <Option
          label={"select-display-language"}
          data={menuData.menuLists.displayLanguages}
          name={"display-language"}
          defaultSelected={"Translate"}
          setSelected={setUiLanguage}
          savedLocalStorageValue={uiLanguage}
          iconLight={menuData.svgIcon.translateLight}
          iconDark={menuData.svgIcon.translateDark}
        />
        <BaseButton
          type="button"
          text="Generate"
          onClick={handleCreateQuestion}
        />
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <label htmlFor="savedata" className="sr-only">
          save data
        </label>
        <ReactSelect
          selectedSaveData={currentSelectedSavedDataId}
          handleChangeSavedData={handleChangeSavedData}
          isApiLoading={isApiLoading}
          saveData={saveData}
          currentTheme={currentTheme}
        />
        <details
          className={`relative mt-auto flex w-[142px] flex-col ${
            isApiLoading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onMouseEnter={(event) =>
            (event.currentTarget.open = isApiLoading ? false : true)
          }
          onMouseLeave={(event) => (event.currentTarget.open = false)}
        >
          <summary
            className={`flex w-full justify-between rounded-md bg-gray-400 p-1 duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500 ${
              isApiLoading ? "pointer-events-none opacity-50" : "cursor-pointer"
            }`}
          >
            Options
            <Image
              src={
                currentTheme === "dark"
                  ? menuData.svgIcon.listLight
                  : menuData.svgIcon.listDark
              }
              alt=""
              width={20}
              height={20}
            />
          </summary>
          <div
            className={`absolute -right-[4px] z-10 flex w-[150px] flex-col gap-2 rounded-b-md bg-opacity-0 p-[8px_4px_4px_4px] ${
              isApiLoading ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <SaveActionButton
              type="button"
              text="Load"
              onClick={() => loadSavedData()}
            />
            <SaveActionButton
              type="button"
              text="Delete"
              onClick={() => handleDeleteSelected()}
            />
            <SaveActionButton
              type="button"
              text="All Delete"
              onClick={() => clearLocalStorage()}
            />
          </div>
        </details>
      </div>
    </aside>
  );
};

export default Sidebar;
