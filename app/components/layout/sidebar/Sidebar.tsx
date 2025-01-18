"use client";

import menuData from "@/app/config/config.json";
import Options from "@/app/components/ui/select/Options";
import Button from "@/app/components/ui/button/Button";
import SaveDataOptionButton from "@/app/components/ui/button/SaveDataOptionButton";
import { useAppContext } from "@/app/context/AppContext";
import { useLocalStorageContext } from "@/app/feature/localStorage/context/localStorageContext";
import dynamic from "next/dynamic";
const ReactSelect = dynamic(
  () => import("@/app/components/ui/select/react-select/ReactSelect"),
  {
    ssr: false,
  },
);
import Image from "next/image";

export default function Sidebar() {
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
    setStoredUiLanguage,
    setStoredEditorLanguage,
    setStoredEditorCode,
    currentTheme,
  } = useAppContext();
  // ローカルストレージに関するデータ管理
  const {
    currentSelectedSavedData,
    setCurrentSelectedSavedData,
    loadSavedData,
    handleDeleteSelected,
    clearLocalStorage,
  } = useLocalStorageContext();

  // セーブデータの状態(ID)を更新する
  const handleChangeSavedData = (selectedOption: { value: string } | null) => {
    setCurrentSelectedSavedData(selectedOption?.value ?? "");
  };

  // ローカルストレージからを各要素をロードする
  const handleLoadData = () => {
    // セーブデータが選択されていない状態でロードボタンを押した場合、アラートを表示する
    if (!currentSelectedSavedData) {
      alert("Please select a load data.");
      return;
    }

    // console.log("selectedId:", selectedId, "\ntype:", typeof selectedId);

    // ローカルストレージに保存されているデータを呼び出し、様々な場所で渡す
    loadSavedData(currentSelectedSavedData, {
      difficulty: setDifficulty,
      dataType: setDataType,
      topic: setTopic,
      uiLanguage: (newLanguage: string) => {
        setUiLanguage(newLanguage); // 選択された言語を設置する
        setStoredUiLanguage(newLanguage); // storedUiLanguage を更新
      },
      problemContent: setJsonFormattedQuestionText,
      editorLanguage: setStoredEditorLanguage,
      editorContent: setStoredEditorCode,
      evaluation: setReviewText,
    });
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

      // AppContextのセット関数にデータを設置する
      setJsonFormattedQuestionText(JSON.parse(responseText));
      setUiLanguage(uiLanguage);
    } catch (error) {
      console.error("Error occurred while creating a problem:", error);
      alert("Error occurred while creating the problem.");
    }
  };

  return (
    <aside className="flex max-h-[300px] w-[150px] flex-col rounded-md bg-gray-200 p-1 text-sm dark:bg-[#0d1117]">
      <div className="flex flex-col gap-2">
        <Options
          label={"select-difficulty"}
          data={menuData.menuLists.difficulty}
          name={"difficulty"}
          defaultSelected={"Difficulty"}
          setSelected={setDifficulty}
          savedLocalStorageValue={difficulty}
          iconDark={menuData.svgIcon.difficultyDark}
          iconLight={menuData.svgIcon.difficultyLight}
        />
        <Options
          label={"select-type"}
          data={menuData.menuLists.dataType}
          name={"type"}
          defaultSelected={"Data Type"}
          setSelected={setDataType}
          savedLocalStorageValue={dataType}
          iconDark={menuData.svgIcon.dataDark}
          iconLight={menuData.svgIcon.dataLight}
        />
        <Options
          label={"select-topic"}
          data={menuData.menuLists.topics}
          name={"topic"}
          defaultSelected={"Topic"}
          setSelected={setTopic}
          savedLocalStorageValue={topic}
          iconLight={menuData.svgIcon.topicLight}
          iconDark={menuData.svgIcon.topicDark}
        />
        <Options
          label={"select-display-language"}
          data={menuData.menuLists.displayLanguages}
          name={"display-language"}
          defaultSelected={"Translate"}
          setSelected={setUiLanguage}
          savedLocalStorageValue={uiLanguage}
          iconLight={menuData.svgIcon.translateLight}
          iconDark={menuData.svgIcon.translateDark}
        />
        <Button
          id="create"
          type="button"
          text="Generate"
          iconLight={menuData.svgIcon.submitLight}
          iconDark={menuData.svgIcon.submitDark}
          onClick={handleCreateQuestion}
        />
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <label htmlFor="savedata" className="sr-only">
          save data
        </label>
        <ReactSelect
          selectedSaveData={currentSelectedSavedData}
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
            <SaveDataOptionButton
              id="load"
              type="button"
              text="Load"
              iconLight={menuData.svgIcon.loadLight}
              iconDark={menuData.svgIcon.loadDark}
              onClick={handleLoadData}
            />
            <SaveDataOptionButton
              id="delete"
              type="button"
              text="Delete"
              iconLight={menuData.svgIcon.deteleLight}
              iconDark={menuData.svgIcon.deteleDark}
              onClick={() => handleDeleteSelected(currentSelectedSavedData)}
            />
            <SaveDataOptionButton
              id="delete-all"
              type="button"
              text="All Delete"
              iconLight={menuData.svgIcon.deteleAllLight}
              iconDark={menuData.svgIcon.deteleAllDark}
              onClick={clearLocalStorage}
            />
          </div>
        </details>
      </div>
    </aside>
  );
}
