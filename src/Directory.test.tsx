/* eslint-disable testing-library/no-node-access */
import { screen } from "@testing-library/react";
import Directory from "./Directory";
import "@testing-library/jest-dom";
import React from "react";
import { renderWithProvider } from "./testUtils";

describe("Directory", () => {
  it("renders a home page", async () => {
    renderWithProvider(<Directory />);

    expect(screen.getByRole("heading", { name: "Directory" })).toBeDefined();

    [
      "Trauma Tower",
      "Airway Trolley 1",
      "Airway Trolley 2",
    ].forEach((title) => {
      expect(screen.getByText(title)).toBeDefined();
    });

    const missingItemsLink = await screen.findByRole("link", { name: "missing-items" });
    expect(missingItemsLink).toHaveAttribute("href", "/missing-items");
  });

  it("renders correctly", () => {
    const { container } = renderWithProvider(<Directory />);

    expect(container).toMatchSnapshot();
  });

  it("navigates to storage area page", async () => {
    const { user, history } = renderWithProvider(<Directory />);
    
    expect(screen.getByRole("heading", { name: "Directory" })).toBeDefined();

    expect(history.location.pathname).toEqual("/");

    await user.click(await screen.findByText("Trauma Tower"));

    expect(history.location.pathname).toEqual("/area/trauma-tower");
  });
});
