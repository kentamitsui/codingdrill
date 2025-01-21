import * as monaco from "monaco-editor";
import MonacoEditor from "@/app/feature/monacoEditor/MonacoEditor";
import { useRef, useState, useEffect } from "react";
import saveToLocalStorage from "@/app/feature/localStorage/localStorage";
import { useAppContext } from "@/app/context/AppContext";
import { useLocalStorageContext } from "@/app/feature/localStorage/context/localStorageContext";
import InputAreaButton from "@/app/components/ui/button/InputAreaButton";
import Image from "next/image";
import menuData from "@/app/config/config.json";
import { EditorLanguageOption } from "@/app/components/ui/select/EditorLanguageOption";

export default function InputSection() {
  const {
    isApiLoading,
    setIsApiLoading,
    setIsReviewCreating,
    difficulty,
    dataType,
    topic,
    uiLanguage,
    formattedQuestionText,
    jsonFormattedQuestionText,
    setReviewText,
    storedEditorLanguage,
    setStoredEditorLanguage,
    currentEditorLanguage,
    storedEditorCode,
    setStoredEditorCode,
    currentEditorInputed,
    setCurrentEditorInputed,
    setSaveData,
    currentTheme,
  } = useAppContext();
  const { savedData, updateLocalStorage } = useLocalStorageContext();
  // エディタ内の文字数カウントに関するアラート表示管理用のフラグ
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === null || event.newValue === null) {
        updateLocalStorage(savedData);
        return;
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [savedData, updateLocalStorage]);

  // refにMonaco Editorインスタンスを保持
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  // エディタがマウントされた際に、ローカルストレージから取得したコードを適用
  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;

    // エディタがマウントされた直後に、保存されているコードを適用
    if (storedEditorCode !== null) {
      editor.setValue(storedEditorCode);
    }
  };

  // エディタの入力内容が変更された際の処理
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      // エディタの入力内容を保存用の状態変数にセット
      setStoredEditorCode(value);
      setCurrentEditorInputed(value);

      // 5000文字を超えた場合、アラートを表示して警告
      if (!isAlert && value.length >= 5001) {
        alert("Too many input. The limit is 5000 characters.");
        setIsAlert(true); // アラートを一度表示したら、再度超過するまで表示しない
      } else if (isAlert && value.length <= 5000) {
        setIsAlert(false); // 5000文字以下に戻ったら、アラートを解除
      }
    }
  };

  const [fontSize, setFontSize] = useState("14");
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [_, setIsEditorInputed] = useState(editorRef.current?.getValue());

  // [フォントサイズ・エディタテーマ]オプションタグの値を動的に取得
  const handleFontSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFontSize(event.target.value);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditorTheme(event.target.value);
  };

  // `storedEditorCode` の変更があった場合にエディタへ適用し、文字数カウントも更新
  useEffect(() => {
    // `currentEditorInputed` を更新して、ロード直後の文字数カウントが正しく動作するようにする
    if (storedEditorCode !== null) {
      setCurrentEditorInputed(storedEditorCode);
    }

    if (editorRef.current && storedEditorCode !== null) {
      const currentValue = editorRef.current.getValue();

      // すでにエディタに表示されている内容と `storedEditorCode` が異なる場合のみ更新
      if (currentValue !== storedEditorCode) {
        editorRef.current.setValue(storedEditorCode);
      }
    }
  }, [storedEditorCode]); // `storedEditorCode` の変更を監視し、エディタと文字数を更新

  // エディタに入力された内容を取得
  useEffect(() => {
    const editorValue = editorRef.current?.getValue();
    if (editorValue !== undefined) {
      setIsEditorInputed(editorValue);
      setCurrentEditorInputed(editorValue);
    }
  }, [setIsEditorInputed, setCurrentEditorInputed]);

  // クリップボードにコピーする関数
  const copyToClipboard = () => {
    if (editorRef.current) {
      const copyEditorvalue = editorRef.current.getValue(); // Monaco Editor 内のコンテンツを取得

      if (copyEditorvalue.length === 0) {
        return;
      }

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
    setIsApiLoading(true);
    // submitボタンが押されたら、状態関数をtrueに更新しローディングアニメーションを表示する
    setIsReviewCreating(true);
    // ボタンが押されたら、ReviewSectionに表示されている内容を空にする
    setReviewText(null);

    try {
      const response = await fetch("/api/createReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          uiLanguage,
          // JSON形式から整形された問題文を渡す
          formattedQuestionText,
          editorLanguage: currentEditorLanguage,
          currentEditorValue,
        }),
      });
      ///////////////////////////
      // デバッグ用
      console.log(
        "Sent request body:",
        JSON.stringify({
          topic,
          uiLanguage,
          formattedQuestionText,
          editorLanguage: currentEditorLanguage,
          currentEditorValue,
        }),
      );
      ///////////////////////////
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
        uiLanguage,
        problemContent: jsonFormattedQuestionText,
        editorLanguage: currentEditorLanguage,
        editorContent: currentEditorValue,
        evaluation: JsonText,
      });

      // ReviewSectionにChatGPT-APIの返信データを設置する
      setReviewText(JsonText);

      // setStoredEditorCodeに`currentEditorValue`を設置する事で、上段78-86行にあるuseEffect()内に記述している条件式にある、
      // ロード直後にもう一度問題作成を行った場合にエディタの中を空になる処理が実行される
      // このセット関数を実行しないと、ロード直後に問題文を作成した場合にエディタの中が空にならないバグが発生する
      setStoredEditorCode(currentEditorValue);

      // APIからのレスポンスを確認して、Buttonコンポーネントのスタイルを元に戻す
      if (responseText) {
        setIsApiLoading(false);
        setIsReviewCreating(false);
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
          className={`relative ml-auto rounded-tr-md ${isApiLoading ? "cursor-not-allowed" : ""}`}
          onMouseEnter={(event) =>
            (event.currentTarget.open = isApiLoading ? false : true)
          }
          onMouseLeave={(event) => (event.currentTarget.open = false)}
        >
          <summary
            className={`flex w-[120px] items-center justify-between rounded-tr-md bg-gray-400 p-1 text-center font-bold duration-300 hover:bg-gray-600 dark:border-[#1e1e1e] dark:bg-slate-700 dark:hover:bg-slate-500 ${
              isApiLoading ? "pointer-events-none opacity-50" : "cursor-pointer"
            }`}
          >
            <span className="flex-1 text-center">Options</span>
            <Image
              src={
                currentTheme === "dark"
                  ? menuData.svgIcon.listLight
                  : menuData.svgIcon.listDark
              }
              alt=""
              width={20}
              height={20}
            />
          </summary>
          <div
            className={`absolute right-0 z-10 flex w-[150px] flex-col gap-2 border-t-2 border-t-white bg-opacity-0 p-[8px_4px_4px_4px] text-sm backdrop-blur-[2px] dark:border-t-[#1e1e1e] ${
              isApiLoading ? "pointer-events-none" : ""
            }`}
          >
            {/* フォントサイズ */}
            <label htmlFor="fontsize-select" className="sr-only">
              fontsize select
            </label>
            <select
              id="fontsize-select"
              className="w-full cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700"
              value={fontSize}
              disabled={isApiLoading}
              onChange={handleFontSizeChange}
              style={{
                backgroundImage: `url(${
                  currentTheme === "dark"
                    ? menuData.svgIcon.textSizeLight
                    : menuData.svgIcon.textSizeDark
                })`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "calc(100% - 20px) center",
                appearance: "auto",
              }}
            >
              {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {/* エディタのテーマ */}
            <label htmlFor="theme-select" className="sr-only">
              theme select
            </label>
            <select
              id="theme-select"
              className="w-full cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700"
              value={editorTheme}
              disabled={isApiLoading}
              onChange={handleThemeChange}
              style={{
                backgroundImage: `url(${
                  currentTheme === "dark"
                    ? menuData.svgIcon.editorColorLight
                    : menuData.svgIcon.editorColorDark
                })`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "calc(100% - 20px) center",
                appearance: "auto",
              }}
            >
              <option value="vs">vs</option>
              <option value="vs-dark">vs-dark</option>
              <option value="hc-light">hc-light</option>
              <option value="hc-black">hc-black</option>
            </select>
            {/* エディタの言語 */}
            <EditorLanguageOption
              currentLanguageValue={storedEditorLanguage}
              setSelectedFunc={setStoredEditorLanguage}
            />
            {/* 文字数カウント */}
            <div className="w-full cursor-text rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700">
              <p>Input: {currentEditorInputed?.length}</p>
            </div>
            <InputAreaButton
              id="button-Copy-CodeInputArea"
              type="button"
              text="Copy"
              onClick={copyToClipboard}
            />
            <InputAreaButton
              id="submit"
              type="button"
              text="Submit"
              onClick={handleCreateReview}
            />
          </div>
        </details>
      </div>
      <div className="flex flex-1">
        <MonacoEditor
          // フォントサイズは数値で指定する必要がある為、Numberメソッドで文字列を変換する
          fontSize={Number(fontSize)}
          editorLanguage={storedEditorLanguage || "python"}
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
