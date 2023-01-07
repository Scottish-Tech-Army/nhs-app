/* eslint-disable testing-library/no-node-access */
import React from "react";

import { screen, waitFor } from "@testing-library/react";

import MissingItems from "./MissingItems";
import { renderWithProvider } from "./testUtils";
import { ContainerData } from "./model/StorageTypes";
import { TEST_INVENTORY_API_ENDPOINT } from "./setupTests";
import { Auth } from "@aws-amplify/auth";

jest.mock("@aws-amplify/auth");

const TIMESTAMP = "2022-06-23T09:18:06.324Z";
const DISPLAY_TIMESTAMP = "Thu 23/6/2022 10:18";

const UUID = "e5443b6c-4389-4119-a9c0-b7ad1f1eebc5";

const CONTAINERS: ContainerData[] = [
  {
    containerNumber: 2,
    containerTemplateId: "trauma-chest-drain",
    storageAreaId: "trauma-tower",
    checkId: UUID,
    checkTime: TIMESTAMP,
    checker: "Bob",
    location: "Resus 1b",
    isFull: false,
    missingItems: [
      { name: "Sterile gloves", quantity: 1, location: "Resus store XX", size: "Medium" },
      { name: "ChloraPrep applicator", quantity: 1, location: "Resus store XX" },
      { name: "Lidocaine 1%", quantity: 2, location: "Resus store XX", size: "5ml / 50mg" },
      { name: "Chest drain bottle", quantity: 1, location: "Resus store XX" },
    ],
    name: "Trauma Chest Drain",
  },
  {
    containerNumber: 4,
    containerTemplateId: "trauma-chest-drain",
    storageAreaId: "trauma-tower",
    checkId: UUID,
    checkTime: TIMESTAMP,
    checker: "Bob",
    isFull: true,
    missingItems: [],
    name: "Trauma Chest Drain",
  },
  {
    containerNumber: 1,
    containerTemplateId: "airway-trolley-2-drawer-c",
    storageAreaId: "airway-trolley-2",
    checkId: UUID,
    checkTime: TIMESTAMP,
    checker: "Joe",
    isFull: false,
    missingItems: [
      { name: "Guedel airway - Red", quantity: 1 },
      { name: "Nasopharyngeal Airway", quantity: 1, size: "7.0" },
    ],
    name: "Drawer C",
  },
];

