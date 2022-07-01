import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("compoent App", () => {
  it("renders default view", () => {
    render(<App />);
    expect(screen.getByText("Major Trauma Tower")).toBeDefined();
  });

  it("renders box view", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole("link", { name: "trauma chest drain - box 2" }));

    expect(screen.getByText("trauma chest drain - box 2")).toBeDefined();


    expect(screen.getByText("Blunt dissection chest drainage insertion pack")).toBeDefined();
  });
});
