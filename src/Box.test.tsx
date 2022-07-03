/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";

import { getByRole, screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";

import Box from "./Box";
import { FULL_CHEST_DRAIN_BOX } from "./testData";
import { renderWithProvider } from "./testUtils";


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

    expect(screen.getByRole("button", { name: "Save" })).toBeDefined();
  });

  it("does not render if no boxTemplateId", async () => {
    const { container } = renderWithRoute("", "3");

    expect(container).toHaveTextContent("Unknown path");
  });

  it("does not render if no boxId", async () => {
    const { container } = renderWithRoute("0", "");

    expect(container).toHaveTextContent("Unknown path");
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

  it("can save item changes", async () => {
    const { store, user, history } = renderWithRoute("0", "3");

    const itemLabel = screen.getByText(
      "Blunt dissection chest drainage insertion pack (28Fg)"
    );

    const increaseButton = getByRole(itemLabel.parentElement!, "button", {
      name: "add item",
    });
    const decreaseButton = getByRole(itemLabel.parentElement!, "button", {
      name: "remove item",
    });
    await user.click(increaseButton);
    await user.click(increaseButton);
    await user.click(increaseButton);
    await user.click(decreaseButton);

    await user.click(screen.getByRole("button", { name: "Save" }));

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

    expect(history.location.pathname).toEqual("/");
  });

  it("can mark box as full", async () => {
    const { store, user, history } = renderWithRoute("0", "3");

    await user.click(screen.getByRole("button", { name: "FULL" }));

    expect(store.getState().boxContents.boxes[2]).toEqual({
      ...FULL_CHEST_DRAIN_BOX,
      boxNumber: 3,
    });

    expect(history.location.pathname).toEqual("/");
  });

  it("can go to item details", async () => {
    const { user, history } = renderWithRoute("0", "3");

    const itemLabel = screen.getByText("Chest drain catheter (28Fr)");

    const infoButton = getByRole(itemLabel.parentElement!, "button", {
      name: "item information",
    });
    await user.click(infoButton);

    expect(history.location.pathname).toEqual("/item/0/4");
  });

  it("can return to previous page", async () => {
    const { user, history } = renderWithRoute("0", "3");

    await user.click(screen.getByRole("button", { name: "Back" }));

    expect(history.location.pathname).toEqual("/");
  });

  it("renders correctly", () => {
    const { container } = renderWithRoute("0", "3");

    expect(container).toMatchSnapshot();
  });

  function renderWithRoute(boxTemplateId: string, boxId: string) {
    // Add routes to get the contents of useParams populated
    return renderWithProvider(
      <Routes>
        <Route path="box/:boxTemplateId/:boxId" element={<Box />} />
        <Route path="*" element={<div>Unknown path</div>} />
      </Routes>,
      { initialRoutes: ["/", `/box/${boxTemplateId}/${boxId}`] }
    );
  }
});
