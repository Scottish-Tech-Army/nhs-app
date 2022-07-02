import { render, screen } from "@testing-library/react";
import StorageArea from "./StorageArea";
import "@testing-library/jest-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe("StorageArea", () => {
  it("renders a home page", async () => {
    renderWithRoute();

    expect(screen.getByText("Trauma Tower")).toBeDefined();

    const links = await screen.findAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/box/0/1",
      "/box/0/2",
      "/box/0/3",
      "/box/0/4",
      "/box/0/5",
      "/box/0/6",
      "/needed",
    ]);
    expect(links.map((link) => link.textContent)).toEqual([
      "Trauma Chest Drain - Box 1",
      "Trauma Chest Drain - Box 2",
      "Trauma Chest Drain - Box 3",
      "Trauma Chest Drain - Box 4",
      "Trauma Chest Drain - Box 5",
      "Trauma Chest Drain - Box 6",
      "Items needed",
    ]);
  });

  it("renders correctly", () => {
    const { container } = renderWithRoute();

    expect(container).toMatchSnapshot();
  });

  function renderWithRoute() {
    return render(
      <MemoryRouter initialEntries={["/"]}>
        <StorageArea />
      </MemoryRouter>
    );
  }
});
