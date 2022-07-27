/* eslint-disable testing-library/no-node-access */
import { screen } from "@testing-library/react";
import Directory from "./Directory";
import "@testing-library/jest-dom";
import React from "react";
import { renderWithProvider } from "./testUtils";

describe("Directory", () => {
  it("renders a home page", async () => {
    renderWithProvider(<Directory />);

    expect(screen.getByText("Directory")).toBeDefined();

    [
      "Trauma Tower 1",
      "Trauma Tower 2",
      "Storage area",
    ].forEach((title) => {
      expect(screen.getByText(title)).toBeDefined();
    });

    const summaryLink = await screen.findByRole("link", { name: "summary" });
    expect(summaryLink).toHaveAttribute("href", "/summary");
  });

  it("renders correctly", () => {
    const { container } = renderWithProvider(<Directory />);

    expect(container).toMatchSnapshot();
  });

  it("navigates to storage area page", async () => {
    const { user, history } = renderWithProvider(<Directory />);

    expect(screen.getByText("Directory")).toBeDefined();
    expect(history.location.pathname).toEqual("/");

    await user.click(await screen.findByText("Trauma Tower 2"));

    expect(history.location.pathname).toEqual("/area/1");
  });
});
