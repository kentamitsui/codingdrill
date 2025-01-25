"use client";

import Loading from "@/app/components/loading/Loading";
const Editor = lazy(() => import("@monaco-editor/react"));
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { MonacoEditorProps } from "@/app/type/type";
import { useAppContext } from "@/app/context/AppContext";

const MonacoEditor = ({
  fontSize,
  editorLanguage,
  editorTheme,
  onMount,
  onChange,
}: MonacoEditorProps) => {
  const { storedEditorCode } = useAppContext();
  // エディタの親要素を取得し、リサイズ監視を行う
  const editorContainerRef = useRef<HTMLDivElement>(null); // 親要素の参照を取得
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 }); // エディタのサイズを管理

  useEffect(() => {
    // 親要素のサイズを取得し、エディタのサイズを更新
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

    const currentRef = editorContainerRef.current;

    // 仕切り線のドラッグでサイズが変わる度に、updateDimensions()を呼び出す
    if (currentRef) {
      observer.observe(currentRef);
    }

    // 要素のサイズ変更が完了（仕切り線のドラッグが終わった）した時点で監視を終了する
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
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
          // Monaco Editor の基本設定
          language={editorLanguage} // 設定されたプログラミング言語を適用
          theme={editorTheme} // 設定されたテーマ（ライト / ダーク）を適用
          height={dimensions.height} // 計算した高さを適用
          width={dimensions.width} // 計算した幅を適用
          options={{ fontSize: fontSize }} // エディタのフォントサイズを適用
          value={storedEditorCode ?? ""} // storedEditorCodeを直接セットし、ロード時に確実に反映されるようにする
          loading={<Loading isCreating={true} text={"Now Loading"} />} // ローティングアニメーションの設定
          // イベントハンドラの設定
          // CodeInputSection.tsxから渡されたプロパティをonMountメソッドで実行する
          onMount={(editor) => {
            if (onMount) {
              onMount(editor);
            }
          }}
          // CodeInputSection.tsxから渡されたプロパティをonChangeメソッドで実行する
          onChange={(value) => {
            if (onChange) {
              onChange(value);
            }
          }}
        />
      </Suspense>
    </div>
  );
};

export default MonacoEditor;
