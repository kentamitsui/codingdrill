"use client";
import menuData from "../config/config.json";
import Options from "./Options";
import Button from "./Button";
import axios from "axios";
import { useState } from "react";

export const Sidebar: React.FC = () => {
  // 各Optionコンポーネントの値を保持する
  const [language, setLanguage] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [dataType, setDataType] = useState("");
  const [topic, setTopic] = useState("");
  const [displayLanguage, setDisplayLanguage] = useState("");

  // createProblem.tsに選択後の値を送信する
  // 正常にAPIとの送受信が行われたら、受信結果を受け取る
  const handleCreateProblem = async () => {
    try {
      const response = await axios.post("/api/createProblem", {
        language,
        difficulty,
        dataType,
        topic,
        displayLanguage,
      });
      const responseText = response.data.responseText;

      console.log("Response from OpenAI:", responseText);
    } catch (error) {
      console.error("Error occurred while creating a problem:", error);
      alert("Error occurred while creating the problem.");
    }
  };

  return (
    <aside className=" flex h-[500px] w-[150px] flex-col rounded-md bg-gray-200 text-sm dark:bg-[#0d1117]">
      <Options
        label={"select-language"}
        data={menuData.menuLists.languages}
        name={"language"}
        id={"select-language"}
        defaultSelected={"language"}
        setSelected={setLanguage}
      />
      <Options
        label={"select-difficulty"}
        data={menuData.menuLists.difficulty}
        name={"difficulty"}
        id={"select-difficulty"}
        defaultSelected={"difficulty"}
        setSelected={setDifficulty}
      />
      <Options
        label={"select-type"}
        data={menuData.menuLists.dataType}
        name={"type"}
        id={"select-type"}
        defaultSelected={"data type"}
        setSelected={setDataType}
      />
      <Options
        label={"select-topic"}
        data={menuData.menuLists.topics}
        name={"topic"}
        id={"select-topic"}
        defaultSelected={"topic"}
        setSelected={setTopic}
      />
      <Options
        label={"select-display-language"}
        data={menuData.menuLists.displayLanguages}
        name={"display-language"}
        id={"select-display-language"}
        defaultSelected={"display on"}
        setSelected={setDisplayLanguage}
      />
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
          className="m-1 cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-menu dark:hover:bg-slate-700"
          name="data"
          id="savedata"
        ></select>
        <Button id="load" type="button" text="load" />
        <Button id="delete" type="button" text="delete" />
        <Button id="delete-all" type="button" text="delete all" />
      </div>
    </aside>
  );
};

export default Sidebar;
