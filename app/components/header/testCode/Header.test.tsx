import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@/app/components/header/Header";
import { SelectedDataProvider } from "@/app/context/AppContext";
import { PanelProvider } from "@/app/feature/splitter/context/PanelContext";
import { describe, it, expect } from "vitest";

describe("Header Component", () => {
  it("renders the header with the correct text", () => {
    render(
      <SelectedDataProvider>
        <PanelProvider>
          <Header />
        </PanelProvider>
      </SelectedDataProvider>,
    );
    const headerElement = screen.getByText(/Coding Drill/i);
    expect(headerElement).toBeInTheDocument();
  });

  it("renders ThemeToggle and RestoreButton components", () => {
    render(
      <SelectedDataProvider>
        <PanelProvider>
          <Header />
        </PanelProvider>
      </SelectedDataProvider>,
    );
    const themeToggleElement = screen.getByRole("button", {
      name: /Toggle theme/i,
    });
    const restoreButtonElement = screen.getByRole("button", {
      name: /Restore/i,
    });
    expect(themeToggleElement).toBeInTheDocument();
    expect(restoreButtonElement).toBeInTheDocument();
  });
});
