import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

describe("compoent App", () => {
  test("renders default view", () => {
    render(<App />);
    expect(screen.getByText("Major Trauma Tower")).toBeDefined();
  });
});
