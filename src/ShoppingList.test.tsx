/* eslint-disable testing-library/no-node-access */
import React from "react";

import { screen, waitFor } from "@testing-library/react";

import ShoppingList from "./ShoppingList";
import { renderWithProvider } from "./testUtils";
import { EIBox } from "./data/StorageTypes";
import {TEST_INVENTORY_API_ENDPOINT} from './setupTests';

const TIMESTAMP = "2022-06-23T09:18:06.324Z";
const UUID = "e5443b6c-4389-4119-a9c0-b7ad1f1eebc5";

const BOXES: EIBox[] = [
  {
    boxNumber: 2,
    boxTemplateId: "0",
    checkId: UUID,
    checkTime: TIMESTAMP,
    checker: "Bob",
    isFull: false,
    missingItems: [
      { name: "Sterile gloves", quantity: 1, size: "Medium" },
      { name: "ChloraPrep applicator", quantity: 1 },
      { name: "Lidocaine 1%", quantity: 2, size: "5ml / 50mg" },
      { name: "Chest drain bottle", quantity: 1 },
    ],
    name: "Trauma Chest Drain",
  },
  {
    boxNumber: 4,
    boxTemplateId: "0",
    checkId: UUID,
    checkTime: TIMESTAMP,
    checker: "Bob",
    isFull: true,
    missingItems: [],
    name: "Trauma Chest Drain",
  },
];

describe("ShoppingList", () => {
  it("rendered a shopping list page for filled store - no boxes recorded", async () => {
    fetchMock.mockResponse(JSON.stringify([]), { status: 200 });

    renderWithProvider(<ShoppingList />);

    expect(screen.getByText("Summary")).toBeDefined();

    await waitFor(() => expect(screen.getByText("No Items")).toBeDefined());

    await checkShoppingList([]);
  });

  it("rendered a shopping list page - loading", async () => {
    fetchMock.mockResponse('', { status: 500 });

    renderWithProvider(<ShoppingList />);

    expect(screen.getByText("Summary")).toBeDefined();

    expect(screen.getByText("Fetching Items")).toBeDefined();

    await checkShoppingList([]);
  });

  it("rendered a shopping list and all boxes full", async () => {
    fetchMock.mockResponse(JSON.stringify([{
      boxNumber: 4,
      boxTemplateId: "0",
      checkId: UUID,
      checkTime: TIMESTAMP,
      checker: "Bob",
      isFull: true,
      missingItems: [],
      name: "Trauma Chest Drain",
    },{
      boxNumber: 5,
      boxTemplateId: "0",
      checkId: UUID,
      checkTime: TIMESTAMP,
      checker: "Bob",
      isFull: true,
      missingItems: [],
      name: "Trauma Chest Drain",
    },]), { status: 200 });

    renderWithProvider(<ShoppingList />);
    await waitFor(() => expect(fetchMock).toBeCalledTimes(1))
    expect(fetchMock).toBeCalledWith(TEST_INVENTORY_API_ENDPOINT + "boxes");

    expect(screen.getByText("Summary")).toBeDefined();
    await waitFor(() => expect(screen.getByText("No Items")).toBeDefined());

    await checkShoppingList([]);
  });

  it("rendered a shopping list page for partially filled store - ie some items shown", async () => {
    fetchMock.mockResponse(JSON.stringify(BOXES), { status: 200 });

    renderWithProvider(<ShoppingList />);

    expect(screen.getByText("Summary")).toBeDefined();

    await checkShoppingList([
      {
        name: "Trauma Chest Drain - Box 2",
        items: [
          "1 x Sterile gloves (Medium)",
          "1 x ChloraPrep applicator",
          "2 x Lidocaine 1% (5ml / 50mg)",
          "1 x Chest drain bottle",
        ],
      },
    ]);
  });

  it("renders correctly", async () => {
    fetchMock.mockResponse(JSON.stringify(BOXES), { status: 200 });

    const { container } = renderWithProvider(<ShoppingList />);

    await waitFor(() =>
      expect(document.querySelectorAll("div.box")!).toHaveLength(1)
    );
    expect(container).toMatchSnapshot();
  });

  it("can return to storage area page", async () => {
    const { user, history } = renderWithProvider(<ShoppingList />, {
      initialRoutes: ["/", "/needed"],
    });

    expect(history.location.pathname).toEqual("/needed");

    await user.click(screen.getByRole("button", { name: "Back" }));

    expect(history.location.pathname).toEqual("/");
  });

  type ExpectedBoxContents = {
    name: string;
    items: string[];
  };

  async function checkShoppingList(expectedBoxes: ExpectedBoxContents[]) {
    await waitFor(() => {
      const actualBoxes = document.querySelectorAll("div.box")!;
      
      expect(actualBoxes).toHaveLength(expectedBoxes.length);
      actualBoxes.forEach((actualBox, index) => {
        const expectedBox = expectedBoxes[index];
        expect(actualBox).toHaveTextContent(expectedBox.name);
        const checkNameAndDate = expect(actualBox).toHaveTextContent(expectedBox.name);
        const actualItems = actualBox.querySelectorAll("div.item")!;
        expect(actualItems).toHaveLength(expectedBox.items.length);
        actualItems.forEach((actualItem, index) => {
          const expectedItem = expectedBox.items[index];
          expect(actualItem).toHaveTextContent(expectedItem);
        });
      });
    });
  }
});
