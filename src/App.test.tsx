/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { getByRole, screen } from "@testing-library/react";
import React from "react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { renderWithProvider } from "./testUtils";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  it("renders default view", () => {
    renderWithProvider(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Trauma Tower")).toBeDefined();
  });

  it("renders shopping list view", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("link", { name: "Items needed" }));

    expect(screen.getByText("Items to replace")).toBeDefined();
  });

  it("renders box view", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("link", { name: "Trauma Chest Drain - Box 2" })
    );

    expect(screen.getByText("Trauma Chest Drain - Box 2")).toBeDefined();

    expect(
      screen.getByText("Blunt dissection chest drainage insertion pack (28Fg)")
    ).toBeDefined();
  });

  it("renders item view from box view", async () => {
    const user = userEvent.setup();

    renderWithProvider(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("link", { name: "Trauma Chest Drain - Box 2" })
    );

    expect(screen.getByText("Trauma Chest Drain - Box 2")).toBeDefined();

    const itemLabel = screen.getByText("Chest drain catheter (28Fr)");

    const infoButton = getByRole(itemLabel.parentElement!, "button", {
      name: "i",
    });
    await user.click(infoButton);

    expect(screen.getByText("Item Details")).toBeDefined();
    expect(screen.getByText("Chest drain catheter")).toBeDefined();
  });
});
