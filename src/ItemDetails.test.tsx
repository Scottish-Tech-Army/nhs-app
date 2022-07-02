/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";

import { getByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";

import ItemDetails from "./ItemDetails";
import { createStore } from "./data/store";

jest.mock("react-router-dom");

const navigate = jest.fn();

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
    expect(getByText(document.querySelector("div.size")!, "-")).toBeDefined();
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

    expect(container.children).toHaveLength(1);
    expect(screen.getByText("Item Details")).toBeDefined();

    expect(container).toMatchSnapshot();
  });

  it("does not render if no itemNumber", async () => {
    const { container } = renderWithRoute("0", "");

    expect(container.children).toHaveLength(1);
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
    const { user } = renderWithRoute("0", "3");

    await user.click(screen.getByRole("button", { name: "Back" }));

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(-1);
  });

  function renderWithRoute(boxTemplateId: string, itemId: string) {
    const store = createStore();
    const user = userEvent.setup();
    (useParams as jest.Mock).mockReturnValue({ boxTemplateId, itemId });
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    return {
      store,
      user,
      ...render(
        <Provider store={store}>
          <ItemDetails />
        </Provider>
      ),
    };
  }
});
