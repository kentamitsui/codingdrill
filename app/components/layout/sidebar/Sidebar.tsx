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
  // createContextを使用して、InputSectionにデータを渡す
  const {
    isDisabled,
    setIsDisabled,
    setIsCreateProblem,
    difficulty,
    setDifficulty,
    dataType,
    setDataType,
    topic,
    setTopic,
    selectedLanguage,
    setSelectedLanguage,
    saveData,
    setJsonFormattedProblemContent,
    setJsonFormattedReviewContent,
    setLoadedSelectedLanguage,
    setLoadedEditorLanguage,
    setLoadedEditorContent,
    currentTheme,
  } = useAppContext();
  const {
    currentSelectedSavedData,
    setCurrentSelectedSavedData,
    loadSavedData,
    handleDeleteSelected,
    clearLocalStorage,
  } = useLocalStorageContext();

  // セーブデータの値を動的に変更する
  // 修正後のhandleChangeSavedData関数
  const handleChangeSavedData = (selectedOption: { value: string } | null) => {
    if (selectedOption) {
      setCurrentSelectedSavedData(selectedOption.value); // 選択された値を保存
    } else {
      setCurrentSelectedSavedData(""); // 未選択時は空文字列を設定
    }
  };

  // ローカルストレージのデータを各要素に反映する
  const handleLoadData = () => {
    // セーブデータが選択されていない状態でロードボタンを押した場合、アラートを表示する
    if (!currentSelectedSavedData) {
      alert("Please select a valid option to load.");
      return;
    }

    // 選択されたセーブデータのIDを取得
    const selectedId: string | number = currentSelectedSavedData;

    // console.log("selectedId:", selectedId, "\ntype:", typeof selectedId);

    // ローカルストレージに保存されているデータを呼び出し、様々な場所で渡す
    // selectedIdについては、後で型を確認する
    loadSavedData(selectedId, {
      difficulty: setDifficulty,
      dataType: setDataType,
      topic: setTopic,
      selectedLanguage: (newLanguage: string) => {
        setSelectedLanguage(newLanguage); // 選択された言語を設置する
        setLoadedSelectedLanguage(newLanguage); // loadedSelectedLanguage を更新
      },
      problemContent: setJsonFormattedProblemContent,
      editorLanguage: setLoadedEditorLanguage,
      editorContent: setLoadedEditorContent,
      evaluation: setJsonFormattedReviewContent,
    });
  };

  // createProblem.tsに選択後の値を送信する
  // 正常にAPIとの送受信が行われたら、受信結果を受け取る
  const handleCreateProblem = async () => {
    try {
      // ボタンが押されたら、ProblemSection.tsx、InputSection.tsxに表示されている内容を空にする
      setJsonFormattedProblemContent(null);
      setLoadedEditorContent("");
      setJsonFormattedReviewContent(null);
      // ボタンが押されたら、状態関数をtrueに更新しcursor-not-allowed等のスタイルを追加する
      setIsDisabled(true);
      // ボタンが押されたら、状態関数をtrueに更新し、アニメーションを表示する
      setIsCreateProblem(true);

      const response = await fetch("/api/createProblem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          difficulty,
          dataType,
          topic,
          selectedLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create a problem.");
      }
      const data = await response.json();
      const responseText = data.responseText;

      // APIからのレスポンスを確認して、Buttonコンポーネントのスタイルを元に戻す
      // また、アニメーションを非表示にする
      if (responseText) {
        setIsDisabled(false);
        setIsCreateProblem(false);
      }

      const JsonText = JSON.parse(responseText);
      // AppContextのセット関数にデータを設置する
      setJsonFormattedProblemContent(JsonText);
      setSelectedLanguage(selectedLanguage);
    } catch (error) {
      console.error("Error occurred while creating a problem:", error);
      alert("Error occurred while creating the problem.");
    }
  };

  return (
    <aside className="flex max-h-[300px] w-[150px] flex-col rounded-md bg-gray-200 p-1 text-sm dark:bg-[#0d1117]">
      <div className="flex flex-col gap-2">
        {/* <div className="flex flex-row"> */}
        <Options
          label={"select-difficulty"}
          data={menuData.menuLists.difficulty}
          name={"difficulty"}
          defaultSelected={"difficulty"}
          setSelected={setDifficulty}
          savedLocalStorageValue={difficulty}
          iconDark={menuData.svgIcon.difficultyDark}
          iconLight={menuData.svgIcon.difficultyLight}
        />
        {/* <Image
            src={
              currentTheme === "dark"
                ? menuData.svgIcon.difficultyLight
                : menuData.svgIcon.difficultyDark
            }
            alt="Difficulty Icon"
            className="pointer-events-none relative -ml-10"
            width={20}
            height={20}
          /> */}
        {/* </div> */}
        <Options
          label={"select-type"}
          data={menuData.menuLists.dataType}
          name={"type"}
          defaultSelected={"data type"}
          setSelected={setDataType}
          savedLocalStorageValue={dataType}
          iconDark={menuData.svgIcon.dataDark}
          iconLight={menuData.svgIcon.dataLight}
        />
        <Options
          label={"select-topic"}
          data={menuData.menuLists.topics}
          name={"topic"}
          defaultSelected={"topic"}
          setSelected={setTopic}
          savedLocalStorageValue={topic}
          iconLight={menuData.svgIcon.topicLight}
          iconDark={menuData.svgIcon.topicDark}
        />
        <Options
          label={"select-display-language"}
          data={menuData.menuLists.displayLanguages}
          name={"display-language"}
          defaultSelected={"translate"}
          setSelected={setSelectedLanguage}
          savedLocalStorageValue={selectedLanguage}
          iconLight={menuData.svgIcon.translateLight}
          iconDark={menuData.svgIcon.translateDark}
        />
        <Button
          id="create"
          type="button"
          text="Create Problem"
          onClick={handleCreateProblem}
        />
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <label htmlFor="savedata" className="sr-only">
          save data
        </label>
        <ReactSelect
          selectedSaveData={currentSelectedSavedData}
          handleChangeSavedData={handleChangeSavedData}
          isDisabled={isDisabled}
          saveData={saveData}
          currentTheme={currentTheme}
        />
        <details
          className={`relative mt-auto flex w-[142px] flex-col ${
            isDisabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onMouseEnter={(event) =>
            (event.currentTarget.open = isDisabled ? false : true)
          }
          onMouseLeave={(event) => (event.currentTarget.open = false)}
        >
          <summary
            className={`flex w-full justify-between rounded-md bg-gray-400 p-1 duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500 ${
              isDisabled ? "pointer-events-none opacity-50" : "cursor-pointer"
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
              isDisabled ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <SaveDataOptionButton
              id="load"
              type="button"
              text="load"
              onClick={handleLoadData}
            />
            <SaveDataOptionButton
              id="delete"
              type="button"
              text="delete"
              onClick={() => handleDeleteSelected(currentSelectedSavedData)}
            />
            <SaveDataOptionButton
              id="delete-all"
              type="button"
              text="delete all"
              onClick={clearLocalStorage}
            />
          </div>
        </details>
      </div>
    </aside>
  );
}
