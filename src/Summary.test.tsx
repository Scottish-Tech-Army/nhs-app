/* eslint-disable testing-library/no-node-access */
import React from "react";

import { screen, waitFor } from "@testing-library/react";

import Summary from "./Summary";
import { renderWithProvider } from "./testUtils";
import { ContainerData } from "./model/StorageTypes";
import { TEST_INVENTORY_API_ENDPOINT } from "./setupTests";
import { Auth } from "@aws-amplify/auth";

jest.mock("@aws-amplify/auth");

const TIMESTAMP = "2022-06-23T09:18:06.324Z";
const DISPLAY_TIMESTAMP = "Thu 23/6/2022 at 10:18";

const UUID = "e5443b6c-4389-4119-a9c0-b7ad1f1eebc5";

const CONTAINERS: ContainerData[] = [
  {
    containerNumber: 2,
    containerTemplateId: "trauma-chest-drain",
    storageAreaId: "trauma-tower",
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
];

describe("Summary", () => {
  beforeEach(() => {
    (Auth.currentSession as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        getIdToken: () => {
          return { getJwtToken: () => "test jwt token" };
        },
      });
    });
  });

  it("rendered a summary list page for filled store - no containers recorded", async () => {
    fetchMock.mockResponse(JSON.stringify([]), { status: 200 });

    renderWithProvider(<Summary />, {
      initialRoutes: ["/summary"],
    });

    expect(screen.getByRole("heading", { name: "Summary" })).toBeDefined();

    expect(await screen.findByText("No Items")).toBeDefined();

    await checkSummaryList([]);
  });

  it("rendered a summary list page - loading", async () => {
    fetchMock.mockResponse("", { status: 500 });

    renderWithProvider(<Summary />, {
      initialRoutes: ["/summary"],
    });

    expect(screen.getByRole("heading", { name: "Summary" })).toBeDefined();

    expect(screen.getByText("Fetching Items")).toBeDefined();

    await checkSummaryList([]);
  });

  it("rendered a summary list and all containers full", async () => {
    fetchMock.mockResponse(
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

    renderWithProvider(<Summary />, {
      initialRoutes: ["/summary"],
    });
    await waitFor(() => expect(fetchMock).toBeCalledTimes(1));
    expect(fetchMock).toBeCalledWith(
      TEST_INVENTORY_API_ENDPOINT + "containers",
      expect.objectContaining({
        headers: { Authorization: "Bearer test jwt token" },
      })
    );

    expect(screen.getByRole("heading", { name: "Summary" })).toBeDefined();
    expect(await screen.findByText("No Items")).toBeDefined();

    await checkSummaryList([]);
  });

  it("rendered a summary list page for partially filled store - ie some items shown", async () => {
    fetchMock.mockResponse(JSON.stringify(CONTAINERS), { status: 200 });

    renderWithProvider(<Summary />, {
      initialRoutes: ["/summary"],
    });

    expect(screen.getByRole("heading", { name: "Summary" })).toBeDefined();

    await checkSummaryList([
      {
        name: "Trauma Chest Drain - Box 2",
        checkNameAndDate: `Checked by Bob on ${DISPLAY_TIMESTAMP}`,
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
    fetchMock.mockResponse(JSON.stringify(CONTAINERS), { status: 200 });

    const { container } = renderWithProvider(<Summary />, {
      initialRoutes: ["/summary"],
    });

    await waitFor(() =>
      expect(document.querySelectorAll("div.container")!).toHaveLength(1)
    );
    expect(container).toMatchSnapshot();
  });

  it("can return to directory page", async () => {
    const { user, history } = renderWithProvider(<Summary />, {
      initialRoutes: ["/needed"],
    });

    expect(history.location.pathname).toEqual("/needed");

    await user.click(screen.getByRole("link", { name: "directory" }));

    expect(history.location.pathname).toEqual("/");
  });

  type ExpectedContainerContents = {
    name: string;
    checkNameAndDate: string;
    items: string[];
  };

  async function checkSummaryList(expectedContainers: ExpectedContainerContents[]) {
    await waitFor(() => {
      const actualContainers = document.querySelectorAll("div.container")!;

      expect(actualContainers).toHaveLength(expectedContainers.length);
      actualContainers.forEach((actualContainer, index) => {
        const expectedContainer = expectedContainers[index];
        expect(actualContainer).toHaveTextContent(expectedContainer.name);
        expect(actualContainer).toHaveTextContent(expectedContainer.checkNameAndDate);

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
