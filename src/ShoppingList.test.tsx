import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import storageAreaContents from "./data/traumaTower";

import Box from "./Box";

const setBoxContents = jest.fn();

describe("ShoppingList", () => {
  it("rendered a shopping list page for empty store - ie all items shown", async () => {
    render(
      <ShoppingList
        expectedContents={storageAreaContents}
        actualContents={[]}
      />
    );
    expect(screen.getByText("Items to replace")).toBeDefined();

    checkShoppingList([
      {
        name: "Box 1",
        items: ["item11", "item22", "item33", "item44", "item55", "item66"],
      },
      {
        name: "Box 2",
        items: ["item11", "item22", "item33", "item44", "item55", "item66"],
      },
    ]);
  });

  it("rendered a shopping list page for filled store - ie no items shown", async () => {
    render(
      <ShoppingList
        expectedContents={storageAreaContents}
        actualContents={ALL_CONTENTS}
      />
    );
    expect(screen.getByText("Items to replace")).toBeDefined();

    checkShoppingList([]);
  });

  it("rendered a shopping list page for partially filled store - ie some items shown", async () => {
    render(
      <ShoppingList
        expectedContents={storageAreaContents}
        actualContents={PARTIAL_CONTENTS}
      />
    );
    expect(screen.getByText("Items to replace")).toBeDefined();

    checkShoppingList([
      { name: "Box 2", items: ["item22", "item33", "item55"] },
    ]);
  });

  it("renders correctly", () => {
    const { container } = render(
      <ShoppingList
        expectedContents={storageAreaContents}
        actualContents={PARTIAL_CONTENTS}
      />
    );

    expect(container).toMatchSnapshot();
  });

  type ExpectedBoxContents = {
    name: string;
    items: string[];
  };

  function checkShoppingList(expectedBoxes: ExpectedBoxContents[]) {
    // eslint-disable-next-line testing-library/no-node-access
    const actualBoxes = document.querySelectorAll("div.boxes")!;

    expect(actualBoxes).toHaveLength(expectedBoxes.length);
    actualBoxes.forEach((actualBox, index) => {
      const expectedBox = expectedBoxes[index];
      expect(actualBox).toHaveTextContent(expectedBox.name);

      // eslint-disable-next-line testing-library/no-node-access
      const actualItems = document.querySelectorAll("dl div")!;
      expect(actualItems).toHaveLength(expectedBox.items.length);
      actualItems.forEach((actualItem, index) => {
        expect(actualItem).toHaveTextContent(expectedBox.items[index]);
      });
    });
  }
});
