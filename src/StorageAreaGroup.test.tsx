/* eslint-disable testing-library/no-node-access */
import { screen } from "@testing-library/react";
import StorageAreaGroup from "./StorageAreaGroup";
import "@testing-library/jest-dom";
import React from "react";
import { renderWithProvider } from "./testUtils";
import { Route, Routes } from "react-router-dom";

describe("StorageAreaGroup", () => {
  it("renders a storage area group", async () => {
    const { container } = renderWithRoute("transfer-bags");

    expect(screen.getByText("Transfer Bags")).toBeDefined();

    [
      "Transfer Bag 1",
      "Transfer Bag 2",
      "Transfer Bag 3",
      "Transfer Bag 4",
      "Transfer Bag 5",
      "Transfer Bag 6",
    ].forEach((title) => {
      expect(screen.getByText(title)).toBeDefined();
    });

    const missingItemsLink = await screen.findByRole("link", {
      name: "missing-items",
    });
    expect(missingItemsLink).toHaveAttribute("href", "/missing-items");

    expect(container).toMatchSnapshot();
  });

  it("navigates to storage area", async () => {
    const { history, user } = renderWithRoute("transfer-bags");

    expect(screen.getByText("Transfer Bags")).toBeDefined();
    expect(history.location.pathname).toEqual("/areas/transfer-bags");

    await user.click(screen.getByText("Transfer Bag 3"));

    expect(history.location.pathname).toEqual("/area/transfer-bag-3");
  });


  it("can return to previous page", async () => {
    const { user, history } = renderWithRoute("transfer-bags");

    await user.click(screen.getByRole("button", { name: "back" }));

    expect(history.location.pathname).toEqual("/");
  });

  function renderWithRoute(storageAreaGroupId: string) {
    // Add routes to get the contents of useParams populated
    return renderWithProvider(
      <Routes>
        <Route path="areas/:storageAreaGroupId" element={<StorageAreaGroup />} />
        <Route path="*" element={<div>Unknown path</div>} />
      </Routes>,
      {
        initialRoutes: ["/", `/areas/${storageAreaGroupId}`],
      }
    );
  }
});
