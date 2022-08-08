/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { getByRole, screen, within } from "@testing-library/react";
import React from "react";
import App from "./App";
import { INITIAL_SIGNED_IN_STATE, renderWithProvider } from "./testUtils";

jest.mock("@aws-amplify/core");

describe("App", () => {
  it("renders default view", async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole("button", { name: "Accept" }));

    expect(screen.getByRole("heading", { name: "Directory" })).toBeDefined();
  });

  it("renders missing-items view", async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole("button", { name: "Accept" }));

    await user.click(screen.getByRole("link", { name: "missing-items" }));

    expect(screen.queryByRole("heading", { name: "Directory" })).toBeNull();
    expect(
      screen.getByRole("heading", { name: "Missing Items" })
    ).toBeDefined();
  });

  it("renders storage area view", async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole("button", { name: "Accept" }));

    await user.click(screen.getByText("Trauma Tower"));

    expect(screen.getByText("Trauma Chest Drain")).toBeDefined();
  });

  it("renders storage area group view", async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole("button", { name: "Accept" }));

    await user.click(screen.getByText("Airway Trolleys"));

    expect(screen.getByText("Airway Trolley 1")).toBeDefined();
  });

  it("renders storage area from storage area group view", async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole("button", { name: "Accept" }));

    await user.click(screen.getByText("Airway Trolleys"));
    await user.click(screen.getByText("Airway Trolley 1"));

    expect(screen.getByText("Drawer E")).toBeDefined();
  });

  it("renders container view", async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole("button", { name: "Accept" }));
    await user.click(screen.getByText("Trauma Tower"));
    await user.click(
      within(screen.getByText("Trauma Chest Drain").parentElement!).getByText(
        "2"
      )
    );

    expect(screen.getByRole("heading")).toHaveTextContent(
      "Trauma Chest Drain - Box 2"
    );

    expect(
      screen.getByText("Blunt dissection chest drainage insertion pack (28Fg)")
    ).toBeDefined();
  });

  it("renders item view from container view", async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole("button", { name: "Accept" }));
    await user.click(screen.getByText("Trauma Tower"));

    await user.click(
      within(screen.getByText("Trauma Chest Drain").parentElement!).getByText(
        "2"
      )
    );

    expect(screen.getByRole("heading")).toHaveTextContent(
      "Trauma Chest Drain - Box 2"
    );

    const itemLabel = screen.getByText("Chest drain catheter (28Fr)");

    const infoButton = getByRole(itemLabel.parentElement!, "button", {
      name: "item information",
    });
    await user.click(infoButton);

    expect(screen.getByText("Item Details")).toBeDefined();
    expect(screen.getByText("Chest drain catheter")).toBeDefined();
  });

  it("disclaimer must be accepted to continue", async () => {
    const { user } = renderComponent();

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

  it("signin page if not signed in", async () => {
    renderWithProvider(
      <div id="root">
        <App />
      </div>
    );

    expect(screen.getByText("Username")).toBeDefined();
    expect(screen.getByText("Password")).toBeDefined();
  });

  function renderComponent() {
    return renderWithProvider(
      <div id="root">
        <App />
      </div>,
      { preloadedState: INITIAL_SIGNED_IN_STATE }
    );
  }
});
