import { useAppContext } from "@/app/context/AppContext";
import { useLocalStorageContext } from "@/app/feature/storage/context/StorageContext";
import EditorActionButton from "@/app/feature/monacoEditor/components/button/EditorActionButton";
import Image from "next/image";
import menuData from "@/app/config/config.json";
import FontSizeSelect from "@/app/feature/monacoEditor/components/option/FontSizeSelect";
import ThemeSelect from "@/app/feature/monacoEditor/components/option/ThemeSelect";
import LanguageSelect from "@/app/feature/monacoEditor/components/option/LanguageSelect";
import EditorSection from "@/app/feature/monacoEditor/sections/EditorSection";
import clipboardCopy from "@/app/feature/clipboardCopy/clipboardCopy";

const CodeInputSection = () => {
  const {
    isApiLoading,
    setIsApiLoading,
    setIsReviewCreating,
    difficulty,
    dataType,
    topic,
    uiLanguage,
    storedQuestionText,
    jsonQuestionText,
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
          storedQuestionText,
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
        questionText: jsonQuestionText,
        editorLanguage: currentEditorLanguage,
        editorCode: currentEditorValue,
        reviewText: JsonText,
      });

      // APIからのレスポンスを保存
      setReviewText(JsonText);

      // エディタ入力内容をContextに再度保存
      setStoredEditorCode(currentEditorValue);

      // ローカルストレージから最新データを取得し、ReactSelectへ表示されるセーブデータを更新
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
            <FontSizeSelect />
            {/* エディタのテーマ */}
            <ThemeSelect />
            {/* エディタの言語 */}
            <LanguageSelect
              currentLanguageValue={storedEditorLanguage}
              setSelectedFunc={setStoredEditorLanguage}
            />
            {/* 文字数カウント */}
            <div className="w-full cursor-text rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-[#0d1117] dark:hover:bg-slate-700">
              <p>Input: {currentEditorInputed?.length}</p>
            </div>
            {/* エディタの入力内容をコピー */}
            <EditorActionButton
              type="button"
              text="Copy"
              onClick={() => clipboardCopy({ context: currentEditorInputed })}
            />
            {/* レビュー生成 */}
            <EditorActionButton
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
};

export default CodeInputSection;
