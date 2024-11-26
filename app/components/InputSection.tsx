import MonacoEditor from "../feature/monacoEditor/MonacoEditor";
import config from "../config/config.json";
import { useRef, useState } from "react";
import { InputSectionProps } from "../type/type";
{
  /* InputSection.tsxでChatGPT-APIとの送受信を行う
    1.ProblemSection.tsxから問題文の文字列データを、InputSection.tsxへ渡す
    2.ProblemSection.tsxからリフトダウンされた問題文のデータと、エディタの入力内容・選択言語の値をChatGPT-APIに送信する
    3.送信が完了し、その後受信するデータをSplitter.tsxにリフトアップする
    4.リフトアップしたデータは、ReviewSection.tsxにリフトダウンする
    5.データを各要素に配置する */
}
export default function InputSection({
  problemData,
  setReviewData,
  displayLanguageData,
}: InputSectionProps) {
  const [selectedFontSize, setSelectedFontSize] = useState("14");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [selectedTheme, setSelectedTheme] = useState("vs");
  const editorRef = useRef<any>(null);

  const handleFontSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedFontSize(event.target.value);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedLanguage(event.target.value);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(event.target.value);
  };

  // クリップボードにコピーする関数
  const copyToClipboard = () => {
    if (editorRef.current) {
      const editorContent = editorRef.current.getValue(); // Monaco Editor 内のコンテンツを取得
      navigator.clipboard
        .writeText(editorContent)
        .then(() => {
          alert("Copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          alert("Failed to copy text.");
        });
    } else {
      alert("Editor is not ready yet.");
    }
  };

  console.log(
    `problem data: ${problemData}\n\n`,
    `setReviewData: ${setReviewData}\n\n`,
    `display language data: ${displayLanguageData}\n\n`,
  );
  // createProblem.tsに選択後の値を送信する
  // 正常にAPIとの送受信が行われたら、受信結果を受け取る
  const handleCreateReview = async () => {
    const editorContent = editorRef.current.getValue();

    try {
      // submitボタンが押されたら、状態関数をtrueに更新しcursor-not-allowed等のスタイルを追加する
      // setDisabled(true);
      const response = await fetch("/api/createReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedLanguage,
          problemData,
          editorContent,
          displayLanguageData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create a review.");
      }
      const data = await response.json();
      const responseText = data.responseText;
      // APIからのレスポンスを確認して、Buttonコンポーネントのスタイルを元に戻す
      // if (responseText) {
      //   setDisabled(false);
      // }

      const JsonText = JSON.parse(responseText);
      // ReviewSectionにChatGPT-APIの返信データを設置する
      setReviewData(JsonText);
      console.log(JsonText);
    } catch (error) {
      console.error("Error occurred while creating a review:", error);
      alert("Error occurred while creating the review.");
    }
  };

  return (
    <section
      id="split-horizontal-right"
      className="flex flex-grow flex-col overflow-hidden"
      style={{ height: "100%" }} // 親要素が高さを管理
    >
      <div className="flex flex-row justify-between rounded-t-md border-b-2 border-gray-50 bg-gray-200 text-[1rem] font-bold dark:border-[#1e1e1e] dark:bg-[#0d1117]">
        <div
          id="codeInputArea-title"
          className="rounded-tl-md p-[4px_4px_4px_30px] text-[1rem]"
          onClick={copyToClipboard}
        >
          Code
        </div>
        <select
          id="fontsize-select"
          className="ml-auto mr-[2px] w-[100px] cursor-pointer border-gray-50 bg-gray-400 p-1 text-center text-[12px] duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500"
          value={selectedFontSize}
          onChange={handleFontSizeChange}
        >
          <option value={"10"}>10</option>
          <option value={"11"}>11</option>
          <option value={"12"}>12</option>
          <option value={"13"}>13</option>
          <option value={"14"}>14</option>
          <option value={"15"}>15</option>
          <option value={"16"}>16</option>
          <option value={"17"}>17</option>
          <option value={"18"}>18</option>
          <option value={"19"}>19</option>
          <option value={"20"}>20</option>
        </select>
        <select
          id="theme-select"
          className="mr-[2px] w-[100px] cursor-pointer border-gray-50 bg-gray-400 p-1 text-center text-[12px] duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500"
          value={selectedTheme}
          onChange={handleThemeChange}
        >
          <option value={"vs"}>vs</option>
          <option value={"vs-dark"}>vs-dark</option>
          <option value={"hc-light"}>hc-light</option>
          <option value={"hc-black"}>hc-black</option>
        </select>
        <select
          id="language-select"
          className="mr-[2px] w-[100px] cursor-pointer border-gray-50 bg-gray-400 p-1 text-center text-[12px] duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          {Object.entries(config.menuLists.languages).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <button
          id="button-Copy-CodeInputArea"
          className="mr-[2px] w-[100px] border-gray-50 bg-gray-400 p-1 text-center text-[12px] duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500"
          onClick={copyToClipboard}
        >
          copy
        </button>
        <button
          className="w-[100px] rounded-tr-md bg-gray-400 p-1 text-center text-[12px] duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
          id="submit"
          type="submit"
          onClick={handleCreateReview}
        >
          submit
        </button>
      </div>
      <div className="flex flex-1">
        <MonacoEditor
          // フォントサイズは数値で指定する必要がある為、Numberメソッドで文字列を変換する
          selectedFontSize={Number(selectedFontSize)}
          selectedLanguage={selectedLanguage}
          selectedTheme={selectedTheme}
          // エディタ内の入力内容をMoancoEditor.tsxへプロパティとして渡す
          onMount={(editor) => {
            editorRef.current = editor;
          }}
        />
      </div>
    </section>
  );
}
