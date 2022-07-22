import { ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { dynamodbClient } from "./aws";
import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
require("es6-promise").polyfill();
require("isomorphic-fetch");

export type EIMissingBoxItem = {
  name: string;
  size?: string;
  quantity: number;
};

export type EIBoxInput = {
  checker: string;
  boxTemplateId: string;
  boxNumber: number;
  name: string;
  missingItems: EIMissingBoxItem[];
  isFull: boolean;
};

export type EIBox = EIBoxInput & {
  checkId: string;
  checkTime: string;
};

const boxesTableName = process.env.BOXES_TABLE_NAME;

const headers = { "Access-Control-Allow-Origin": "*" };

const getBoxes = (): Promise<EIBox[]> =>
  dynamodbClient
    .send(
      new ScanCommand({
        TableName: boxesTableName,
        ReturnConsumedCapacity: "TOTAL",
      })
    )
    .then((result) => result.Items!.map((item) => unmarshall(item) as EIBox));

const addBox = (box: EIBox) =>
  dynamodbClient.send(
    new PutItemCommand({
      TableName: boxesTableName,
      Item: marshall(box),
    })
  );

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Processing request", event);

  const errorResponse = (
    statusCode: number,
    message: string
  ): APIGatewayProxyResult => ({
    headers,
    statusCode,
    body: JSON.stringify({ message, request: event }),
  });

  if (event.resource === "/boxes") {
    const racks = await getBoxes();

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(racks),
    };
  }

  if (event.resource === "/check") {
    if (!event.body) {
      return errorResponse(400, "Invalid request body");
    }
    let payload: EIBoxInput;
    try {
      payload = JSON.parse(event.body);
    } catch (error) {
      return errorResponse(400, "Invalid request body");
    }
    if (!payload.boxTemplateId) {
      return errorResponse(400, "boxTemplateId missing");
    }
    if (payload.boxNumber === undefined) {
      return errorResponse(400, "boxNumber missing");
    }
    if (!payload.checker) {
      return errorResponse(400, "checker missing");
    }

    const box = {
      ...payload,
      checkId: uuidv4(),
      checkTime: new Date().toISOString(),
    };
    console.log(`adding ckeck ${box.checkId}`);

    await addBox(box);
    console.log(
      `Box ${box.name}, ${box.boxNumber} checked by ${box.checker} at ${box.checkTime}`
    );

    return { headers, statusCode: 200, body: "" };
  }

  return {
    headers,
    statusCode: 400,
    body: JSON.stringify({ message: "Unrecognised request", request: event }),
  };
};
