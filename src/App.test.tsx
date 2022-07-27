/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { getByRole, screen } from "@testing-library/react";
import React from "react";
import App from "./App";
import { INITIAL_SIGNED_IN_STATE, renderWithProvider } from "./testUtils";

jest.mock("@aws-amplify/core");

describe("App", () => {
  it("renders default view", async () => {
    const { user } = renderWithProvider(<App />, {
      preloadedState: INITIAL_SIGNED_IN_STATE,
    });
    await user.click(screen.getByRole("button", { name: "Accept" }));

    expect(screen.getByText("Directory")).toBeDefined();
  });

  it("renders summary view", async () => {
    const { user } = renderWithProvider(<App />, {
      preloadedState: INITIAL_SIGNED_IN_STATE,
    });
    await user.click(screen.getByRole("button", { name: "Accept" }));

    await user.click(screen.getByRole("link", { name: "summary" }));

    expect(screen.queryByText("Directory")).toBeNull();
    expect(screen.getByRole("heading", { name: "Summary" })).toBeDefined();
  });

  it("renders storage area view", async () => {
    const { user } = renderWithProvider(<App />, {
      preloadedState: INITIAL_SIGNED_IN_STATE,
    });
    await user.click(screen.getByRole("button", { name: "Accept" }));

    await user.click(screen.getByText("Trauma Tower 1"));

    expect(screen.getByText("Trauma Chest Drain")).toBeDefined();
  });

  it("renders box view", async () => {
    const { user } = renderWithProvider(<App />, {
      preloadedState: INITIAL_SIGNED_IN_STATE,
    });
    await user.click(screen.getByRole("button", { name: "Accept" }));
    await user.click(screen.getByText("Trauma Tower 1"));
    await user.click(screen.getByText("Trauma Chest Drain - Box 2"));

    expect(screen.getByText("Trauma Chest Drain - Box 2")).toBeDefined();

    expect(
      screen.getByText("Blunt dissection chest drainage insertion pack (28Fg)")
    ).toBeDefined();
  });

  it("renders item view from box view", async () => {
    const { user } = renderWithProvider(<App />, {
      preloadedState: INITIAL_SIGNED_IN_STATE,
    });
    await user.click(screen.getByRole("button", { name: "Accept" }));
    await user.click(screen.getByText("Trauma Tower 1"));
    await user.click(screen.getByText("Trauma Chest Drain - Box 2"));

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
    const { user } = renderWithProvider(<App />, {
      preloadedState: INITIAL_SIGNED_IN_STATE,
    });

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
    renderWithProvider(<App />);

    expect(screen.getByText("Username")).toBeDefined();
    expect(screen.getByText("Password")).toBeDefined();
  });
});
