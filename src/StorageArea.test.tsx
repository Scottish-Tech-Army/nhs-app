import { render, screen } from "@testing-library/react";
import StorageArea from "./StorageArea";
import "@testing-library/jest-dom";
import React from "react";

describe("StorageArea", () => {
  it("renders a home page", async () => {
    render(<StorageArea />);

    expect(screen.getByText("Trauma Tower")).toBeDefined();

    const links = await screen.findAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/box/0-1",
      "/box/0-2",
      "/box/0-3",
      "/box/0-4",
      "/box/0-5",
      "/box/0-6",
    ]);
    expect(links.map((link) => link.textContent)).toEqual([
      "Trauma Chest Drain - Box 1",
      "Trauma Chest Drain - Box 2",
      "Trauma Chest Drain - Box 3",
      "Trauma Chest Drain - Box 4",
      "Trauma Chest Drain - Box 5",
      "Trauma Chest Drain - Box 6",
    ]);
  });

  it("renders correctly", () => {
    const { container } = render(<StorageArea />);

    expect(container).toMatchSnapshot();
  });
});
