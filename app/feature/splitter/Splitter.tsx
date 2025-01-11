"use client";

import React, { lazy, Suspense } from "react";
const Split = lazy(() => import("react-split"));
import ProblemSection from "../../components/ProblemSection";
import InputSection from "../../components/layout/inputSection/InputSection";
import ReviewSection from "../../components/ReviewSection";
import { usePanelContext } from "./PanelContext";

const Split_Vertical: React.FC = () => {
  // PanelContextから垂直方向のパネルサイズ管理に必要な関数を取得
  const { verticalPanelSizes, handleVerticalDragEnd } = usePanelContext();

  return (
    <Split
      sizes={verticalPanelSizes}
      minSize={250}
      expandToMin={false}
      gutterSize={8}
      gutterAlign="center"
      direction="vertical"
      onDragEnd={handleVerticalDragEnd}
    >
      <InputSection />
      <ReviewSection />
    </Split>
  );
};

const Split_Horizontal: React.FC = () => {
  // PanelContextから水平方向のパネルサイズ管理に必要な関数を取得
  const { horizontalPanelSizes, handleHorizontalDragEnd } = usePanelContext();

  return (
    <Suspense>
      <Split
        sizes={horizontalPanelSizes}
        minSize={450}
        expandToMin={false}
        gutterSize={8}
        gutterAlign="center"
        direction="horizontal"
        onDragEnd={handleHorizontalDragEnd}
        className="ml-2 flex flex-grow rounded-md"
      >
        <ProblemSection />
        <Split_Vertical />
      </Split>
    </Suspense>
  );
};

export default Split_Horizontal;
