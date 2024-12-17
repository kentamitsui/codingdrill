"use client";
import menuData from "../config/config.json";
import Options from "./Options";
import Button from "./Button";
import { useAppContext } from "./AppContext";
import { useLocalStorageContext } from "../feature/localStorage/localStorageContext";
// import Image from "next/image";

export default function Sidebar() {
  // createContextを使用して、InputSectionにデータを渡す
  const {
    isDisabled,
    setIsDisabled,
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
  } = useAppContext();
  const { loadSavedData, handleDeleteSelected, clearLocalStorage } =
    useLocalStorageContext();

  // ローカルストレージのデータを各要素に反映する
  const handleLoadData = () => {
    const selectElement = document.getElementById(
      "saveData",
    ) as HTMLSelectElement;
    const selectedId = parseInt(selectElement.value, 10);

    if (!selectedId) {
      alert("Please select a valid option to load.");
      return;
    }

    // ローカルストレージに保存されているデータを呼び出し、様々な場所で渡す
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
      setLoadedEditorContent(null);
      setJsonFormattedReviewContent(null);
      // ボタンが押されたら、状態関数をtrueに更新しcursor-not-allowed等のスタイルを追加する
      setIsDisabled(true);

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
      if (responseText) {
        setIsDisabled(false);
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
    <aside className="flex h-[500px] w-[150px] flex-col rounded-md bg-gray-200 text-sm dark:bg-[#0d1117]">
      <div className="flex flex-row">
        <Options
          label={"select-difficulty"}
          data={menuData.menuLists.difficulty}
          name={"difficulty"}
          defaultSelected={"difficulty"}
          setSelected={setDifficulty}
          savedLocalStorageValue={difficulty}
        />
        {/* <Image
          src={menuData.svgIcon.difficulty}
          alt=""
          className="relative -ml-10"
          width={20}
          height={20}
        /> */}
      </div>
      <div className="flex flex-row">
        <Options
          label={"select-type"}
          data={menuData.menuLists.dataType}
          name={"type"}
          defaultSelected={"data type"}
          setSelected={setDataType}
          savedLocalStorageValue={dataType}
        />
        {/* <Image
          src={menuData.svgIcon.data}
          alt=""
          className="relative -ml-10"
          width={20}
          height={20}
        /> */}
      </div>
      <div className="flex flex-row">
        <Options
          label={"select-topic"}
          data={menuData.menuLists.topics}
          name={"topic"}
          defaultSelected={"topic"}
          setSelected={setTopic}
          savedLocalStorageValue={topic}
        />
        {/* <Image
          src={menuData.svgIcon.topic}
          alt=""
          className="relative -ml-10"
          width={20}
          height={20}
        /> */}
      </div>
      <div className="flex flex-row">
        <Options
          label={"select-display-language"}
          data={menuData.menuLists.displayLanguages}
          name={"display-language"}
          defaultSelected={"translate"}
          setSelected={setSelectedLanguage}
          savedLocalStorageValue={selectedLanguage}
        />
        {/* <Image
          src={menuData.svgIcon.translate}
          alt=""
          className="relative -ml-10"
          width={20}
          height={20}
        /> */}
      </div>
      <Button
        id="create"
        type="button"
        text="Create Problem"
        onClick={handleCreateProblem}
      />
      <div className="mt-auto flex flex-col gap-1">
        <div
          hidden
          id="speech-bubble"
          className="rounded-[15px] bg-slate-500 p-1 text-center shadow-md"
        >
          success save!
        </div>
        <label htmlFor="savedata"></label>
        <select
          className={`m-1 rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-menu dark:hover:bg-slate-700 ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          name="data"
          id="saveData"
          disabled={isDisabled}
        >
          <option className="text-start" value="">
            Save Data
          </option>
          {saveData.length === 0 ? (
            <option value="" disabled={true}>
              No saved data
            </option>
          ) : (
            saveData.map((entry, index) => (
              <option key={`${entry.id}-${index}`} value={entry.id}>
                {`Data ${entry.id}:  ${entry.timestamp}`}
              </option>
            ))
          )}
        </select>
        <Button id="load" type="button" text="load" onClick={handleLoadData} />
        <Button
          id="delete"
          type="button"
          text="delete"
          onClick={handleDeleteSelected}
        />
        <Button
          id="delete-all"
          type="button"
          text="delete all"
          onClick={clearLocalStorage}
        />
      </div>
    </aside>
  );
}
