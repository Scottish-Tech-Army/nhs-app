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

    const boxButtons = await screen.findAllByRole("button", {
      name: "check box",
    });

    expect(
      boxButtons.map((boxButton) => boxButton.nextSibling!.textContent)
    ).toEqual([
      "Trauma Chest Drain - Box 1",
      "Trauma Chest Drain - Box 2",
      "Trauma Chest Drain - Box 3",
      "Trauma Chest Drain - Box 4",
      "Trauma Chest Drain - Box 5",
      "Trauma Chest Drain - Box 6",
    ]);

    const neededLink = await screen.findByRole("link");
    expect(neededLink).toHaveAttribute("href", "/needed");
    expect(neededLink).toHaveTextContent("Items needed");
  });

  it("renders correctly", () => {
    const { container } = renderWithProvider(<StorageArea />);

    expect(container).toMatchSnapshot();
  });

  it("navigates to box page", async () => {
    const { user, history } = renderWithProvider(<StorageArea />);

    expect(screen.getByText("Trauma Tower")).toBeDefined();
    expect(history.location.pathname).toEqual("/");

    const boxButtons = await screen.findAllByRole("button", {
      name: "check box",
    });

    await user.click(boxButtons[3]);

    expect(history.location.pathname).toEqual("/box/0/4");
  });
});
