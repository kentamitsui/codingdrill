"use client";
import menuData from "../config/config.json";
import Options from "./Options";
import Button from "./Button";
import { SidebarProps } from "../type/type";
import { useAppContext } from "../feature/localStorage/AppContext";
// import Image from "next/image";

export default function Sidebar({
  setProblemData,
  setDisplayLanguageData,
  setIsDisabledData,
  getIsDisabledData,
}: SidebarProps) {
  // createContextを使用して、InputSectionにデータを渡す
  const {
    selectedDifficulty,
    setSelectedDifficulty,
    selectedDataType,
    setSelectedDataType,
    selectedTopic,
    setSelectedTopic,
    selectedLanguagePreference,
    setSelectedLanguagePreference,
    reviewData,
  } = useAppContext();

  // createProblem.tsに選択後の値を送信する
  // 正常にAPIとの送受信が行われたら、受信結果を受け取る
  const handleCreateProblem = async () => {
    try {
      // ボタンが押されたら、ProblemSection.tsxに表示されている文字列をclearする
      setProblemData(null);
      // ボタンが押されたら、状態関数をtrueに更新しcursor-not-allowed等のスタイルを追加する
      setIsDisabledData(true);

      const response = await fetch("/api/createProblem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedDifficulty,
          selectedDataType,
          selectedTopic,
          selectedLanguagePreference,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create a problem.");
      }
      const data = await response.json();
      const responseText = data.responseText;
      // APIからのレスポンスを確認して、Buttonコンポーネントのスタイルを元に戻す
      if (responseText) {
        setIsDisabledData(false);
      }

      const JsonText = JSON.parse(responseText);
      // 親コンポーネント(Main)のセット関数にJSONオブジェクトを設置する
      setProblemData(JsonText);
      setDisplayLanguageData(selectedLanguagePreference);
      // console.log(JsonText);
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
          disabled={getIsDisabledData}
          defaultSelected={"difficulty"}
          setSelected={setSelectedDifficulty}
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
          disabled={getIsDisabledData}
          defaultSelected={"data type"}
          setSelected={setSelectedDataType}
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
          disabled={getIsDisabledData}
          defaultSelected={"topic"}
          setSelected={setSelectedTopic}
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
          disabled={getIsDisabledData}
          defaultSelected={"translate"}
          setSelected={setSelectedLanguagePreference}
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
        clicked={getIsDisabledData}
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
          className="m-1 cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-menu dark:hover:bg-slate-700"
          name="data"
          id="saveData"
        >
          <option className="text-start" value="">
            Save Data
          </option>
          {reviewData.length === 0 ? (
            <option value="" disabled={true}>
              No saved data
            </option>
          ) : (
            reviewData.map((entry, index) => (
              <option key={`${entry.id}-${index}`} value={entry.id}>
                {`${entry.timestamp} - Data ${entry.id}`}
              </option>
            ))
          )}
        </select>
        <Button
          id="load"
          type="button"
          text="load"
          clicked={getIsDisabledData}
        />
        <Button
          id="delete"
          type="button"
          text="delete"
          clicked={getIsDisabledData}
        />
        <Button
          id="delete-all"
          type="button"
          text="delete all"
          clicked={getIsDisabledData}
        />
      </div>
    </aside>
  );
}
