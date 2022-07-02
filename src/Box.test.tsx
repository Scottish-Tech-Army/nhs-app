/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";

import { getByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";

import Box from "./Box";
import { createStore } from "./data/store";
import { FULL_CHEST_DRAIN_BOX } from "./testData";

jest.mock("react-router-dom");

const navigate = jest.fn();

describe("Box", () => {
  it("rendered a box page", async () => {
    renderWithRoute("0", "3");
    expect(screen.getByText("Trauma Chest Drain - Box 3")).toBeDefined();

    const inputFields = Array.from(document.querySelectorAll(".display-name"));

    expect(inputFields.map((input) => input.textContent)).toEqual([
      "Blunt dissection chest drainage insertion pack (28Fg)",
      "Sterile gloves (Small)",
      "Sterile gloves (Medium)",
      "Sterile gloves (Large)",
      "Chest drain catheter (28Fr)",
      "Chest drain catheter (32Fr)",
      "Chest drain catheter (36Fr)",
      "ChloraPrep applicator",
      "Lidocaine 1% (5ml / 50mg)",
      "Standard suture pack (Standard)",
      "Mefix roll (5cm x 10m)",
      "Chest drain bottle",
      "Chest drain tubing",
      "Sterile water (H20) bottle (1000ml bottle)",
      "Spencer wells forceps (Straight 20cm)",
    ]);

    expect(screen.getByRole("button", { name: "Submit" })).toBeDefined();
  });

  it("does not render if no boxTemplateId", async () => {
    const { container } = renderWithRoute("", "3");

    expect(container.children).toHaveLength(0);

    expect(container).toMatchSnapshot();
  });

  it("does not render if no boxId", async () => {
    const { container } = renderWithRoute("0", "");

    expect(container.children).toHaveLength(0);

    expect(container).toMatchSnapshot();
  });

  it("does not render if unknown boxTemplateId", async () => {
    const { container } = renderWithRoute("Unknown", "4");

    expect(container.children).toHaveLength(0);

    expect(container).toMatchSnapshot();
  });

  it("does not render if unknown boxId", async () => {
    const { container } = renderWithRoute("0", "Unknown");

    expect(container.children).toHaveLength(0);

    expect(container).toMatchSnapshot();
  });

  it("does not render if unknown boxId - box number too high", async () => {
    const { container } = renderWithRoute("0", "7");

    expect(container.children).toHaveLength(0);

    expect(container).toMatchSnapshot();
  });

  it("can submit item changes", async () => {
    const user = userEvent.setup();
    jest.spyOn(window, "alert").mockImplementation(() => {});

    const { store } = renderWithRoute("0", "3");

    const itemLabel = screen.getByText(
      "Blunt dissection chest drainage insertion pack (28Fg)"
    );

    const increaseButton = getByRole(itemLabel.parentElement!, "button", {
      name: "+",
    });
    const decreaseButton = getByRole(itemLabel.parentElement!, "button", {
      name: "-",
    });
    await user.click(increaseButton);
    await user.click(increaseButton);
    await user.click(increaseButton);
    await user.click(decreaseButton);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(store.getState().boxContents.boxes[2].items).toEqual([
      {
        quantity: 2,
        name: "Blunt dissection chest drainage insertion pack",
        size: "28Fg",
      },
      { quantity: 0, name: "Sterile gloves", size: "Small" },
      { quantity: 0, name: "Sterile gloves", size: "Medium" },
      { quantity: 0, name: "Sterile gloves", size: "Large" },
      { quantity: 0, name: "Chest drain catheter", size: "28Fr" },
      { quantity: 0, name: "Chest drain catheter", size: "32Fr" },
      { quantity: 0, name: "Chest drain catheter", size: "36Fr" },
      { quantity: 0, name: "ChloraPrep applicator" },
      { quantity: 0, name: "Lidocaine 1%", size: "5ml / 50mg" },
      { quantity: 0, name: "Standard suture pack", size: "Standard" },
      { quantity: 0, name: "Mefix roll", size: "5cm x 10m" },
      { quantity: 0, name: "Chest drain bottle" },
      { quantity: 0, name: "Chest drain tubing" },
      {
        quantity: 0,
        name: "Sterile water (H20) bottle",
        size: "1000ml bottle",
      },
      { quantity: 0, name: "Spencer wells forceps", size: "Straight 20cm" },
    ]);

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("can mark box as filled", async () => {
    const user = userEvent.setup();
    jest.spyOn(window, "alert").mockImplementation(() => {});

    const { store } = renderWithRoute("0", "3");

    await user.click(screen.getByRole("button", { name: "Filled" }));

    expect(store.getState().boxContents.boxes[2]).toEqual({
      ...FULL_CHEST_DRAIN_BOX,
      boxNumber: 3,
    });

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("renders correctly", () => {
    const { container } = renderWithRoute("0", "3");

    expect(container).toMatchSnapshot();
  });

  function renderWithRoute(boxTemplateId: string, boxId: string) {
    const store = createStore();
    (useParams as jest.Mock).mockReturnValue({ boxTemplateId, boxId });
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    return {
      store,
      ...render(
        <Provider store={store}>
          <Box />
        </Provider>
      ),
    };
  }
});
