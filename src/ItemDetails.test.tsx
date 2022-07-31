/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";

import { getByText, screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";

import ItemDetails from "./ItemDetails";
import { renderWithProvider } from "./testUtils";

describe("ItemDetails", () => {
  it("rendered an item details page with size", async () => {
    const { container } = renderWithRoute("trauma-chest-drain", "9");
    expect(screen.getByText("Item Details")).toBeDefined();

    expect(
      getByText(document.querySelector("h2.name")!, "Suture pack")
    ).toBeDefined();
    expect(
      getByText(document.querySelector("div.size")!, "Standard")
    ).toBeDefined();
    expect(
      getByText(
        document.querySelector("div.description")!,
        "Pack of equipment for suturing"
      )
    ).toBeDefined();
    expect(
      getByText(document.querySelector("div.location")!, "Resus store XX")
    ).toBeDefined();

    expect(document.querySelector("img.item-photo")).toHaveAttribute(
      "src",
      "/items/standardsuture.jpg"
    );

    expect(container).toMatchSnapshot();
  });

  it("rendered an item details page without size", async () => {
    const { container } = renderWithRoute("trauma-chest-drain", "11");
    expect(screen.getByText("Item Details")).toBeDefined();

    expect(
      getByText(document.querySelector("h2.name")!, "Chest drain bottle")
    ).toBeDefined();
    expect(getByText(document.querySelector("div.size")!, "N/A")).toBeDefined();
    expect(
      getByText(
        document.querySelector("div.description")!,
        "Chest drain bottle for draining air and blood"
      )
    ).toBeDefined();
    expect(
      getByText(document.querySelector("div.location")!, "Resus store XX")
    ).toBeDefined();

    expect(document.querySelector("img.item-photo")).toHaveAttribute(
      "src",
      "/items/chestdrainbottle.jpg"
    );

    expect(container).toMatchSnapshot();
  });

  it("does not render if no containerTemplateId", async () => {
    const { container } = renderWithRoute("", "3");

    expect(container).toHaveTextContent("Unknown path");
  });

  it("does not render if no itemNumber", async () => {
    const { container } = renderWithRoute("trauma-chest-drain", "");

    expect(container).toHaveTextContent("Unknown path");
  });

  it("does not render if unknown containerTemplateId", async () => {
    const { container } = renderWithRoute("Unknown", "4");

    expect(container.children).toHaveLength(1);
  });

  it("does not render if unknown itemNumber", async () => {
    const { container } = renderWithRoute("trauma-chest-drain", "Unknown");

    expect(container.children).toHaveLength(1);
  });

  it("does not render if unknown itemNumber - container number too high", async () => {
    const { container } = renderWithRoute("trauma-chest-drain", "15");

    expect(container.children).toHaveLength(1);
  });

  it("can return to previous page", async () => {
    const { user, history } = renderWithRoute("trauma-chest-drain", "3");

    await user.click(screen.getByRole("button", { name: "back" }));

    expect(history.location.pathname).toEqual(
      "/container/trauma-chest-drain/5"
    );
  });

  function renderWithRoute(containerTemplateId: string, itemId: string) {
    // Add routes to get the contents of useParams populated
    return renderWithProvider(
      <Routes>
        <Route
          path="item/:containerTemplateId/:itemId"
          element={<ItemDetails />}
        />
        <Route path="*" element={<div>Unknown path</div>} />
      </Routes>,
      {
        initialRoutes: [
          "/",
          `/container/${containerTemplateId}/5`,
          `/item/${containerTemplateId}/${itemId}`,
        ],
      }
    );
  }
});
