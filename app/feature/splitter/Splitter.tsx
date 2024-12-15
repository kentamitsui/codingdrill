"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
const Split = lazy(() => import("react-split"));
import ProblemSection from "../../components/ProblemSection";
import InputSection from "../../components/InputSection";
import ReviewSection from "../../components/ReviewSection";
import { ReviewResponse, SplitterProps } from "@/app/type/type";
import { usePanelContext } from "./PanelContext";

const Split_Vertical: React.FC<SplitterProps> = ({
  setIsDisabledData,
  getIsDisabledData,
  editorContent,
}) => {
  const { resetPanelSizes } = usePanelContext();
  const initialSizes = [50, 50];
  const [splitPanelSizes, setSplitPanelSizes] = useState(initialSizes);
  const [_, setReviewContent] = useState<ReviewResponse | null>(null);
  const [formattedProblemContent, setFormattedProblemContent] = useState<
    string | null
  >(null);

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
      <InputSection
        setReviewData={setReviewContent}
        problemData={JSON.stringify(formattedProblemContent)}
        setIsDisabledData={setIsDisabledData}
        getIsDisabledData={getIsDisabledData}
        // localStorageEditorLanguage={editorLanguage}
        editorContent={editorContent}
      />
      <ReviewSection getIsDisabledData={getIsDisabledData} />
    </Split>
  );
};

const Split_Horizontal: React.FC<SplitterProps> = ({
  setIsDisabledData,
  getIsDisabledData,
  editorContent,
}) => {
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
        {/* ProblemSectionコンポーネントに、親コンポーネントMainから受け取ったJSONデータを渡す
          Split_Verticalには、問題文のデータを渡す*/}
        <ProblemSection getIsDisabledData={getIsDisabledData} />
        <Split_Vertical
          setIsDisabledData={setIsDisabledData}
          getIsDisabledData={getIsDisabledData}
          editorContent={editorContent}
        />
      </Split>
    </Suspense>
  );
};

export default Split_Horizontal;