describe("MissingItems", () => {
  beforeEach(() => {
    (Auth.currentSession as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        getIdToken: () => {
          return { getJwtToken: () => "test jwt token" };
        },
      });
    });
  });

  it("rendered a missing-items list page for filled store - no containers recorded", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]), { status: 200 });

    renderWithProvider(<MissingItems />, {
      initialRoutes: ["/missing-items"],
    });

    expect(
      screen.getByRole("heading", { name: "Missing Items" })
    ).toBeDefined();

    expect(await screen.findByText("No Items")).toBeDefined();

    await checkMissingItemsList([]);
  });

  it("rendered a missing-items list page - loading", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    renderWithProvider(<MissingItems />, {
      initialRoutes: ["/missing-items"],
    });

    expect(
      screen.getByRole("heading", { name: "Missing Items" })
    ).toBeDefined();

    expect(screen.getByText("Fetching Items")).toBeDefined();

    await checkMissingItemsList([]);
  });

  it("rendered a missing-items list and all containers full", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          containerNumber: 4,
          containerTemplateId: "trauma-chest-drain",
          checkId: UUID,
          checkTime: TIMESTAMP,
          checker: "Bob",
          isFull: true,
          missingItems: [],
          name: "Trauma Chest Drain",
        },
        {
          containerNumber: 5,
          containerTemplateId: "trauma-chest-drain",
          checkId: UUID,
          checkTime: TIMESTAMP,
          checker: "Bob",
          isFull: true,
          missingItems: [],
          name: "Trauma Chest Drain",
        },
      ]),
      { status: 200 }
    );

    renderWithProvider(<MissingItems />, {
      initialRoutes: ["/missing-items"],
    });
    await waitFor(() => expect(fetchMock).toBeCalledTimes(1));
    expect(fetchMock).toBeCalledWith(
      TEST_INVENTORY_API_ENDPOINT + "containers",
      expect.objectContaining({
        headers: { Authorization: "Bearer test jwt token" },
      })
    );

    expect(
      screen.getByRole("heading", { name: "Missing Items" })
    ).toBeDefined();
    expect(await screen.findByText("No Items")).toBeDefined();

    await checkMissingItemsList([]);
  });

  it("rendered a missing-items list page for partially filled store - ie some items shown", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(CONTAINERS), { status: 200 });

    const { container } = renderWithProvider(<MissingItems />, {
      initialRoutes: ["/missing-items"],
    });

    expect(
      screen.getByRole("heading", { name: "Missing Items" })
    ).toBeDefined();

    await checkMissingItemsList([
      {
        storageArea: "Trauma Tower",
        containerName: "Trauma Chest Drain - Box 2",
        location: "Resus 1b",
        checkNameAndDate: `Checked: ${DISPLAY_TIMESTAMP} by Bob`,
        items: [
          "1 x Sterile gloves (Medium) - Resus store XX",
          "1 x ChloraPrep applicator - Resus store XX",
          "2 x Lidocaine 1% (5ml / 50mg) - Resus store XX",
          "1 x Chest drain bottle - Resus store XX",
        ],
      },
      {
        storageArea: "Airway Trolley 2",
        containerName: "Drawer C",
        checkNameAndDate: `Checked: ${DISPLAY_TIMESTAMP} by Joe`,
        items: ["1 x Guedel airway - Red", "1 x Nasopharyngeal Airway (7.0)"],
      },
    ]);

    expect(container).toMatchSnapshot();
  });

  it("handle unknown containerTemplateId and storageAreaId", async () => {
    const unknownContainers: ContainerData[] = [
      {
        containerNumber: 2,
        containerTemplateId: "unknown",
        storageAreaId: "trauma-tower",
        checkId: UUID,
        checkTime: TIMESTAMP,
        checker: "Bob",
        location: "Resus 1b",
        isFull: false,
        missingItems: [{ name: "Sterile gloves", quantity: 1, size: "Medium" }],
        name: "Trauma Chest Drain",
      },
      {
        containerNumber: 1,
        containerTemplateId: "airway-trolley-2-drawer-c",
        storageAreaId: "unknown",
        checkId: UUID,
        checkTime: TIMESTAMP,
        checker: "Joe",
        isFull: false,
        missingItems: [{ name: "Guedel airway - Red", quantity: 1 }],
        name: "Drawer C",
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(unknownContainers), { status: 200 });

    renderWithProvider(<MissingItems />, {
      initialRoutes: ["/missing-items"],
    });

    await waitFor(() => expect(fetchMock).toBeCalledTimes(1));

    expect(
      screen.getByRole("heading", { name: "Missing Items" })
    ).toBeDefined();

    await checkMissingItemsList([]);
  });

  it("can return to directory page", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]), { status: 200 });
    const { user, history } = renderWithProvider(<MissingItems />, {
      initialRoutes: ["/needed"],
    });

    expect(history.location.pathname).toEqual("/needed");

    await user.click(screen.getByRole("link", { name: "directory" }));

    expect(history.location.pathname).toEqual("/");
  });

  type ExpectedContainerContents = {
    storageArea: string;
    containerName: string;
    location?: string;
    checkNameAndDate: string;
    items: string[];
  };

  async function checkMissingItemsList(
    expectedContainers: ExpectedContainerContents[]
  ) {
    await waitFor(() => {
      const actualContainers = document.querySelectorAll("div.container")!;

      expect(actualContainers).toHaveLength(expectedContainers.length);
      actualContainers.forEach((actualContainer, index) => {
        const expectedContainer = expectedContainers[index];
        expect(actualContainer).toHaveTextContent(
          expectedContainer.storageArea
        );
        expect(actualContainer).toHaveTextContent(
          expectedContainer.containerName
        );
        if (expectedContainer.location) {
          expect(actualContainer).toHaveTextContent(
            expectedContainer.containerName
          );
        }
        expect(actualContainer).toHaveTextContent(
          expectedContainer.checkNameAndDate
        );

        const actualItems = actualContainer.querySelectorAll("div.item")!;
        expect(actualItems).toHaveLength(expectedContainer.items.length);
        actualItems.forEach((actualItem, index) => {
          const expectedItem = expectedContainer.items[index];
          expect(actualItem).toHaveTextContent(expectedItem);
        });
      });
    });
  }
});
