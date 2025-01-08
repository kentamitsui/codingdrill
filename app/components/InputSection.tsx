import * as monaco from "monaco-editor";
import MonacoEditor from "../feature/monacoEditor/MonacoEditor";
import config from "../config/config.json";
import { useRef, useState, useEffect } from "react";
import saveToLocalStorage from "../feature/localStorage/localStorage";
import { useAppContext } from "./AppContext";
// import updateSelectBox from "../feature/localStorage/updateSaveData";
import { useLocalStorageContext } from "../feature/localStorage/localStorageContext";
import InputAreaButton from "./InputAreaButton";

export default function InputSection() {
  const {
    isDisabled,
    setIsDisabled,
    setIsCreateReview,
    difficulty,
    dataType,
    topic,
    selectedLanguage,
    formattedProblemContent,
    jsonFormattedProblemContent,
    setJsonFormattedReviewContent,
    loadedEditorLanguage,
    loadedEditorContent,
    setLoadedEditorContent,
    checkEditorInputed,
    setCheckEditorInputed,
    setSaveData,
  } = useAppContext();
  const { savedData, updateLocalStorage } = useLocalStorageContext();
  // エディタ内の文字数カウントに関するアラート表示管理用のフラグ
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === null || event.newValue === null) {
        // updateSelectBox([]);
        updateLocalStorage(savedData);
        return;
      }

      if (event.key === "savedData") {
        // updateSelectBox(savedData);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [savedData, updateLocalStorage]);

  // refにMonaco Editorインスタンスを保持
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  // onMountでMonaco Editorインスタンスをrefに格納
  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    setIsEditorInputed(value || "");
    setCheckEditorInputed(value || "");

    // 文字数チェックとアラート表示
    if (value) {
      // 状態関数の非同期性や再レンダリングを避けるため、valueを使用
      if (!isAlert && value.length >= 2501) {
        alert("Too many input. The limit is 2500 characters.");
        setIsAlert(true); // フラグを切り替え、再度条件が満たされるまでアラートを非表示
      } else if (isAlert && value.length <= 2500) {
        setIsAlert(false); // 文字数が2500字以下になったらフラグをfalseに戻す
      }
    }
  };

  const [fontSize, setFontSize] = useState("14");
  const [editorLanguage, setEditorLanguage] = useState("python");
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [_, setIsEditorInputed] = useState(editorRef.current?.getValue());

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
    if (editorRef.current) {
      if (loadedEditorContent !== null) {
        editorRef.current.setValue(loadedEditorContent);
      } else {
        editorRef.current.setValue(""); // 正常にsetValueが呼び出される
      }
    }
  }, [loadedEditorContent]);

  // エディタに入力された内容を取得
  useEffect(() => {
    const editorValue = editorRef.current?.getValue();
    if (editorValue !== undefined) {
      setIsEditorInputed(editorValue);
      setCheckEditorInputed(editorValue);
    }
  }, [setIsEditorInputed, setCheckEditorInputed]);

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
    const currentEditorValue = editorRef.current
      ? editorRef.current.getValue()
      : "";

    // submitボタンが押されたら、状態関数をtrueに更新しcursor-not-allowed等のスタイルを追加する
    setIsDisabled(true);
    // submitボタンが押されたら、状態関数をtrueに更新しローディングアニメーションを表示する
    setIsCreateReview(true);
    // ボタンが押されたら、ReviewSectionに表示されている内容を空にする
    setJsonFormattedReviewContent(null);

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

      // setLoadedEditorContentに`currentEditorValue`を設置する事で、上段78-86行にあるuseEffect()内に記述している条件式にある、
      // ロード直後にもう一度問題作成を行った場合にエディタの中を空になる処理が実行される
      // このセット関数を実行しないと、ロード直後に問題文を作成した場合にエディタの中が空にならないバグが発生する
      setLoadedEditorContent(currentEditorValue);

      // APIからのレスポンスを確認して、Buttonコンポーネントのスタイルを元に戻す
      if (responseText) {
        setIsDisabled(false);
        setIsCreateReview(false);
      }

      // ローカルストレージからデータを取得し、react-selectコンポーネントに表示されるセーブデータオプションを更新する
      const savedLocalStorageData =
        JSON.parse(localStorage.getItem("savedData") || "[]") || [];
      if (savedLocalStorageData === undefined) return;
      setSaveData(savedLocalStorageData);
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
      <div className="flex flex-row justify-between rounded-t-md border-b-2 border-gray-50 bg-gray-200 text-[1rem] dark:border-[#1e1e1e] dark:bg-[#0d1117]">
        <div
          id="codeInputArea-title"
          className="rounded-tl-md p-[4px_4px_4px_30px] text-[1rem] font-bold"
        >
          Code
        </div>
        <details
          className="relative ml-auto rounded-tr-md"
          onMouseEnter={(event) =>
            (event.currentTarget.open = isDisabled ? false : true)
          }
          onMouseLeave={(event) => (event.currentTarget.open = false)}
        >
          <summary
            className={`w-[120px] rounded-tr-md bg-gray-400 p-1 text-center font-bold duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500 ${
              isDisabled ? "pointer-events-none opacity-50" : "cursor-pointer"
            }`}
          >
            Options
          </summary>
          <div
            className={`absolute right-0 z-10 flex w-[150px] flex-col gap-2 border-t-2 border-t-white bg-opacity-0 p-[8px_4px_4px_4px] text-sm backdrop-blur-[2px] dark:border-t-[#1e1e1e] ${
              isDisabled ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {/* Font Size Select */}
            <label htmlFor="fontsize-select" className="sr-only">
              fontsize select
            </label>
            <select
              id="fontsize-select"
              className="w-full cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700"
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
            <label htmlFor="theme-select" className="sr-only">
              theme select
            </label>
            <select
              id="theme-select"
              className="w-full cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700"
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
            <label htmlFor="language-select" className="sr-only">
              language select
            </label>
            <select
              id="language-select"
              className="w-full cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700"
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
            {/* 文字数カウント */}
            <div className="w-full cursor-text rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700">
              <p>input: {checkEditorInputed?.length}</p>
            </div>
            {/* Buttons */}
            <InputAreaButton
              id="button-Copy-CodeInputArea"
              type="button"
              text="copy"
              onClick={copyToClipboard}
            />
            <InputAreaButton
              id="submit"
              type="button"
              text="submit"
              onClick={handleCreateReview}
            />
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
          onMount={handleEditorMount}
          // エディタ内の入力内容をMoancoEditor.tsxへプロパティとして渡す
          onChange={handleEditorChange}
        />
      </div>
    </section>
  );
}
