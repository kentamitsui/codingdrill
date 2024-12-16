import MonacoEditor from "../feature/monacoEditor/MonacoEditor";
import config from "../config/config.json";
import { useRef, useState, useEffect } from "react";
import saveToLocalStorage from "../feature/localStorage/localStorage";
import { useAppContext } from "./AppContext";
import updateSelectBox from "../feature/localStorage/updateSaveData";
import { useLocalStorageContext } from "../feature/localStorage/localStorageContext";

export default function InputSection() {
  const {
    isDisabled,
    setIsDisabled,
    difficulty,
    dataType,
    topic,
    selectedLanguage,
    formattedProblemContent,
    jsonFormattedProblemContent,
    setJsonFormattedReviewContent,
    loadedEditorLanguage,
    loadedEditorContent,
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
        updateSelectBox(savedData);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const [fontSize, setFontSize] = useState("14");
  const [editorLanguage, setEditorLanguage] = useState("python");
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const editorRef = useRef<any>(null);

  // [フォントサイズ・言語・エディタテーマ]オプションタグの値を動的に取得
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
    if (loadedEditorLanguage) {
      setEditorLanguage(loadedEditorLanguage);
    }
  }, [loadedEditorLanguage]);

  // Sidebar.tsxでhandleLoadDataが実行された際、
  // editorContentのデータをエディタ入力部分に反映
  // また、Sidebar.tsxでhandleCreateProblem()が実行された際は、
  // エディタを空にする
  useEffect(() => {
    if (loadedEditorContent) {
      editorRef.current.setValue(loadedEditorContent); // エディタを更新
    } else if (loadedEditorContent === null && editorRef.current) {
      editorRef.current.setValue("");
    }
  }, [loadedEditorContent]);

  // クリップボードにコピーする関数
  const copyToClipboard = () => {
    if (editorRef.current) {
      const copyEditorvalue = editorRef.current.getValue(); // Monaco Editor 内のコンテンツを取得

      navigator.clipboard
        .writeText(copyEditorvalue)
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
    // submitボタンが押されたら、状態関数をtrueに更新しcursor-not-allowed等のスタイルを追加する
    setIsDisabled(true);
    setJsonFormattedReviewContent(null);

    const currentEditorValue = editorRef.current.getValue();

    try {
      const response = await fetch("/api/createReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          selectedLanguage,
          // JSON形式から整形された問題文を渡す
          formattedProblemContent,
          editorLanguage,
          currentEditorValue,
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
        problemContent: jsonFormattedProblemContent,
        editorLanguage,
        editorContent: currentEditorValue,
        evaluation: JsonText,
      });

      // ReviewSectionにChatGPT-APIの返信データを設置する
      setJsonFormattedReviewContent(JsonText);

      // APIからのレスポンスを確認して、Buttonコンポーネントのスタイルを元に戻す
      if (responseText) {
        setIsDisabled(false);
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
        >
          Code
        </div>
        <details
          className="relative ml-auto rounded-tr-md"
          onMouseEnter={(event) => (event.currentTarget.open = true)}
          onMouseLeave={(event) => (event.currentTarget.open = false)}
        >
          <summary
            className={`w-[120px] rounded-tr-md bg-gray-400 p-1 text-center duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500 ${
              isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          >
            Options
          </summary>
          <div
            className={`absolute right-0 z-10 flex w-[150px] flex-col gap-2 rounded-b-md border-t-2 border-t-gray-50 bg-gray-200 p-2 shadow-lg dark:border-t-[#1e1e1e] dark:bg-[#0d1117] ${
              isDisabled ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {/* Font Size Select */}
            <select
              id="fontsize-select"
              className="w-full cursor-pointer rounded-md bg-gray-200 p-1 text-[12px] duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700"
              value={fontSize}
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
              onClick={copyToClipboard}
            >
              Copy
            </button>
            <button
              id="submit"
              className="w-full rounded-md bg-gray-400 p-1 text-center text-[12px] duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
              disabled={isDisabled}
              onClick={handleCreateReview}
            >
              Submit
            </button>
          </div>
        </details>
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
