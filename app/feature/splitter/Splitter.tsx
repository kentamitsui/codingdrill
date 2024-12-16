"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
const Split = lazy(() => import("react-split"));
import ProblemSection from "../../components/ProblemSection";
import InputSection from "../../components/InputSection";
import ReviewSection from "../../components/ReviewSection";
import { usePanelContext } from "./PanelContext";

const Split_Vertical: React.FC = () => {
  const { resetPanelSizes } = usePanelContext();
  const initialSizes = [50, 50];
  const [splitPanelSizes, setSplitPanelSizes] = useState(initialSizes);

  const handleDragEnd = (newSizes: number[]) => {
    // 仕切り線をドラッグ&ドロップした時のみ、リサイズイベントが発火する
    // 発火する度に、state(sizes)の数値(width,height)が更新される
    if (JSON.stringify(newSizes) !== JSON.stringify(splitPanelSizes)) {
      window.dispatchEvent(new Event("resize"));
      setSplitPanelSizes(newSizes);
    }
  };

  useEffect(() => {
    setSplitPanelSizes(initialSizes);
  }, [resetPanelSizes]);

  return (
    <Split
      sizes={splitPanelSizes}
      minSize={250}
      expandToMin={false}
      gutterSize={8}
      gutterAlign="center"
      direction="vertical"
      onDragEnd={handleDragEnd}
    >
      <InputSection />
      <ReviewSection />
    </Split>
  );
};

const Split_Horizontal: React.FC = () => {
  const { resetPanelSizes } = usePanelContext();
  const initialSizes = [50, 50];
  const [splitPanelSizes, setSplitPanelSizes] = useState(initialSizes);

  const handleDragEnd = (newSizes: number[]) => {
    if (JSON.stringify(newSizes) !== JSON.stringify(splitPanelSizes)) {
      window.dispatchEvent(new Event("resize"));
      setSplitPanelSizes(newSizes);
    }
  };

  useEffect(() => {
    setSplitPanelSizes(initialSizes);
  }, [resetPanelSizes]);

  return (
    <Suspense>
      <Split
        sizes={splitPanelSizes}
        minSize={450}
        expandToMin={false}
        gutterSize={8}
        gutterAlign="center"
        direction="horizontal"
        onDragEnd={handleDragEnd}
        className="ml-2 flex flex-grow rounded-md"
      >
        <ProblemSection />
        <Split_Vertical />
      </Split>
    </Suspense>
  );
};

export default Split_Horizontal;
