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
  const [problemContent, setProblemContent] = useState<string | null>("");
  // ProblemSection及びInputSectionでのChatGPT送受信時に、ボタンのdisabled属性を切り替える為の状態関数
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<string | null>("");

  return (
    <main className="my-2 flex-grow overflow-hidden">
      <div className="flex h-full">
        <Sidebar
          setProblemData={setProblemContent}
          setIsDisabledData={setIsDisabled}
          getIsDisabledData={isDisabled}
          setEditorContent={setEditorContent}
        />
        <Split_Horizontal
          setIsDisabledData={setIsDisabled}
          getIsDisabledData={isDisabled}
          editorContent={editorContent}
        />
      </div>
    </main>
  );
}
