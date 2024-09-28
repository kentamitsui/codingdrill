"use client";
import Sidebar from "./Sidebar";
import "../../app/globals.css";
import Split_Horizontal from "../feature/splitter/Splitter";
import { useState } from "react";

// APIからレスポンスがあった場合、一度親コンポーネントのMainにデータをリフトアップする
// 次に、各コンポーネントへ問題文のデータを渡す
// SiderbarからAPIリクエストを行うので、セット関数を設定
// レスポンスがあれば、その結果を[Split_Horizontal => ProblemSection]という順番で渡す
const Main: React.FC = () => {
  const [problemData, setProblemData] = useState<null | string>(null);

  return (
    <main className="my-2 flex-grow overflow-hidden">
      <div className="flex h-full">
        <Sidebar setProblemData={setProblemData} />
        <Split_Horizontal problemData={problemData} />
      </div>
    </main>
  );
};

export default Main;
