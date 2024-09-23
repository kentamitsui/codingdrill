"use client";

import React, { useState, useEffect } from "react";
import Split from "react-split";
import ProblemSection from "../../components/ProblemSection";
import InputSection from "../../components/InputSection";
import ReviewSection from "../../components/ReviewSection";

const Split_Vertical = () => {
  const initialSizes = [50, 50];
  const [sizes, setSizes] = useState(initialSizes);

  const resetSizes = () => {
    setSizes(initialSizes);
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
      minSize={200}
      expandToMin={false}
      gutterSize={8}
      gutterAlign="center"
      direction="vertical"
      onDragEnd={(newSizes) => setSizes(newSizes)}
    >
      <InputSection />
      <ReviewSection />
    </Split>
  );
};

const Split_Horizontal = () => {
  const initialSizes = [50, 50];
  const [sizes, setSizes] = useState(initialSizes);

  const resetSizes = () => {
    setSizes(initialSizes);
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
      minSize={400}
      expandToMin={false}
      gutterSize={8}
      gutterAlign="center"
      direction="horizontal"
      onDragEnd={(newSizes) => setSizes(newSizes)}
      className="ml-2 flex flex-grow rounded-md"
    >
      <ProblemSection />
      <Split_Vertical />
    </Split>
  );
};

export default Split_Horizontal;
