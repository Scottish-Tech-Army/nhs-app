/* eslint-disable testing-library/no-node-access */
import { screen, within } from "@testing-library/react";
import Directory2 from "./Directory2";
import "@testing-library/jest-dom";
import React from "react";
import { renderWithProvider } from "./testUtils";

describe("Directory2", () => {
  it("renders a home page", async () => {
    const { container } = renderWithProvider(<Directory2 />);

    expect(screen.getByText("Trauma Tower")).toBeDefined();

    [
      "Trauma Chest Drain",
      "Catastrophic Haemorrhage",
      "Max Fax Haemorrhage",
    ].forEach((title) => {
      expect(screen.getByText(title)).toBeDefined();
    });

    const summaryLink = await screen.findByRole("link", { name: "summary" });
    expect(summaryLink).toHaveAttribute("href", "/summary");

    expect(container).toMatchSnapshot();
  });

  it("navigates to box page", async () => {
    const { user, history } = renderWithProvider(<Directory2 />);

    expect(screen.getByText("Trauma Tower")).toBeDefined();
    expect(history.location.pathname).toEqual("/");

    const boxFour = within(
      screen.getByText("Trauma Chest Drain").parentElement!
    ).getByText("4");

    await user.click(boxFour);

    expect(history.location.pathname).toEqual("/box/0/4");
  });
});
