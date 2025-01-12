"use client";

import React, { createContext, useContext, useState } from "react";
import { PanelContextType } from "@/app/type/type";

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export const PanelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 初期のパネルサイズを指定
  const initialHorizontalSizes = [50, 50];
  const initialVerticalSizes = [50, 50];
  // パネルのサイズを状態管理する
  const [horizontalPanelSizes, setHorizontalPanelSizes] = useState(
    initialHorizontalSizes,
  );
  const [verticalPanelSizes, setVerticalPanelSizes] =
    useState(initialVerticalSizes);

  // 水平方向のパネルサイズをリセットする関数
  const resetHorizontalPanelSizes = () => {
    setHorizontalPanelSizes([...initialHorizontalSizes]);
    window.dispatchEvent(new Event("resize"));
  };

  // 垂直方向のパネルサイズをリセットする関数
  const resetVerticalPanelSizes = () => {
    setVerticalPanelSizes([...initialVerticalSizes]);
    window.dispatchEvent(new Event("resize"));
  };

  // 水平方向のドラッグ終了時点でのパネルサイズを処理する関数
  const handleHorizontalDragEnd = (newSizes: number[]) => {
    if (JSON.stringify(newSizes) !== JSON.stringify(horizontalPanelSizes)) {
      window.dispatchEvent(new Event("resize"));
      setHorizontalPanelSizes(newSizes);
    }
  };

  // 垂直方向のドラッグ終了時点でのパネルサイズを処理する関数
  const handleVerticalDragEnd = (newSizes: number[]) => {
    if (JSON.stringify(newSizes) !== JSON.stringify(verticalPanelSizes)) {
      window.dispatchEvent(new Event("resize"));
      setVerticalPanelSizes(newSizes);
    }
  };

  // パネルコンテキストを提供する
  return (
    <PanelContext.Provider
      value={{
        initialHorizontalSizes,
        initialVerticalSizes,
        horizontalPanelSizes,
        verticalPanelSizes,
        setHorizontalPanelSizes,
        setVerticalPanelSizes,
        resetHorizontalPanelSizes,
        resetVerticalPanelSizes,
        handleHorizontalDragEnd,
        handleVerticalDragEnd,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
};

// パネルコンテキストを使用するためのフック
export const usePanelContext = () => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error("usePanelContext must be used within a PanelProvider");
  }
  return context;
};
