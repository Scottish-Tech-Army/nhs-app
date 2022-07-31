import { ContainerData, ContainerInputData, handler } from "./index";
import { dynamodbClient } from "./aws";
import { APIGatewayProxyEvent } from "aws-lambda";
import { TEST_CONTAINERS_TABLE_NAME } from "./setupTests";
import * as uuid from "uuid";

jest.mock("uuid");
jest.mock("./aws");

const TIMESTAMP = "2022-06-23T09:18:06.324Z";
const UUID = "e5443b6c-4389-4119-a9c0-b7ad1f1eebc5";

const INPUT_CONTAINERS: ContainerInputData[] = [
  {
    name: "Trauma Chest Drain",
    containerTemplateId: "trauma-chest-drain",
    storageAreaId: "trauma-tower",
    containerNumber: 2,
    missingItems: [
      {
        name: "Sterile gloves",
        size: "Medium",
        quantity: 1,
      },
      {
        name: "ChloraPrep applicator",
        quantity: 1,
      },
      {
        name: "Lidocaine 1%",
        size: "5ml / 50mg",
        quantity: 2,
      },
      {
        name: "Chest drain bottle",
        quantity: 1,
      },
    ],
    isFull: false,
    checker: "Bob",
  },
  {
    name: "Trauma Chest Drain",
    containerTemplateId: "trauma-chest-drain",
    containerNumber: 4,
    storageAreaId: "trauma-tower",
    missingItems: [],
    isFull: true,
    checker: "Bob",
  },
];

const CONTAINERS: ContainerData[] = [
  {
    containerNumber: 2,
    containerTemplateId: "trauma-chest-drain",
    checkId: UUID,
    checkTime: TIMESTAMP,
    checker: "Bob",
    isFull: false,
    storageAreaId: "trauma-tower",
    missingItems: [
      {
        name: "Sterile gloves",
        quantity: 1,
        size: "Medium",
      },
      {
        name: "ChloraPrep applicator",
        quantity: 1,
      },
      {
        name: "Lidocaine 1%",
        quantity: 2,
        size: "5ml / 50mg",
      },
      {
        name: "Chest drain bottle",
        quantity: 1,
      },
    ],
    name: "Trauma Chest Drain",
  },
  {
    containerNumber: 4,
    containerTemplateId: "trauma-chest-drain",
    checkId: UUID,
    checkTime: TIMESTAMP,
    checker: "Bob",
    isFull: true,
    storageAreaId: "trauma-tower",
    missingItems: [],
    name: "Trauma Chest Drain",
  },
];

const DYNAMO_CONTAINERS = [
  {
    containerNumber: { N: "2" },
    containerTemplateId: { S: "trauma-chest-drain" },
    checkId: { S: "e5443b6c-4389-4119-a9c0-b7ad1f1eebc5" },
    checkTime: { S: "2022-06-23T09:18:06.324Z" },
    checker: { S: "Bob" },
    isFull: { BOOL: false },
    storageAreaId: { S: "trauma-tower" },
    missingItems: {
      L: [
        {
          M: {
            name: { S: "Sterile gloves" },
            quantity: { N: "1" },
            size: { S: "Medium" },
          },
        },
        { M: { name: { S: "ChloraPrep applicator" }, quantity: { N: "1" } } },
        {
          M: {
            name: { S: "Lidocaine 1%" },
            quantity: { N: "2" },
            size: { S: "5ml / 50mg" },
          },
        },
        { M: { name: { S: "Chest drain bottle" }, quantity: { N: "1" } } },
      ],
    },
    name: { S: "Trauma Chest Drain" },
  },

  {
    containerNumber: { N: "4" },
    containerTemplateId: { S: "trauma-chest-drain" },
    checkId: { S: "e5443b6c-4389-4119-a9c0-b7ad1f1eebc5" },
    checkTime: { S: "2022-06-23T09:18:06.324Z" },
    checker: { S: "Bob" },
    isFull: { BOOL: true },
    storageAreaId: { S: "trauma-tower" },
    missingItems: { L: [] },
    name: { S: "Trauma Chest Drain" },
  },
];

const DB_CONTAINERS_RESPONSE = {
  Items: DYNAMO_CONTAINERS,
};

