/* eslint-disable testing-library/no-node-access */
import { screen } from "@testing-library/react";
import StorageArea from "./StorageArea";
import "@testing-library/jest-dom";
import React from "react";
import { renderWithProvider } from "./testUtils";

describe("StorageArea", () => {
  it("renders a home page", async () => {
    renderWithProvider(<StorageArea />);

    expect(screen.getByText("Trauma Tower")).toBeDefined();

    [
      "Trauma Chest Drain - Box 1",
      "Trauma Chest Drain - Box 2",
      "Trauma Chest Drain - Box 3",
      "Trauma Chest Drain - Box 4",
      "Trauma Chest Drain - Box 5",
      "Trauma Chest Drain - Box 6",
    ].forEach((title) => {
      expect(screen.getByText(title)).toBeDefined();
    });

    const summaryLink = await screen.findByRole("link");
    expect(summaryLink).toHaveAttribute("href", "/summary");
    expect(summaryLink).toHaveTextContent("Summary");
  });

  it("renders correctly", () => {
    const { container } = renderWithProvider(<StorageArea />);

    expect(container).toMatchSnapshot();
  });

  it("navigates to box page", async () => {
    const { user, history } = renderWithProvider(<StorageArea />);

    expect(screen.getByText("Trauma Tower")).toBeDefined();
    expect(history.location.pathname).toEqual("/");

    const boxFour = await screen.findByText("Trauma Chest Drain - Box 4");

    await user.click(boxFour);

    expect(history.location.pathname).toEqual("/box/0/4");
  });
});
