/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";

import { getByRole, screen, waitFor } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";

import { renderWithProvider } from "./testUtils";
import fetchMock from "jest-fetch-mock";

import Container from "./Container";
import { ContainerInputData } from "./model/StorageTypes";
import { TEST_INVENTORY_API_ENDPOINT } from "./setupTests";
import { Auth } from "@aws-amplify/auth";
import { SIGNED_IN } from "./model/auth/AuthStates";

const CHECK_API_ENDPONT = TEST_INVENTORY_API_ENDPOINT + "check";
const TEST_USERNAME = "test user";

jest.mock("@aws-amplify/auth");

describe("Container", () => {
  beforeEach(() => {
    (Auth.currentSession as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        getIdToken: () => {
          return { getJwtToken: () => "test jwt token" };
        },
      });
    });
  });

  it("rendered a container page", async () => {
    renderWithRoute("trauma-tower", "trauma-chest-drain", "3");
    expect(screen.getByRole("heading")).toHaveTextContent("Trauma Chest Drain - Box 3");

    const inputFields = Array.from(document.querySelectorAll(".display-name"));

    expect(inputFields.map((input) => input.textContent)).toEqual([
      "Blunt dissection chest drainage insertion pack (28Fg)",
      "Sterile gloves (Small)",
      "Sterile gloves (Medium)",
      "Sterile gloves (Large)",
      "Chest drain catheter (28Fr)",
      "Chest drain catheter (32Fr)",
      "Chest drain catheter (36Fr)",
      "ChloraPrep applicator",
      "Lidocaine 1% (5ml / 50mg)",
      "Standard suture pack (Standard)",
      "Mefix roll (5cm x 10m)",
      "Chest drain bottle",
      "Chest drain tubing",
      "Sterile water (H20) bottle (1000ml bottle)",
      "Spencer wells forceps (Straight 20cm)",
    ]);

    expect(screen.getByRole("button", { name: "Save" })).toBeDefined();
  });

  it("does not render if no storageAreaId", async () => {
    const { container } = renderWithRoute("", "trauma-chest-drain", "3");

    expect(container).toHaveTextContent("Unknown path");
  });

  it("does not render if no containerTemplateId", async () => {
    const { container } = renderWithRoute("trauma-tower", "", "3");

    expect(container).toHaveTextContent("Unknown path");
  });

  it("does not render if no containerNumber", async () => {
    const { container } = renderWithRoute("trauma-tower", "trauma-chest-drain", "");

    expect(container).toHaveTextContent("Unknown path");
  });

  it("does not render if unknown storageAreaId", async () => {
    const { container } = renderWithRoute("Unknown", "trauma-chest-drain", "4");

    expect(container.children).toHaveLength(0);

    expect(container).toMatchSnapshot();
  });

  it("does not render if unknown containerTemplateId", async () => {
    const { container } = renderWithRoute("trauma-tower", "Unknown", "4");

    expect(container.children).toHaveLength(0);

    expect(container).toMatchSnapshot();
  });

  it("does not render if unknown containerNumber", async () => {
    const { container } = renderWithRoute("trauma-tower", "trauma-chest-drain", "Unknown");

    expect(container.children).toHaveLength(0);

    expect(container).toMatchSnapshot();
  });

  it("does not render if unknown containerNumber - container number too high", async () => {
    const { container } = renderWithRoute("trauma-tower", "trauma-chest-drain", "7");

    expect(container.children).toHaveLength(0);

    expect(container).toMatchSnapshot();
  });

  it("can save item changes - success", async () => {
    fetchMock.mockResponse("", { status: 200 });

    const { user, history } = renderWithRoute("trauma-tower", "trauma-chest-drain", "3");

    const itemLabel = screen.getByText(
      "Blunt dissection chest drainage insertion pack (28Fg)"
    );

    const increaseButton = getByRole(itemLabel.parentElement!, "button", {
      name: "add item",
    });
    const decreaseButton = getByRole(itemLabel.parentElement!, "button", {
      name: "remove item",
    });
    await user.click(increaseButton);
    await user.click(increaseButton);
    await user.click(increaseButton);
    await user.click(decreaseButton);

    await user.click(screen.getByRole("button", { name: "Save" }));

    const expectedPayload: ContainerInputData = {
      containerTemplateId: "trauma-chest-drain",
      containerNumber: 3,
      storageAreaId: "trauma-tower",
      name: "Trauma Chest Drain",
      missingItems: [
        { quantity: 1, name: "Sterile gloves", size: "Small" },
        { quantity: 1, name: "Sterile gloves", size: "Medium" },
        { quantity: 1, name: "Sterile gloves", size: "Large" },
        { quantity: 1, name: "Chest drain catheter", size: "28Fr" },
        { quantity: 1, name: "Chest drain catheter", size: "32Fr" },
        { quantity: 1, name: "Chest drain catheter", size: "36Fr" },
        { quantity: 2, name: "ChloraPrep applicator" },
        { quantity: 2, name: "Lidocaine 1%", size: "5ml / 50mg" },
        { quantity: 1, name: "Standard suture pack", size: "Standard" },
        { quantity: 1, name: "Mefix roll", size: "5cm x 10m" },
        { quantity: 1, name: "Chest drain bottle" },
        { quantity: 1, name: "Chest drain tubing" },
        {
          quantity: 1,
          name: "Sterile water (H20) bottle",
          size: "1000ml bottle",
        },
        { quantity: 1, name: "Spencer wells forceps", size: "Straight 20cm" },
      ],
      isFull: false,
      checker: TEST_USERNAME,
    };

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      CHECK_API_ENDPONT,
      expect.objectContaining({
        method: "POST",
        headers: { Authorization: "Bearer test jwt token" },
      })
    );
    const actualPayload = JSON.parse(
      fetchMock.mock.calls[0][1]!.body! as string
    );
    expect(actualPayload).toEqual(expectedPayload);

    expect(history.location.pathname).toEqual("/area/trauma-tower");
  });

  it("can save item changes - failure", async () => {
    fetchMock.mockResponse("", { status: 500 });

    const { user, history } = renderWithRoute("trauma-tower", "trauma-chest-drain", "3");

    const itemLabel = screen.getByText(
      "Blunt dissection chest drainage insertion pack (28Fg)"
    );

    const increaseButton = getByRole(itemLabel.parentElement!, "button", {
      name: "add item",
    });
    const decreaseButton = getByRole(itemLabel.parentElement!, "button", {
      name: "remove item",
    });
    await user.click(increaseButton);
    await user.click(increaseButton);
    await user.click(increaseButton);
    await user.click(decreaseButton);

    await user.click(screen.getByRole("button", { name: "Save" }));

    const expectedPayload: ContainerInputData = {
      containerTemplateId: "trauma-chest-drain",
      containerNumber: 3,
      storageAreaId: "trauma-tower",
      name: "Trauma Chest Drain",
      missingItems: [
        { quantity: 1, name: "Sterile gloves", size: "Small" },
        { quantity: 1, name: "Sterile gloves", size: "Medium" },
        { quantity: 1, name: "Sterile gloves", size: "Large" },
        { quantity: 1, name: "Chest drain catheter", size: "28Fr" },
        { quantity: 1, name: "Chest drain catheter", size: "32Fr" },
        { quantity: 1, name: "Chest drain catheter", size: "36Fr" },
        { quantity: 2, name: "ChloraPrep applicator" },
        { quantity: 2, name: "Lidocaine 1%", size: "5ml / 50mg" },
        { quantity: 1, name: "Standard suture pack", size: "Standard" },
        { quantity: 1, name: "Mefix roll", size: "5cm x 10m" },
        { quantity: 1, name: "Chest drain bottle" },
        { quantity: 1, name: "Chest drain tubing" },
        {
          quantity: 1,
          name: "Sterile water (H20) bottle",
          size: "1000ml bottle",
        },
        { quantity: 1, name: "Spencer wells forceps", size: "Straight 20cm" },
      ],
      isFull: false,
      checker: TEST_USERNAME,
    };

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      CHECK_API_ENDPONT,
      expect.objectContaining({
        method: "POST",
        headers: { Authorization: "Bearer test jwt token" },
      })
    );
    const actualPayload = JSON.parse(
      fetchMock.mock.calls[0][1]!.body! as string
    );
    expect(actualPayload).toEqual(expectedPayload);

    expect(history.location.pathname).toEqual("/container/trauma-tower/trauma-chest-drain/3");
  });

  it("can mark container as full - success", async () => {
    fetchMock.mockResponse("", { status: 200 });
    const { user, history } = renderWithRoute("trauma-tower", "trauma-chest-drain", "3");

    await user.click(screen.getByRole("button", { name: "FULL" }));

    const expectedPayload: ContainerInputData = {
      containerTemplateId: "trauma-chest-drain",
      containerNumber: 3,
      storageAreaId: "trauma-tower",
      name: "Trauma Chest Drain",
      missingItems: [],
      isFull: true,
      checker: TEST_USERNAME,
    };

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      CHECK_API_ENDPONT,
      expect.objectContaining({
        method: "POST",
        headers: { Authorization: "Bearer test jwt token" },
      })
    );
    const actualPayload = JSON.parse(
      fetchMock.mock.calls[0][1]!.body! as string
    );
    expect(actualPayload).toEqual(expectedPayload);

    expect(history.location.pathname).toEqual("/area/trauma-tower");
  });

  it("can mark container as full - failure", async () => {
    fetchMock.mockResponse("", { status: 500 });
    const { user, history } = renderWithRoute("trauma-tower", "trauma-chest-drain", "3");

    await user.click(screen.getByRole("button", { name: "FULL" }));

    const expectedPayload: ContainerInputData = {
      containerTemplateId: "trauma-chest-drain",
      containerNumber: 3,
      storageAreaId: "trauma-tower",
      name: "Trauma Chest Drain",
      missingItems: [],
      isFull: true,
      checker: TEST_USERNAME,
    };

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      CHECK_API_ENDPONT,
      expect.objectContaining({
        method: "POST",
        headers: { Authorization: "Bearer test jwt token" },
      })
    );
    const actualPayload = JSON.parse(
      fetchMock.mock.calls[0][1]!.body! as string
    );
    expect(actualPayload).toEqual(expectedPayload);

    expect(history.location.pathname).toEqual("/container/trauma-tower/trauma-chest-drain/3");
  });

  it("can go to item details", async () => {
    const { user, history } = renderWithRoute("trauma-tower", "trauma-chest-drain", "3");

    const itemLabel = screen.getByText("Chest drain catheter (28Fr)");

    const infoButton = getByRole(itemLabel.parentElement!, "button", {
      name: "item information",
    });
    await user.click(infoButton);

    expect(history.location.pathname).toEqual("/item/trauma-chest-drain/4");
  });

  it("can return to previous page", async () => {
    const { user, history } = renderWithRoute("trauma-tower", "trauma-chest-drain", "3");

    await user.click(screen.getByRole("button", { name: "back" }));

    expect(history.location.pathname).toEqual("/");
  });

  it("renders correctly", () => {
    const { container } = renderWithRoute("trauma-tower", "trauma-chest-drain", "3");

    expect(container).toMatchSnapshot();
  });

  function renderWithRoute(storageAreaId: string, containerTemplateId: string, containerNumber: string) {
    // Add routes to get the contents of useParams populated
    return renderWithProvider(
      <Routes>
        <Route path="container/:storageAreaId/:containerTemplateId/:containerNumber" element={<Container />} />
        <Route path="*" element={<div>Unknown path</div>} />
      </Routes>,
      {
        initialRoutes: ["/", `/container/${storageAreaId}/${containerTemplateId}/${containerNumber}`],
        preloadedState: {
          auth: {
            authState: SIGNED_IN,
            user: { name: TEST_USERNAME },
            errorMessage: "",
          },
        },
      }
    );
  }
});