describe("api call GET /containers", () => {
  it("successful response", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(DB_CONTAINERS_RESPONSE);

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/containers",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify(CONTAINERS));

    expect(dynamodbClient.send).toHaveBeenCalledTimes(1);
    expect(dynamodbClient.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          ReturnConsumedCapacity: "TOTAL",
          TableName: TEST_CONTAINERS_TABLE_NAME,
        },
      })
    );
  });

  it("successful response with empty containers table", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Items: [],
    });

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/containers",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify([]));
  });
});

describe("api call POST /check", () => {
  let uuidSpy;
  beforeAll(() => {
    jest.useFakeTimers({ now: Date.parse(TIMESTAMP) });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("successful response - container with missing items", async () => {
    uuidSpy = jest.spyOn(uuid, "v4");
    uuidSpy.mockReturnValue(UUID);

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/check",
      body: JSON.stringify(INPUT_CONTAINERS[0]),
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual("");

    expect(dynamodbClient.send).toHaveBeenCalledTimes(1);
    expect(dynamodbClient.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          Item: DYNAMO_CONTAINERS[0],
          TableName: TEST_CONTAINERS_TABLE_NAME,
        },
      })
    );
  });

  it("successful response - full container", async () => {
    uuidSpy = jest.spyOn(uuid, "v4");
    uuidSpy.mockReturnValue(UUID);

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/check",
      body: JSON.stringify(INPUT_CONTAINERS[1]),
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual("");

    expect(dynamodbClient.send).toHaveBeenCalledTimes(1);
    expect(dynamodbClient.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          Item: DYNAMO_CONTAINERS[1],
          TableName: TEST_CONTAINERS_TABLE_NAME,
        },
      })
    );
  });

  // TODO check other input fields

  it("failure response on missing input containerTemplateId", async () => {
    const input = {
      name: "Trauma Chest Drain",
      containerNumber: 4,
      storageAreaId: "trauma-tower",
      missingItems: [],
      isFull: true,
      checker: "Bob",
    };
    const event: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify(input),
      resource: "/check",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "containerTemplateId missing",
        request: {
          body: JSON.stringify(input),
          resource: "/check",
        },
      })
    );
  });

  it("failure response on missing input containerNumber", async () => {
    const input = {
      name: "Trauma Chest Drain",
      containerTemplateId: "trauma-chest-drain",
      storageAreaId: "trauma-tower",
      missingItems: [],
      isFull: true,
      checker: "Bob",
    };
    const event: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify(input),
      resource: "/check",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "containerNumber missing",
        request: {
          body: JSON.stringify(input),
          resource: "/check",
        },
      })
    );
  });

  it("failure response on missing input storageAreaId", async () => {
    const input = {
      name: "Trauma Chest Drain",
      containerTemplateId: "trauma-chest-drain",
      containerNumber: 4,
      missingItems: [],
      isFull: true,
      checker: "Bob",
    };
    const event: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify(input),
      resource: "/check",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "storageAreaId missing",
        request: {
          body: JSON.stringify(input),
          resource: "/check",
        },
      })
    );
  });

  it("failure response on missing input checker", async () => {
    const input = {
      name: "Trauma Chest Drain",
      containerTemplateId: "trauma-chest-drain",
      containerNumber: 4,
      storageAreaId: "trauma-tower",
      missingItems: [],
      isFull: true,
    };
    const event: Partial<APIGatewayProxyEvent> = {
      body: JSON.stringify(input),
      resource: "/check",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "checker missing",
        request: {
          body: JSON.stringify(input),
          resource: "/check",
        },
      })
    );
  });

  it("failure response on null body", async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      body: null,
      resource: "/check",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Invalid request body",
        request: {
          body: null,
          resource: "/check",
        },
      })
    );
  });

  it("failure response on empty body", async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      body: "",
      resource: "/check",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Invalid request body",
        request: {
          body: "",
          resource: "/check",
        },
      })
    );
  });

  it("failure response on invalid body", async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      body: "broken json",
      resource: "/check",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Invalid request body",
        request: {
          body: "broken json",
          resource: "/check",
        },
      })
    );
  });
});

describe("api catchall error response", () => {
  it("error response", async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/unknown",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Unrecognised request",
        request: {
          resource: "/unknown",
        },
      })
    );
  });
});
