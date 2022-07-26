/* eslint-disable testing-library/no-node-access */
import { screen } from "@testing-library/react";
import Directory from "./Directory";
import "@testing-library/jest-dom";
import React from "react";
import { renderWithProvider } from "./testUtils";

describe("Directory", () => {
  it("renders a home page", async () => {
    renderWithProvider(<Directory />);

    expect(screen.getByText("Trauma Tower")).toBeDefined();

    [
      "Trauma Chest Drain - Box 1",
      "Trauma Chest Drain - Box 2",
      "Trauma Chest Drain - Box 3",
      "Trauma Chest Drain - Box 4",
      "Trauma Chest Drain - Box 5",
      "Trauma Chest Drain - Box 6",
      "Catastrophic Haemorrhage - Box 1",
      "Catastrophic Haemorrhage - Box 2",
      "Catastrophic Haemorrhage - Box 3",
      "Max Fax Haemorrhage - Box 1",
      "Max Fax Haemorrhage - Box 2",
      "Max Fax Haemorrhage - Box 3",
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

  it("navigates to box page", async () => {
    const { user, history } = renderWithProvider(<Directory />);

    expect(screen.getByText("Trauma Tower")).toBeDefined();
    expect(history.location.pathname).toEqual("/");

    const boxFour = await screen.findByText("Trauma Chest Drain - Box 4");

    await user.click(boxFour);

    expect(history.location.pathname).toEqual("/box/0/4");
  });
});
