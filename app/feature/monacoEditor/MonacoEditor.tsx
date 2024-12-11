"use client";

const Editor = lazy(() => import("@monaco-editor/react"));
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { MonacoEditorProps } from "@/app/type/type";

export default function MonacoEditor({
  fontSize,
  editorLanguage,
  editorTheme,
  onMount,
}: MonacoEditorProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null); // 親要素の参照を取得
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (editorContainerRef.current) {
        const rect = editorContainerRef.current.getBoundingClientRect();
        setDimensions({
          height: rect.height,
          width: rect.width,
        });
      }
    };

    // 初期サイズを設定
    updateDimensions();

    // ウィンドウリサイズ時や親要素の変更を監視する
    const observer = new ResizeObserver(() => {
      updateDimensions();
    });

    // 仕切り線のドラッグでサイズが変わる度に、updateDimensions()を呼び出す
    if (editorContainerRef.current) {
      observer.observe(editorContainerRef.current);
    }

    // 要素のサイズ変更が完了（仕切り線のドラッグが終わった）した時点で監視を終了する
    return () => {
      if (editorContainerRef.current) {
        observer.unobserve(editorContainerRef.current);
      }
    };
  }, []);

  return (
    // [flex: 1]は以下のスタイルを一括指定する
    // flex-grow: 1：親要素内の余白スペースを他の要素と比率1で分配し、要素を拡大する
    // flex-shrink: 1：親要素のサイズが縮小された際、他の要素と比率1で要素を縮小する
    // flex-basis: 0：要素の初期サイズを0に設定する
    <div ref={editorContainerRef} style={{ flex: 1, overflow: "hidden" }}>
      <Suspense>
        <Editor
          language={editorLanguage}
          theme={editorTheme}
          height={dimensions.height} // 計算した高さを適用
          width={dimensions.width} // 計算した幅を適用
          options={{ fontSize: fontSize }}
          // InputSection.tsxから渡されたプロパティをonMountメソッドで実行する
          onMount={(editor) => {
            if (onMount) {
              onMount(editor);
            }
          }}
        />
      </Suspense>
    </div>
  );
}
