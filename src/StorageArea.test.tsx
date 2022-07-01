import { render, screen } from "@testing-library/react";
import StorageArea from "./StorageArea";
import "@testing-library/jest-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe("StorageArea", () => {
  it("renders a home page", async () => {
    renderWithRoute();

    expect(screen.getByText("Major Trauma Tower")).toBeDefined();

    const links = await screen.findAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/box/0",
      "/box/1",
      "/box/2",
      "/box/3",
      "/box/4",
      "/box/5",
    ]);
    expect(links.map((link) => link.textContent)).toEqual([
      "trauma chest drain - box 1",
      "trauma chest drain - box 2",
      "trauma chest drain - box 3",
      "trauma chest drain - box 4",
      "trauma chest drain - box 5",
      "trauma chest drain - box 6",
    ]);
  });

  it("renders correctly", () => {
    const { container } =    renderWithRoute();


    expect(container).toMatchSnapshot();
  });

  function renderWithRoute() {
    return    render(
      <MemoryRouter initialEntries={["/"]}>
        <StorageArea  />
      </MemoryRouter>
    );
  }
});
