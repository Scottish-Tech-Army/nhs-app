/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { getByRole, screen } from "@testing-library/react";
import localforage from "localforage";
import React from "react";
import App from "./App";
import { renderWithProvider } from "./testUtils";

describe("App", () => {
  it("renders default view", async () => {
    const { user } = renderWithProvider(<App />);
    await user.click(screen.getByRole("button", { name: "Accept" }));

    expect(screen.getByText("Trauma Tower")).toBeDefined();
    expect(localforage.getItem).toHaveBeenCalledTimes(1);
    expect(localforage.getItem).toHaveBeenCalledWith("boxContents");
  });

  it("renders shopping list view", async () => {
    const { user } = renderWithProvider(<App />);
    await user.click(screen.getByRole("button", { name: "Accept" }));

    await user.click(screen.getByRole("link", { name: "Summary" }));

    expect(screen.queryByText("Trauma Tower")).toBeNull();
    expect(screen.getByText("Summary")).toBeDefined();

  });

  it("renders box view", async () => {
    const { user } = renderWithProvider(<App />);
    await user.click(screen.getByRole("button", { name: "Accept" }));

    await user.click(
      screen.getByText("Trauma Chest Drain - Box 2").previousElementSibling!
    );

    expect(screen.getByText("Trauma Chest Drain - Box 2")).toBeDefined();

    expect(
      screen.getByText("Blunt dissection chest drainage insertion pack (28Fg)")
    ).toBeDefined();
  });

  it("renders item view from box view", async () => {
    const { user } = renderWithProvider(<App />);
    await user.click(screen.getByRole("button", { name: "Accept" }));

    await user.click(
      screen.getByText("Trauma Chest Drain - Box 2").previousElementSibling!
    );

    expect(screen.getByText("Trauma Chest Drain - Box 2")).toBeDefined();

    const itemLabel = screen.getByText("Chest drain catheter (28Fr)");

    const infoButton = getByRole(itemLabel.parentElement!, "button", {
      name: "item information",
    });
    await user.click(infoButton);

    expect(screen.getByText("Item Details")).toBeDefined();
    expect(screen.getByText("Chest drain catheter")).toBeDefined();
  });

  it("disclaimer must be accepted to continue", async () => {
    const { user } = renderWithProvider(<App />);

    expect(
      screen.getByText(
        "This application is for demo use only. It is not intended for real life use."
      )
    ).toBeDefined();

    await user.click(screen.getByRole("button", { name: "Accept" }));

    expect(
      screen.queryByText(
        "This application is for demo use only. It is not intended for real life use."
      )
    ).toBeNull();
  });
});
