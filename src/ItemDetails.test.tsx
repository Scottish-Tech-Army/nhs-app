/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";

import { getByText, screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";

import ItemDetails from "./ItemDetails";
import { renderWithProvider } from "./testUtils";


describe("ItemDetails", () => {
  it("rendered an item details page with size", async () => {
    const { container } = renderWithRoute("0", "9");
    expect(screen.getByText("Item Details")).toBeDefined();

    expect(
      getByText(document.querySelector("h2.name")!, "Standard suture pack")
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
    const { container } = renderWithRoute("0", "7");
    expect(screen.getByText("Item Details")).toBeDefined();

    expect(
      getByText(document.querySelector("h2.name")!, "ChloraPrep applicator")
    ).toBeDefined();
    expect(getByText(document.querySelector("div.size")!, "N/A")).toBeDefined();
    expect(
      getByText(
        document.querySelector("div.description")!,
        "ChloraPrep applicator for cleaning skin for sterile procedure"
      )
    ).toBeDefined();
    expect(
      getByText(document.querySelector("div.location")!, "Resus store XX")
    ).toBeDefined();

    expect(document.querySelector("img.item-photo")).toHaveAttribute(
      "src",
      "/items/chloraprep.jpg"
    );

    expect(container).toMatchSnapshot();
  });

  it("does not render if no boxTemplateId", async () => {
    const { container } = renderWithRoute("", "3");

    expect(container).toHaveTextContent("Unknown path");
  });

  it("does not render if no itemNumber", async () => {
    const { container } = renderWithRoute("0", "");

    expect(container).toHaveTextContent("Unknown path");
  });

  it("does not render if unknown boxTemplateId", async () => {
    const { container } = renderWithRoute("Unknown", "4");

    expect(container.children).toHaveLength(1);
  });

  it("does not render if unknown itemNumber", async () => {
    const { container } = renderWithRoute("0", "Unknown");

    expect(container.children).toHaveLength(1);
  });

  it("does not render if unknown itemNumber - box number too high", async () => {
    const { container } = renderWithRoute("0", "15");

    expect(container.children).toHaveLength(1);
  });

  it("can return to previous page", async () => {
    const { user, history } = renderWithRoute("0", "3");

    await user.click(screen.getByRole("button", { name: "Back" }));

    expect(history.location.pathname).toEqual("/box/0/5");
  });

  function renderWithRoute(boxTemplateId: string, itemId: string) {
    // Add routes to get the contents of useParams populated
    return renderWithProvider(
      <Routes>
        <Route path="item/:boxTemplateId/:itemId" element={<ItemDetails />} />
        <Route path="*" element={<div>Unknown path</div>} />
      </Routes>,
      {
        initialRoutes: [
          "/",
          `/box/${boxTemplateId}/5`,
          `/item/${boxTemplateId}/${itemId}`,
        ],
      }
    );
  }
});
