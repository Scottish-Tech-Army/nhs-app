/* eslint-disable testing-library/no-node-access */
import { screen, within } from "@testing-library/react";
import StorageArea from "./StorageArea";
import "@testing-library/jest-dom";
import React from "react";
import { renderWithProvider } from "./testUtils";
import { Route, Routes } from "react-router-dom";

describe("StorageArea", () => {
  it("renders a single instance container", async () => {
    const { container } = renderWithRoute("transfer-bag-1");

    expect(screen.getByText("Transfer Bag 1")).toBeDefined();

    [
      "Airway (Front Pocket)",
      "Airway (Front Net Pocket)",
      "Breathing (Middle Pocket)",
      "Circulation (Back Pocket)",
      "Circulation (Back Pocket) Cannulation Grab Bag",
      "Circulation (Back Pocket) Syringe Grab Bag",
      "Circulation (Back Net Pockets)",
    ].forEach((title) => {
      expect(screen.getByText(title)).toBeDefined();
    });

    const missingItemsLink = await screen.findByRole("link", {
      name: "missing-items",
    });
    expect(missingItemsLink).toHaveAttribute("href", "/missing-items");

    expect(container).toMatchSnapshot();
  });

  it("renders a multiple instance container", async () => {
    const { container } = renderWithRoute("trauma-tower");

    expect(screen.getByText("Trauma Tower")).toBeDefined();

    [
      "Trauma Chest Drain",
      "Catastrophic Haemorrhage",
      "Max Fax Haemorrhage",
    ].forEach((title) => {
      expect(screen.getByText(title)).toBeDefined();
    });

    const missingItemsLink = await screen.findByRole("link", {
      name: "missing-items",
    });
    expect(missingItemsLink).toHaveAttribute("href", "/missing-items");

    expect(container).toMatchSnapshot();
  });

  it("navigates to single instance container page", async () => {
    const { history, user } = renderWithRoute("transfer-bag-1");

    expect(screen.getByText("Transfer Bag 1")).toBeDefined();
    expect(history.location.pathname).toEqual("/area/transfer-bag-1");

    await user.click(screen.getByText("Airway (Front Pocket)"));

    expect(history.location.pathname).toEqual(
      "/container/transfer-bag-1/transfer-bag-1-front/1"
    );
  });

  it("navigates to multiple instance container page", async () => {
    const { user, history } = renderWithRoute("trauma-tower");

    expect(screen.getByText("Trauma Tower")).toBeDefined();
    expect(history.location.pathname).toEqual("/area/trauma-tower");

    const containerFour = within(
      screen.getByText("Trauma Chest Drain").parentElement!
    ).getByText("4");

    await user.click(containerFour);

    expect(history.location.pathname).toEqual(
      "/container/trauma-tower/trauma-chest-drain/4"
    );
  });

  it("can return to storage area group", async () => {
    const { user, history } = renderWithRoute("transfer-bag-1");

    await user.click(screen.getByRole("button", { name: "back" }));

    expect(history.location.pathname).toEqual("/areas/transfer-bags");
  });

  it("can return to directory", async () => {
    const { user, history } = renderWithRoute("trauma-tower");

    await user.click(screen.getByRole("button", { name: "back" }));

    expect(history.location.pathname).toEqual("/");
  });

  function renderWithRoute(storageAreaId: string) {
    // Add routes to get the contents of useParams populated
    return renderWithProvider(
      <Routes>
        <Route path="area/:storageAreaId" element={<StorageArea />} />
        <Route path="*" element={<div>Unknown path</div>} />
      </Routes>,
      {
        initialRoutes: ["/", `/area/${storageAreaId}`],
      }
    );
  }
});
