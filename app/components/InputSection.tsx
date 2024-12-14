import MonacoEditor from "../feature/monacoEditor/MonacoEditor";
import config from "../config/config.json";
import { useRef, useState, useEffect } from "react";
import { InputSectionProps } from "../type/type";
import saveToLocalStorage from "../feature/localStorage/localStorage";
import { useAppContext } from "../feature/localStorage/AppContext";
import updateSelectBox from "../feature/localStorage/updateSaveData";
import { useLocalStorageContext } from "../feature/localStorage/localStorageContext";
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
  setIsDisabledData,
  getIsDisabledData,
  localStorageEditorLanguage, // ローカルストレージのeditorLanguageプロパティをリフトアップによって取得 ＊下記のuseStateと命名の重複を避ける為、若干の変更を加えた
  editorContent, // ローカルストレージのeditorContentプロパティをリフトアップによって取得
}: InputSectionProps) {
  const {
    difficulty,
    dataType,
    topic,
    selectedLanguage,
    formattedProblemContent,
    // loadedSelectedLanguage,
  } = useAppContext();
  const { savedData, updateLocalStorage } = useLocalStorageContext();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === null || event.newValue === null) {
        updateSelectBox([]);
        updateLocalStorage();
        return;
      }

      if (event.key === "savedData") {
        // const savedData = JSON.parse(event.newValue || "[]");
        updateSelectBox(savedData);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const [fontSize, setFontSize] = useState("14");
  const [editorLanguage, setEditorLanguage] = useState("javascript");
  const [editorTheme, setEditorTheme] = useState("vs");
  const editorRef = useRef<any>(null);

  const handleFontSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFontSize(event.target.value);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setEditorLanguage(event.target.value);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditorTheme(event.target.value);
  };

  // Sidebar.tsxでhandleLoadDataが実行された際、
  // editorLanguageのデータをエディタ入力部分に反映
  useEffect(() => {
    if (localStorageEditorLanguage) {
      setEditorLanguage(localStorageEditorLanguage);
    }
  }, [localStorageEditorLanguage]);

  // Sidebar.tsxでhandleLoadDataが実行された際、
  // editorContentのデータをエディタ入力部分に反映
  useEffect(() => {
    if (editorRef.current && editorContent) {
      editorRef.current.setValue(editorContent); // エディタを更新
    }
  }, [editorContent]);

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

  // createProblem.tsに選択後の値を送信する
  // 正常にAPIとの送受信が行われたら、受信結果を受け取る
  const handleCreateReview = async () => {
    setIsDisabledData(true);
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
          topic,
          selectedLanguage,
          formattedProblemContent,
          editorLanguage,
          editorContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create a review.");
      }
      const data = await response.json();
      const responseText = data.responseText;
      const JsonText = JSON.parse(responseText);

      // ローカルストレージにデータ(問題文・エディタの入力内容・総評)を保存する
      saveToLocalStorage({
        difficulty,
        dataType,
        topic,
        selectedLanguage,
        problemContent: problemData,
        editorLanguage,
        editorContent,
        evaluation: JsonText,
      });

      // ReviewSectionにChatGPT-APIの返信データを設置する
      setReviewData(JsonText);

      // APIからのレスポンスを確認して、Buttonコンポーネントのスタイルを元に戻す
      if (responseText) {
        setIsDisabledData(false);
      }
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
          // onClick={copyToClipboard}
        >
          Code
        </div>
        <details className="relative ml-auto rounded-tr-md">
          <summary
            className={`w-[120px] rounded-tr-md bg-gray-400 p-1 text-center duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500 ${
              getIsDisabledData
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          >
            Options
          </summary>
          <div
            className={`absolute right-0 z-10 mt-[2px] flex w-[150px] flex-col gap-2 bg-gray-200 p-2 shadow-lg dark:bg-[#0d1117] ${
              getIsDisabledData ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {/* Font Size Select */}
            <select
              id="fontsize-select"
              className="w-full cursor-pointer rounded-md bg-gray-200 p-1 text-[12px] duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700"
              value={fontSize}
              disabled={getIsDisabledData}
              onChange={handleFontSizeChange}
            >
              {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            {/* Theme Select */}
            <select
              id="theme-select"
              className="w-full cursor-pointer rounded-md bg-gray-200 p-1 text-[12px] duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700"
              value={editorTheme}
              disabled={getIsDisabledData}
              onChange={handleThemeChange}
            >
              <option value="vs">vs</option>
              <option value="vs-dark">vs-dark</option>
              <option value="hc-light">hc-light</option>
              <option value="hc-black">hc-black</option>
            </select>

            {/* Language Select */}
            <select
              id="language-select"
              className="w-full cursor-pointer rounded-md bg-gray-200 p-1 text-[12px] duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700"
              value={editorLanguage}
              disabled={getIsDisabledData}
              onChange={handleLanguageChange}
            >
              {Object.entries(config.menuLists.languages).map(
                ([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ),
              )}
            </select>

            {/* Buttons */}
            <button
              id="button-Copy-CodeInputArea"
              className="w-full rounded-md bg-gray-400 p-1 text-center text-[12px] duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
              disabled={getIsDisabledData}
              onClick={copyToClipboard}
            >
              Copy
            </button>
            <button
              id="submit"
              className="w-full rounded-md bg-gray-400 p-1 text-center text-[12px] duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
              disabled={getIsDisabledData}
              onClick={handleCreateReview}
            >
              Submit
            </button>
          </div>
        </details>
        {/* <select
          id="fontsize-select"
          className={`ml-auto mr-[2px] w-[100px] border-gray-50 bg-gray-400 p-1 text-center text-[12px] duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500 ${getIsDisabledData === true ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          value={fontSize}
          disabled={getIsDisabledData}
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
          className={`mr-[2px] w-[100px] border-gray-50 bg-gray-400 p-1 text-center text-[12px] duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500 ${getIsDisabledData === true ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          value={editorTheme}
          disabled={getIsDisabledData}
          onChange={handleThemeChange}
        >
          <option value={"vs"}>vs</option>
          <option value={"vs-dark"}>vs-dark</option>
          <option value={"hc-light"}>hc-light</option>
          <option value={"hc-black"}>hc-black</option>
        </select>
        <select
          id="language-select"
          className={`mr-[2px] w-[100px] border-gray-50 bg-gray-400 p-1 text-center text-[12px] duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500 ${getIsDisabledData === true ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          value={editorLanguage}
          disabled={getIsDisabledData}
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
          className={`mr-[2px] w-[100px] border-gray-50 bg-gray-400 p-1 text-center text-[12px] duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500 ${getIsDisabledData === true ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={getIsDisabledData}
          onClick={copyToClipboard}
        >
          copy
        </button>
        <button
          className={`w-[100px] rounded-tr-md bg-gray-400 p-1 text-center text-[12px] duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500 ${getIsDisabledData === true ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          id="submit"
          type="submit"
          disabled={getIsDisabledData}
          onClick={handleCreateReview}
        >
          submit
        </button> */}
      </div>
      <div className="flex flex-1">
        <MonacoEditor
          // フォントサイズは数値で指定する必要がある為、Numberメソッドで文字列を変換する
          fontSize={Number(fontSize)}
          editorLanguage={editorLanguage}
          editorTheme={editorTheme}
          // エディタ内の入力内容をMoancoEditor.tsxへプロパティとして渡す
          onMount={(editor) => {
            editorRef.current = editor;
          }}
        />
      </div>
    </section>
  );
}
