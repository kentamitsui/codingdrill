"use client";

import React, { lazy, Suspense } from "react";
const Split = lazy(() => import("react-split"));
import QuestionSection from "@/app/components/sections/QuestionSection";
import CodeInputSection from "@/app/feature/monacoEditor/sections/CodeInputSection";
import ReviewSection from "@/app/components/sections/ReviewSection";
import { usePanelContext } from "@/app/feature/splitter/context/PanelContext";

// 垂直方向にパネルを分割するコンポーネント
const SplitVertical: React.FC = () => {
  // PanelContextから垂直方向のパネルサイズ管理に必要な関数を取得
  const { verticalPanelSizes, updateVerticalSizes } = usePanelContext();

  return (
    <Split
      sizes={verticalPanelSizes}
      minSize={250}
      expandToMin={false}
      gutterSize={8}
      gutterAlign="center"
      direction="vertical"
      onDragEnd={updateVerticalSizes}
    >
      <CodeInputSection />
      <ReviewSection />
    </Split>
  );
};

// 水平方向にパネルを分割するコンポーネント
const SplitHorizontal: React.FC = () => {
  // PanelContextから水平方向のパネルサイズ管理に必要な関数を取得
  const { horizontalPanelSizes, updateHorizontalSizes } = usePanelContext();

  return (
    <Suspense>
      <Split
        sizes={horizontalPanelSizes}
        minSize={450}
        expandToMin={false}
        gutterSize={8}
        gutterAlign="center"
        direction="horizontal"
        onDragEnd={updateHorizontalSizes}
        className="ml-2 flex flex-grow rounded-md"
      >
        <QuestionSection />
        <SplitVertical />
      </Split>
    </Suspense>
  );
};

export default SplitHorizontal;
