import { ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { dynamodbClient } from "./aws";
import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
require("es6-promise").polyfill();
require("isomorphic-fetch");

export type MissingContainerItem = {
  name: string;
  size?: string;
  quantity: number;
};

export type ContainerInputData = {
  checker: string;
  containerTemplateId: string;
  containerNumber: number;
  storageAreaId: string;
  name: string;
  missingItems: MissingContainerItem[];
  isFull: boolean;
};

export type ContainerData = ContainerInputData & {
  checkId: string;
  checkTime: string;
};

const containersTableName = process.env.CONTAINERS_TABLE_NAME;

const headers = { "Access-Control-Allow-Origin": "*" };

const getContainers = (): Promise<ContainerData[]> =>
  dynamodbClient
    .send(
      new ScanCommand({
        TableName: containersTableName,
        ReturnConsumedCapacity: "TOTAL",
      })
    )
    .then((result) => result.Items!.map((item) => unmarshall(item) as ContainerData));

const addContainer = (container: ContainerData) =>
  dynamodbClient.send(
    new PutItemCommand({
      TableName: containersTableName,
      Item: marshall(container),
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

  if (event.resource === "/containers") {
    const racks = await getContainers();

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
    let payload: ContainerInputData;
    try {
      payload = JSON.parse(event.body);
    } catch (error) {
      return errorResponse(400, "Invalid request body");
    }
    if (!payload.containerTemplateId) {
      return errorResponse(400, "containerTemplateId missing");
    }
    if (payload.containerNumber === undefined) {
      return errorResponse(400, "containerNumber missing");
    }
    if (!payload.storageAreaId) {
      return errorResponse(400, "storageAreaId missing");
    }
    if (!payload.checker) {
      return errorResponse(400, "checker missing");
    }

    const container = {
      ...payload,
      checkId: uuidv4(),
      checkTime: new Date().toISOString(),
    };
    console.log(`adding ckeck ${container.checkId}`);

    await addContainer(container);
    console.log(
      `Container ${container.name}, ${container.containerNumber} checked by ${container.checker} at ${container.checkTime}`
    );

    return { headers, statusCode: 200, body: "" };
  }

  return {
    headers,
    statusCode: 400,
    body: JSON.stringify({ message: "Unrecognised request", request: event }),
  };
};
