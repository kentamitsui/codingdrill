"use client";
import menuData from "../config/config.json";
import Options from "./Options";
import Button from "./Button";

export default function Sidebar() {
  return (
    <aside className="flex h-[500px] w-[150px] flex-col gap-1 rounded-md bg-gray-200 text-sm duration-300 dark:bg-menu">
      <Options
        label={"select-language"}
        data={menuData.menuLists.languages}
        name={"language"}
        id={"select-language"}
        defaultSelected={"language"}
      />
      <Options
        label={"select-difficulty"}
        data={menuData.menuLists.difficulty}
        name={"difficulty"}
        id={"select-difficulty"}
        defaultSelected={"difficulty"}
      />
      <Options
        label={"select-type"}
        data={menuData.menuLists.dataType}
        name={"type"}
        id={"select-type"}
        defaultSelected={"data type"}
      />
      <Options
        label={"select-topic"}
        data={menuData.menuLists.topics}
        name={"topic"}
        id={"select-topic"}
        defaultSelected={"topic"}
      />
      <Options
        label={"select-display-language"}
        data={menuData.menuLists.displayLanguages}
        name={"display-language"}
        id={"select-display-language"}
        defaultSelected={"display on"}
      />
      <Button id="create" type="submit" text="create problem" />
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
}
