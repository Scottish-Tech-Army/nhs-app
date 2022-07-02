/* eslint-disable testing-library/no-node-access */
import React from "react";

import { screen } from "@testing-library/react";

import ShoppingList from "./ShoppingList";
import { renderWithProvider } from "./testUtils";
import {
  ALL_CONTENTS,
  EMPTY_CONTENTS,
  PARTIAL_CONTENTS,
  ZERO_CONTENTS,
} from "./testData";

describe("ShoppingList", () => {
  const EXPECTED_ALL_ITEMS: ExpectedItem[] = [
    {
      name: "Blunt dissection chest drainage insertion pack (28Fg)",
      quantity: 1,
    },
    { name: "Sterile gloves (Small)", quantity: 1 },
    { name: "Sterile gloves (Medium)", quantity: 1 },
    { name: "Sterile gloves (Large)", quantity: 1 },
    { name: "Chest drain catheter (28Fr)", quantity: 1 },
    { name: "Chest drain catheter (32Fr)", quantity: 1 },
    { name: "Chest drain catheter (36Fr)", quantity: 1 },
    { name: "ChloraPrep applicator", quantity: 2 },
    { name: "Lidocaine 1% (5ml / 50mg)", quantity: 2 },
    { name: "Standard suture pack (Standard)", quantity: 1 },
    { name: "Mefix roll (5cm x 10m)", quantity: 1 },
    { name: "Chest drain bottle", quantity: 1 },
    { name: "Chest drain tubing", quantity: 1 },
    {
      name: "Sterile water (H20) bottle (1000ml bottle)",
      quantity: 1,
    },
    { name: "Spencer wells forceps (Straight 20cm)", quantity: 1 },
  ];

  it("rendered a shopping list page for empty store - ie all items shown", async () => {
    renderWithProvider(<ShoppingList />, {
      preloadedState: { boxContents: EMPTY_CONTENTS },
    });

    expect(screen.getByText("Items to replace")).toBeDefined();

    checkShoppingList([
      {
        name: "Trauma Chest Drain - Box 1",
        items: EXPECTED_ALL_ITEMS,
      },
      {
        name: "Trauma Chest Drain - Box 2",
        items: EXPECTED_ALL_ITEMS,
      },
      {
        name: "Trauma Chest Drain - Box 3",
        items: EXPECTED_ALL_ITEMS,
      },
      {
        name: "Trauma Chest Drain - Box 4",
        items: EXPECTED_ALL_ITEMS,
      },
      {
        name: "Trauma Chest Drain - Box 5",
        items: EXPECTED_ALL_ITEMS,
      },
      {
        name: "Trauma Chest Drain - Box 6",
        items: EXPECTED_ALL_ITEMS,
      },
    ]);
  });

  it("rendered a shopping list page for zero quantity items store - ie all items shown", async () => {
    renderWithProvider(<ShoppingList />, {
      preloadedState: { boxContents: ZERO_CONTENTS },
    });

    expect(screen.getByText("Items to replace")).toBeDefined();

    checkShoppingList([
      {
        name: "Trauma Chest Drain - Box 1",
        items: EXPECTED_ALL_ITEMS,
      },
      {
        name: "Trauma Chest Drain - Box 2",
        items: EXPECTED_ALL_ITEMS,
      },
      {
        name: "Trauma Chest Drain - Box 3",
        items: EXPECTED_ALL_ITEMS,
      },
      {
        name: "Trauma Chest Drain - Box 4",
        items: EXPECTED_ALL_ITEMS,
      },
      {
        name: "Trauma Chest Drain - Box 5",
        items: EXPECTED_ALL_ITEMS,
      },
      {
        name: "Trauma Chest Drain - Box 6",
        items: EXPECTED_ALL_ITEMS,
      },
    ]);
  });

  it("rendered a shopping list page for filled store - ie no items shown", async () => {
    renderWithProvider(<ShoppingList />, {
      preloadedState: { boxContents: ALL_CONTENTS },
    });

    expect(screen.getByText("Items to replace")).toBeDefined();

    expect(screen.getByText("Nothing to replace")).toBeDefined();

    checkShoppingList([]);
  });

  it("rendered a shopping list page for partially filled store - ie some items shown", async () => {
    renderWithProvider(<ShoppingList />, {
      preloadedState: { boxContents: PARTIAL_CONTENTS },
    });

    expect(screen.getByText("Items to replace")).toBeDefined();

    checkShoppingList([
      {
        name: "Trauma Chest Drain - Box 3",
        items: [
          { name: "Sterile gloves (Medium)", quantity: 1 },
          { name: "Sterile gloves (Large)", quantity: 1 },
          { name: "Chest drain catheter (28Fr)", quantity: 1 },
          { name: "Chest drain catheter (32Fr)", quantity: 1 },
          { name: "ChloraPrep applicator", quantity: 2 },
          { name: "Lidocaine 1% (5ml / 50mg)", quantity: 1 },
          { name: "Chest drain bottle", quantity: 1 },
          { name: "Chest drain tubing", quantity: 1 },
          {
            name: "Sterile water (H20) bottle (1000ml bottle)",
            quantity: 1,
          },
        ],
      },
      {
        name: "Trauma Chest Drain - Box 4",
        items: EXPECTED_ALL_ITEMS,
      },
      {
        name: "Trauma Chest Drain - Box 5",
        items: EXPECTED_ALL_ITEMS,
      },
      {
        name: "Trauma Chest Drain - Box 6",
        items: EXPECTED_ALL_ITEMS,
      },
    ]);
  });

  it("renders correctly", () => {
    const { container } = renderWithProvider(<ShoppingList />, {
      preloadedState: { boxContents: PARTIAL_CONTENTS },
    });

    expect(container).toMatchSnapshot();
  });

  type ExpectedItem = {
    name: string;
    quantity: number;
  };

  type ExpectedBoxContents = {
    name: string;
    items: ExpectedItem[];
  };

  function checkShoppingList(expectedBoxes: ExpectedBoxContents[]) {
    const actualBoxes = document.querySelectorAll("div.box")!;

    expect(actualBoxes).toHaveLength(expectedBoxes.length);
    actualBoxes.forEach((actualBox, index) => {
      const expectedBox = expectedBoxes[index];
      expect(actualBox).toHaveTextContent(expectedBox.name);

      const actualItems = actualBox.querySelectorAll("dl div")!;
      expect(actualItems).toHaveLength(expectedBox.items.length);
      actualItems.forEach((actualItem, index) => {
        const expectedItem = expectedBox.items[index];
        expect(actualItem.querySelector("dt")).toHaveTextContent(
          expectedItem.name
        );
        expect(actualItem.querySelector("dd")).toHaveTextContent(
          expectedItem.quantity.toString()
        );
      });
    });
  }
});
