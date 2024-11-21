"use client";

import React, { useState, useEffect } from "react";
import Split from "react-split";
import ProblemSection from "../../components/ProblemSection";
import InputSection from "../../components/InputSection";
import ReviewSection from "../../components/ReviewSection";
import { ProblemSectionProps } from "@/app/type/type";

const Split_Vertical = ({ problemData }) => {
  const initialSizes = [50, 50];
  const [sizes, setSizes] = useState(initialSizes);
  const [reviewData, setReviewData] = useState<null | string>(null);
  const [createProblemData, setCreateProblemData] = useState(null);

  const resetSizes = () => {
    setSizes(initialSizes);
  };

  useEffect(() => {
    if (problemData !== "") {
      setCreateProblemData(problemData);
    }
  });

  const handleDragEnd = (newSizes: number[]) => {
    // 仕切り線をドラッグ&ドロップした時のみ、リサイズイベントが発火する
    // 発火する度に、state(sizes)の数値(width,height)が更新される
    if (JSON.stringify(newSizes) !== JSON.stringify(sizes)) {
      window.dispatchEvent(new Event("resize"));
      setSizes(newSizes);
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
      sizes={sizes}
      minSize={250}
      expandToMin={false}
      gutterSize={8}
      gutterAlign="center"
      direction="vertical"
      onDragEnd={handleDragEnd}
    >
      <InputSection
        setReviewData={setReviewData}
        problemData={JSON.stringify(createProblemData)}
      />
      <ReviewSection setResponseReviewData={reviewData} />
    </Split>
  );
};

const Split_Horizontal: React.FC<ProblemSectionProps> = ({ problemData }) => {
  const initialSizes = [50, 50];
  const [sizes, setSizes] = useState(initialSizes);

  const resetSizes = () => {
    setSizes(initialSizes);
  };

  const handleDragEnd = (newSizes: number[]) => {
    if (JSON.stringify(newSizes) !== JSON.stringify(sizes)) {
      window.dispatchEvent(new Event("resize"));
      setSizes(newSizes);
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
      sizes={sizes}
      minSize={450}
      expandToMin={false}
      gutterSize={8}
      gutterAlign="center"
      direction="horizontal"
      onDragEnd={handleDragEnd}
      className="ml-2 flex flex-grow rounded-md"
    >
      {/* ProblemSectionコンポーネントに、親コンポーネントMainから受け取ったJSONデータを渡す */}
      <ProblemSection problemData={JSON.stringify(problemData)} />
      <Split_Vertical problemData={problemData} />
    </Split>
  );
};

export default Split_Horizontal;
