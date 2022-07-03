/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import StorageArea from "./StorageArea";
import "@testing-library/jest-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockNavigate,
}));

describe("StorageArea", () => {
  it("renders a home page", async () => {
    renderWithRoute();

    expect(screen.getByText("Trauma Tower")).toBeDefined();

    const boxButtons = await screen.findAllByRole("button");

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
    const { container } = renderWithRoute();

    expect(container).toMatchSnapshot();
  });

  it("navigates to box page", async () => {
    const { user } = renderWithRoute();

    expect(screen.getByText("Trauma Tower")).toBeDefined();

    const boxButtons = await screen.findAllByRole("button");

    await user.click(boxButtons[3]);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/box/0/4");
  });

  function renderWithRoute() {
    const user = userEvent.setup();
    return {
      user,
      ...render(
        <MemoryRouter initialEntries={["/"]}>
          <StorageArea />
        </MemoryRouter>
      ),
    };
  }
});
