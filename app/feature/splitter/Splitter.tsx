"use client";

import React, { useState, useEffect } from "react";
import Split from "react-split";
import ProblemSection from "../../components/ProblemSection";
import InputSection from "../../components/InputSection";
import ReviewSection from "../../components/ReviewSection";
import { ReviewResponse, SplitterProps } from "@/app/type/type";

const Split_Vertical: React.FC<SplitterProps> = ({
  problemData,
  displayLanguageData,
}) => {
  const initialSizes = [50, 50];
  const [splitPanelSizes, setSplitPanelSizes] = useState(initialSizes);
  const [reviewContent, setReviewContent] = useState<ReviewResponse | null>(
    null,
  );
  const [formattedProblemContent, setFormattedProblemContent] = useState<
    string | null
  >(null);

  const resetSizes = () => {
    setSplitPanelSizes(initialSizes);
  };

  useEffect(() => {
    if (problemData !== null && problemData !== "") {
      setFormattedProblemContent(problemData); // 型が一致
    }
  }, [problemData]);

  const handleDragEnd = (newSizes: number[]) => {
    // 仕切り線をドラッグ&ドロップした時のみ、リサイズイベントが発火する
    // 発火する度に、state(sizes)の数値(width,height)が更新される
    if (JSON.stringify(newSizes) !== JSON.stringify(splitPanelSizes)) {
      window.dispatchEvent(new Event("resize"));
      setSplitPanelSizes(newSizes);
    }
  };

  useEffect(() => {
    const resetButton = document.getElementById("resetLayout");

    if (resetButton) {
      resetButton.addEventListener("click", resetSizes);
    }

    return () => {
      if (resetButton) {
        resetButton.removeEventListener("click", resetSizes);
      }
    };
  }, []);

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
        displayLanguageData={displayLanguageData}
      />
      <ReviewSection setResponseReviewData={reviewContent} />
    </Split>
  );
};

const Split_Horizontal: React.FC<SplitterProps> = ({
  problemData,
  displayLanguageData,
}) => {
  const initialSizes = [50, 50];
  const [splitPanelSizes, setSplitPanelSizes] = useState(initialSizes);

  const resetSizes = () => {
    setSplitPanelSizes(initialSizes);
  };

  const handleDragEnd = (newSizes: number[]) => {
    if (JSON.stringify(newSizes) !== JSON.stringify(splitPanelSizes)) {
      window.dispatchEvent(new Event("resize"));
      setSplitPanelSizes(newSizes);
    }
  };

  useEffect(() => {
    const resetButton = document.getElementById("resetLayout");

    if (resetButton) {
      resetButton.addEventListener("click", resetSizes);
    }

    return () => {
      if (resetButton) {
        resetButton.removeEventListener("click", resetSizes);
      }
    };
  }, []);

  return (
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
      <ProblemSection displayProblemData={JSON.stringify(problemData)} />
      <Split_Vertical
        problemData={problemData}
        displayLanguageData={displayLanguageData}
      />
    </Split>
  );
};

export default Split_Horizontal;
