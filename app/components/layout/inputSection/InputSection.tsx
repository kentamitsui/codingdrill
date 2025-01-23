import { useAppContext } from "@/app/context/AppContext";
import { useLocalStorageContext } from "@/app/feature/localStorage/context/localStorageContext";
import InputAreaButton from "@/app/components/ui/button/InputAreaButton";
import Image from "next/image";
import menuData from "@/app/config/config.json";
import { EditorFontOption } from "@/app/components/ui/select/EditorFontOption";
import { EditorThemeOption } from "@/app/components/ui/select/EditorThemeOption";
import { EditorLanguageOption } from "@/app/components/ui/select/EditorLanguageOption";
import EditorSection from "@/app/feature/monacoEditor/sections/EditorSection";

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
    setStoredEditorCode,
    currentEditorInputed,
    setSaveData,
    currentTheme,
  } = useAppContext();
  const { saveToLocalStorage } = useLocalStorageContext();
  /**
   * クリップボードにコピーするハンドラー
   * - 現在のエディタの入力内容をコピーする
   * - EditorSection で入力した内容は currentEditorInputed に集約されている
   */
  const copyToClipboard = () => {
    if (currentEditorInputed) {
      if (currentEditorInputed?.length === 0) {
        return;
      }

      navigator.clipboard
        .writeText(currentEditorInputed || "")
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

  /**
   * サーバーへ問題文＋コードを投げてレビューを生成するハンドラー
   * - API呼び出し後、レスポンスとして受け取った ChatGPT AI の返信をセット
   * - レスポンスの内容を localStorage に保存し、React Context にも保存している
   * - ローディングや処理結果の表示は isApiLoading / setIsReviewCreating で管理
   */
  const handleCreateReview = async () => {
    const currentEditorValue = currentEditorInputed || "";
    // Submit ボタンが押されたらローディング状態にする
    setIsApiLoading(true);
    setIsReviewCreating(true);
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

      if (!response.ok) {
        throw new Error("Failed to create a review.");
      }
      const data = await response.json();
      const responseText = data.responseText;
      const JsonText = JSON.parse(responseText);

      // ReviewSection に返却データを反映
      saveToLocalStorage({
        difficulty,
        dataType,
        topic,
        uiLanguage,
        questionText: jsonFormattedQuestionText,
        editorLanguage: currentEditorLanguage,
        editorCode: currentEditorValue,
        reviewText: JsonText,
      });

      // ReviewSectionにChatGPT-APIの返信データを設置する
      setReviewText(JsonText);

      // エディタ入力内容を Context に再度保存
      setStoredEditorCode(currentEditorValue);

      // ローカルストレージから最新データを取得し、React Select へ表示されるセーブデータを更新
      if (responseText) {
        setIsApiLoading(false);
        setIsReviewCreating(false);
      }
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
            {/* エディタのフォントサイズ */}
            <EditorFontOption />
            {/* エディタのテーマ */}
            <EditorThemeOption />
            {/* エディタの言語 */}
            <EditorLanguageOption
              currentLanguageValue={storedEditorLanguage}
              setSelectedFunc={setStoredEditorLanguage}
            />
            {/* 文字数カウント */}
            <div className="w-full cursor-text rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700">
              <p>Input: {currentEditorInputed?.length}</p>
            </div>
            {/* エディタの入力内容をコピー */}
            <InputAreaButton
              id="button-Copy-CodeInputArea"
              type="button"
              text="Copy"
              onClick={copyToClipboard}
            />
            {/* レビュー生成 */}
            <InputAreaButton
              id="submit"
              type="button"
              text="Submit"
              onClick={handleCreateReview}
            />
          </div>
        </details>
      </div>
      {/* Monaco Editor の領域を EditorSection コンポーネントに分割 */}
      <EditorSection />
    </section>
  );
}
