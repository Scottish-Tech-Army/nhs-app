require("es6-promise").polyfill();
require("isomorphic-fetch");
import { ScanCommand, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { dynamodbClient } from "./aws";
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { v4 as uuidv4 } from "uuid";

export type EIBoxItem = {
  "name": string,
  "size"?: string,
  "description": string,
  "location": string,
  "photo": string,
  "quantity"?: number
}

export type EIBox = {
  "boxId": string,
  "name": string,
  "items": EIBoxItem[]
}

export type EIRack = {
  "rackId": string,
  "name": string,
  "boxes": EIBox[]
}

export type EICheckInput = {
  checker: string,
  rackId: string,
  boxId: string,
}

export type EICheck = EICheckInput & {
  checkId: string,
  checkTime: string
}


const racksTableName = process.env.RACKS_TABLE_NAME;
const checksTableName = process.env.CHECKS_TABLE_NAME;

const headers = { "Access-Control-Allow-Origin": "*" }


const getRacks = (): Promise<EIRack[]> => dynamodbClient.send(new ScanCommand({
  TableName: racksTableName,
  ReturnConsumedCapacity: "TOTAL",
})).then((result) => result.Items!.map((item) => unmarshall(item) as EIRack))

const getRack = (rackId: string): Promise<EIRack | undefined> => dynamodbClient.send(new GetItemCommand({
  TableName: racksTableName,
  Key: marshall({ rackId }),
})).then((result) => result.Item ? unmarshall(result.Item) as EIRack : undefined);

const addCheck = (check: EICheck) => dynamodbClient.send(new PutItemCommand({
  TableName: checksTableName,
  Item: marshall(check),
}));


export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  console.log("Processing request", event)

  const errorResponse = (statusCode: number, message: string): APIGatewayProxyResult => ({
    headers,
    statusCode,
    body: JSON.stringify({ message, request: event }),
  })


  if (event.resource === "/racks") {
    const racks = await getRacks();


    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(racks)
    }

  }

  if (event.resource === "/check") {

    if (!event.body) {
      return errorResponse(400, 'Invalid request body');
    }
    let payload: EICheckInput;
    try {
      payload = JSON.parse(event.body);
    } catch (error) {
      return errorResponse(400, 'Invalid request body');
    }
    if (!payload.rackId) {
      return errorResponse(400, 'rackId missing');
    }
    if (!payload.boxId) {
      return errorResponse(400, 'boxId missing');
    }
    if (!payload.checker) {
      return errorResponse(400, 'checker missing');
    }

    const rack = await getRack(payload.rackId)

    if (!rack) {
      return errorResponse(404, 'Rack not found: ' + payload.rackId)
    }

    const box = rack.boxes.find(box => box.boxId === payload.boxId);
    if (!box) {
      return errorResponse(404, 'Box not found: ' + payload.boxId)
    }

    const check = {
      ...payload,
      checkId: uuidv4(),
      checkTime: new Date().toISOString()
    }
    console.log(`adding ckeck ${check.checkId}`);

    await addCheck(check)
    console.log(`Box ${rack.name}, ${box.name} checked by ${payload.checker} at ${check.checkTime}`);

    return { headers, statusCode: 200, body: "" };
  }

  return {
    headers,
    statusCode: 400,
    body: JSON.stringify({ message: 'Unrecognised request', request: event }),
  };

};
