"use client";

import React, { createContext, useContext, useState } from "react";
import { PanelLayoutContextProps } from "@/app/type/type";

const PanelContext = createContext<PanelLayoutContextProps | undefined>(
  undefined,
);

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
  const resetHorizontalSizes = () => {
    setHorizontalPanelSizes([...initialHorizontalSizes]);
    window.dispatchEvent(new Event("resize"));
  };

  // 垂直方向のパネルサイズをリセットする関数
  const resetVerticalSizes = () => {
    setVerticalPanelSizes([...initialVerticalSizes]);
    window.dispatchEvent(new Event("resize"));
  };

  // 水平方向のドラッグ終了時点でのパネルサイズを処理する関数
  const updateHorizontalSizes = (newSizes: number[]) => {
    if (JSON.stringify(newSizes) !== JSON.stringify(horizontalPanelSizes)) {
      window.dispatchEvent(new Event("resize"));
      setHorizontalPanelSizes(newSizes);
    }
  };

  // 垂直方向のドラッグ終了時点でのパネルサイズを処理する関数
  const updateVerticalSizes = (newSizes: number[]) => {
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
        resetHorizontalSizes,
        resetVerticalSizes,
        updateHorizontalSizes,
        updateVerticalSizes,
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
