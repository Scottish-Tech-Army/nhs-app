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
  const EXPECTED_ALL_ITEMS: string[] = [
    "1 x Blunt dissection chest drainage insertion pack (28Fg)",
    "1 x Sterile gloves (Small)",
    "1 x Sterile gloves (Medium)",
    "1 x Sterile gloves (Large)",
    "1 x Chest drain catheter (28Fr)",
    "1 x Chest drain catheter (32Fr)",
    "1 x Chest drain catheter (36Fr)",
    "2 x ChloraPrep applicator",
    "2 x Lidocaine 1% (5ml / 50mg)",
    "1 x Standard suture pack (Standard)",
    "1 x Mefix roll (5cm x 10m)",
    "1 x Chest drain bottle",
    "1 x Chest drain tubing",
    "1 x Sterile water (H20) bottle (1000ml bottle)",
    "1 x Spencer wells forceps (Straight 20cm)",
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
          "1 x Sterile gloves (Medium)",
          "1 x Sterile gloves (Large)",
          "1 x Chest drain catheter (28Fr)",
          "1 x Chest drain catheter (32Fr)",
          "2 x ChloraPrep applicator",
          "1 x Lidocaine 1% (5ml / 50mg)",
          "1 x Chest drain bottle",
          "1 x Chest drain tubing",
          "1 x Sterile water (H20) bottle (1000ml bottle)",
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

  it("can return to storage area page", async () => {
    const { user, history } = renderWithProvider(<ShoppingList />, {initialRoutes: ['/', '/needed']});

    expect(history.location.pathname).toEqual('/needed');

    await user.click(screen.getByRole("button", { name: "Back" }));

    expect(history.location.pathname).toEqual('/');
  });

  type ExpectedBoxContents = {
    name: string;
    items: string[];
  };

  function checkShoppingList(expectedBoxes: ExpectedBoxContents[]) {
    const actualBoxes = document.querySelectorAll("div.box")!;

    expect(actualBoxes).toHaveLength(expectedBoxes.length);
    actualBoxes.forEach((actualBox, index) => {
      const expectedBox = expectedBoxes[index];
      expect(actualBox).toHaveTextContent(expectedBox.name);

      const actualItems = actualBox.querySelectorAll("div.item")!;
      expect(actualItems).toHaveLength(expectedBox.items.length);
      actualItems.forEach((actualItem, index) => {
        const expectedItem = expectedBox.items[index];
        expect(actualItem).toHaveTextContent(expectedItem);
      });
    });
  }
});
