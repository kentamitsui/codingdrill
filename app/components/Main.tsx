"use client";
import Sidebar from "./Sidebar";
import "../../app/globals.css";
import Split_Horizontal from "../feature/splitter/Splitter";
import { useState } from "react";

// APIからレスポンスがあった場合、一度親コンポーネントのMainにデータをリフトアップする
// 次に、各コンポーネントへ問題文のデータを渡す
// SiderbarからAPIリクエストを行うので、セット関数を設定
// レスポンスがあれば、その結果を[Split_Horizontal => ProblemSection]という順番で渡す
export default function Main() {
  const [problemContent, setProblemContent] = useState<null | string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<null | string>("");

  return (
    <main className="my-2 flex-grow overflow-hidden">
      <div className="flex h-full">
        <Sidebar
          setProblemData={setProblemContent}
          setDisplayLanguageData={setSelectedLanguage}
        />
        <Split_Horizontal
          problemData={problemContent}
          displayLanguageData={selectedLanguage}
        />
      </div>
    </main>
  );
}
