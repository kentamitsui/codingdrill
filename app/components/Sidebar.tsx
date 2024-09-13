"use client";
import { useState } from "react";
import menuData from "../config/config.json";
import Options from "./Options";

export default function Sidebar() {
  const [selected, SetSelected] = useState("");

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
      <button
        id="create"
        type="submit"
        className="m-1 rounded-[15px] bg-gray-400 p-1 text-[1rem] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
      >
        create problem
      </button>
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
        <button
          id="load"
          type="button"
          className="m-1 rounded-[15px] bg-gray-400 p-1 text-[1rem] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
        >
          load
        </button>
        <button
          id="delete"
          type="button"
          className="m-1 rounded-[15px] bg-gray-400 p-1 text-[1rem] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
        >
          delete
        </button>
        <button
          id="delete-all"
          type="button"
          className="m-1 rounded-[15px] bg-gray-400 p-1 text-[1rem] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
        >
          delete all
        </button>
      </div>
    </aside>
  );
}
