import { EIBox, EIBoxInput, handler } from "./index";
import { dynamodbClient } from "./aws";
import { APIGatewayProxyEvent } from "aws-lambda";
import { TEST_BOXES_TABLE_NAME } from "./setupTests";
import * as uuid from "uuid";

jest.mock("uuid");
jest.mock("./aws");

const TIMESTAMP = "2022-06-23T09:18:06.324Z";
const UUID = "e5443b6c-4389-4119-a9c0-b7ad1f1eebc5";

const INPUT_BOXES: EIBoxInput[] = [
  {
    name: "Trauma Chest Drain",
    boxTemplateId: "0",
    boxNumber: 2,
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
    boxTemplateId: "0",
    boxNumber: 4,
    missingItems: [],
    isFull: true,
    checker: "Bob",
  },
];

const BOXES: EIBox[] = [
  {
    boxNumber: 2,
    boxTemplateId: "0",
    checkId: UUID,
    checkTime: TIMESTAMP,
    checker: "Bob",
    isFull: false,
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
    boxNumber: 4,
    boxTemplateId: "0",
    checkId: UUID,
    checkTime: TIMESTAMP,
    checker: "Bob",
    isFull: true,
    missingItems: [],
    name: "Trauma Chest Drain",
  },
];


const DYNAMO_BOXES = [
  {
    boxNumber: { N: "2" },
    boxTemplateId: { S: "0" },
    checkId: { S: "e5443b6c-4389-4119-a9c0-b7ad1f1eebc5" },
    checkTime: { S: "2022-06-23T09:18:06.324Z" },
    checker: { S: "Bob" },
    isFull: { BOOL: false },
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
    boxNumber: { N: "4" },
    boxTemplateId: { S: "0" },
    checkId: { S: "e5443b6c-4389-4119-a9c0-b7ad1f1eebc5" },
    checkTime: { S: "2022-06-23T09:18:06.324Z" },
    checker: { S: "Bob" },
    isFull: { BOOL: true },
    missingItems: { L: [] },
    name: { S: "Trauma Chest Drain" },
  }
];

const DB_BOXES_RESPONSE = {
  Items: DYNAMO_BOXES,
};

describe("api call GET /boxes", () => {
  it("successful response", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(DB_BOXES_RESPONSE);

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/boxes",
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify(BOXES));

    expect(dynamodbClient.send).toHaveBeenCalledTimes(1);
    expect(dynamodbClient.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          ReturnConsumedCapacity: "TOTAL",
          TableName: TEST_BOXES_TABLE_NAME,
        },
      })
    );
  });

  it("successful response with empty boxes table", async () => {
    (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
      Items: [],
    });

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/boxes",
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

  it("successful response - box with missing items", async () => {
    uuidSpy = jest.spyOn(uuid, "v4");
    uuidSpy.mockReturnValue(UUID);

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/check",
      body: JSON.stringify(INPUT_BOXES[0]),
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual("");

    expect(dynamodbClient.send).toHaveBeenCalledTimes(1);
    expect(dynamodbClient.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          Item: DYNAMO_BOXES[0],
          TableName: TEST_BOXES_TABLE_NAME,
        },
      })
    );
  });

  it("successful response - full box", async () => {
    uuidSpy = jest.spyOn(uuid, "v4");
    uuidSpy.mockReturnValue(UUID);

    const event: Partial<APIGatewayProxyEvent> = {
      resource: "/check",
      body: JSON.stringify(INPUT_BOXES[1]),
    };
    const result = await handler(event as APIGatewayProxyEvent);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual("");

    expect(dynamodbClient.send).toHaveBeenCalledTimes(1);
    expect(dynamodbClient.send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          Item: DYNAMO_BOXES[1],
          TableName: TEST_BOXES_TABLE_NAME,
        },
      })
    );
  });

  // TODO check other input fields

  it("failure response on missing input boxTemplateId", async () => {
    const input = {
      name: "Trauma Chest Drain",
      boxNumber: 4,
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
        message: "boxTemplateId missing",
        request: {
          body: JSON.stringify(input),
          resource: "/check",
        },
      })
    );
  });

  it("failure response on missing input boxNumber", async () => {
    const input = {
      name: "Trauma Chest Drain",
      boxTemplateId: "0",
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
        message: "boxNumber missing",
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
      boxTemplateId: "0",
      boxNumber: 4,
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
