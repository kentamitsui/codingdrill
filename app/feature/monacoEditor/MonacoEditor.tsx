"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";

export default function MonacoEditor() {
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

    // ウィンドウリサイズ時や親要素の変更を監視
    const observer = new ResizeObserver(() => {
      updateDimensions();
    });

    if (editorContainerRef.current) {
      observer.observe(editorContainerRef.current);
    }

    // 要素のサイズ変更が完了した時点で監視を終了し、不要な計算を終了する
    return () => {
      if (editorContainerRef.current) {
        observer.unobserve(editorContainerRef.current);
      }
    };
  }, []);

  return (
    <div ref={editorContainerRef} style={{ flex: 1, overflow: "hidden" }}>
      <Editor
        defaultLanguage="javascript"
        height={dimensions.height} // 計算した高さを適用
        width={dimensions.width} // 計算した幅を適用
        theme=""
      />
    </div>
  );
}
