/* eslint-disable testing-library/no-node-access */
import { screen, within } from "@testing-library/react";
import StorageArea from "./StorageArea";
import "@testing-library/jest-dom";
import React from "react";
import { renderWithProvider } from "./testUtils";
import { Route, Routes } from "react-router-dom";

describe("StorageArea", () => {
  it("renders a home page", async () => {
    const { container } = renderWithRoute("0");

    expect(screen.getByText("Trauma Tower 1")).toBeDefined();

    [
      "Trauma Chest Drain",
      "Catastrophic Haemorrhage",
      "Max Fax Haemorrhage",
    ].forEach((title) => {
      expect(screen.getByText(title)).toBeDefined();
    });

    const summaryLink = await screen.findByRole("link", { name: "summary" });
    expect(summaryLink).toHaveAttribute("href", "/summary");

    expect(container).toMatchSnapshot();
  });

  it("navigates to box page", async () => {
    const { user, history  } = renderWithRoute("1");

    expect(screen.getByText("Trauma Tower 2")).toBeDefined();
    expect(history.location.pathname).toEqual("/");

    const boxFour = within(
      screen.getByText("Trauma Chest Drain").parentElement!
    ).getByText("4");

    await user.click(boxFour);

    expect(history.location.pathname).toEqual("/box/1/0/4");
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
