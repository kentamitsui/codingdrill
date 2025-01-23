import * as monaco from "monaco-editor";
import { useRef, useState, useEffect } from "react";
import MonacoEditor from "@/app/feature/monacoEditor/components/MonacoEditor";
import { useAppContext } from "@/app/context/AppContext";

export default function EditorSection() {
  const {
    storedEditorLanguage,
    storedEditorCode,
    setStoredEditorCode,
    setCurrentEditorInputed,
    editorFontSize,
    editorTheme,
  } = useAppContext();

  // Monaco Editor のインスタンスを保持する
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  // 文字数超過時の警告表示フラグ
  const [isAlert, setIsAlert] = useState(false);

  /**
   * Monaco Editor がマウントされた際に呼び出されるハンドラー
   * - editorRef にエディタ本体を格納
   * - 保存されているコードがあればエディタに反映
   */
  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;

    if (storedEditorCode !== null) {
      editor.setValue(storedEditorCode);
    }
  };

  /**
   * エディタの入力内容が変更された際に呼び出されるハンドラー
   * - Context 内のコード状態と入力文字数を管理
   * - 5000 文字超過時にアラート表示
   */
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setStoredEditorCode(value);
      setCurrentEditorInputed(value);

      // 5000文字を超えたら警告
      if (!isAlert && value.length >= 5001) {
        alert("Too many input. The limit is 5000 characters.");
        setIsAlert(true);
      } else if (isAlert && value.length <= 5000) {
        setIsAlert(false);
      }
    }
  };

  /**
   * 初期マウント・再マウント時に、storedEditorCode をエディタおよび Context に反映
   */
  useEffect(() => {
    if (storedEditorCode !== null) {
      setCurrentEditorInputed(storedEditorCode);
    }

    // エディタ側と最新の保存内容が異なる場合のみ更新
    if (editorRef.current && storedEditorCode !== null) {
      const currentValue = editorRef.current.getValue();
      if (currentValue !== storedEditorCode) {
        editorRef.current.setValue(storedEditorCode);
      }
    }
  }, [storedEditorCode]);

  /**
   * コンポーネント初期表示時、一度だけエディタ内容を Context に同期
   */
  useEffect(() => {
    const editorValue = editorRef.current?.getValue();
    if (editorValue !== undefined) {
      setCurrentEditorInputed(editorValue);
    }
  }, []);

  return (
    <div className="flex flex-1">
      <MonacoEditor
        fontSize={Number(editorFontSize)}
        editorLanguage={storedEditorLanguage}
        editorTheme={editorTheme}
        onMount={handleEditorMount}
        onChange={handleEditorChange}
      />
    </div>
  );
}
