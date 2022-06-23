
import { EIRack, handler } from "./index";
import { dynamodbClient } from "./aws";
import { APIGatewayProxyEvent } from "aws-lambda";
import { TEST_RACKS_TABLE_NAME, TEST_CHECKS_TABLE_NAME } from "./setupTests";
import * as uuid from "uuid";

jest.mock("uuid");
jest.mock("./aws");

const TIMESTAMP = "2022-06-23T09:18:06.324Z";
const UUID = "e5443b6c-4389-4119-a9c0-b7ad1f1eebc5";

const RACKS: EIRack[] = [
    {
        "rackId": "0",
        "name": "Major Trauma Tower",
        "boxes": [
            {
                "name": "trauma chest drain - box 1",
                "boxId": "0",
                "items": [
                    {
                        "name": "Sterile gloves",
                        "size": "Small",
                        "description": "Small sterile gloves - 1 pair",
                        "location": "Resus store XX",
                        "photo": "smallsterilegloves.jpg",
                    },
                    {
                        "name": "Sterile gloves",
                        "size": "Medium",
                        "description": "Medium sterile gloves - 1 pair",
                        "location": "Resus store XX",
                        "photo": "mediumsterilegloves.jpg",
                        "quantity": 2
                    },
                ]
            },
            {
                "name": "trauma chest drain - box 2",
                "boxId": "1",
                "items": [
                    {
                        "name": "Sterile gloves",
                        "size": "Small",
                        "description": "Small sterile gloves - 1 pair",
                        "location": "Resus store XX",
                        "photo": "smallsterilegloves.jpg",
                    },
                    {
                        "name": "Sterile gloves",
                        "size": "Medium",
                        "description": "Medium sterile gloves - 1 pair",
                        "location": "Resus store XX",
                        "photo": "mediumsterilegloves.jpg",
                        "quantity": 2
                    },
                ]
            },
        ]
    },
    {
        "rackId": "1",
        "name": "Defibrillation Trolley",
        "boxes": [
            {
                "name": "Defib chest drain - box 1",
                "boxId": "0",
                "items": [
                    {
                        "name": "ChloraPrep applicator",
                        "description": "ChloraPrep applicator for cleaning skin for sterile procedure",
                        "location": "Resus store XX",
                        "photo": "chloraprep.jpg",
                    },
                    {
                        "name": "Lidocaine 1%",
                        "size": "5ml / 50mg",
                        "description": "Local anaesthetic",
                        "location": "Resus store XX",
                        "photo": "lidocaine.jpg",
                        "quantity": 5
                    },

                ]
            },
        ]
    }
]

const DYNAMO_RACKS = [
    {
        "rackId": {
            "S": "0"
        },
        "name": {
            "S": "Major Trauma Tower"
        },
        "boxes": {
            "L": [
                {
                    "M": {
                        "name": {
                            "S": "trauma chest drain - box 1"
                        },
                        "boxId": {
                            "S": "0"
                        },
                        "items": {
                            "L": [
                                {
                                    "M": {
                                        "name": {
                                            "S": "Sterile gloves"
                                        },
                                        "size": {
                                            "S": "Small"
                                        },
                                        "description": {
                                            "S": "Small sterile gloves - 1 pair"
                                        },
                                        "location": {
                                            "S": "Resus store XX"
                                        },
                                        "photo": {
                                            "S": "smallsterilegloves.jpg"
                                        }
                                    }
                                },
                                {
                                    "M": {
                                        "name": {
                                            "S": "Sterile gloves"
                                        },
                                        "size": {
                                            "S": "Medium"
                                        },
                                        "description": {
                                            "S": "Medium sterile gloves - 1 pair"
                                        },
                                        "location": {
                                            "S": "Resus store XX"
                                        },
                                        "photo": {
                                            "S": "mediumsterilegloves.jpg"
                                        },
                                        "quantity": {
                                            "N": "2"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "M": {
                        "name": {
                            "S": "trauma chest drain - box 2"
                        },
                        "boxId": {
                            "S": "1"
                        },
                        "items": {
                            "L": [
                                {
                                    "M": {
                                        "name": {
                                            "S": "Sterile gloves"
                                        },
                                        "size": {
                                            "S": "Small"
                                        },
                                        "description": {
                                            "S": "Small sterile gloves - 1 pair"
                                        },
                                        "location": {
                                            "S": "Resus store XX"
                                        },
                                        "photo": {
                                            "S": "smallsterilegloves.jpg"
                                        }
                                    }
                                },
                                {
                                    "M": {
                                        "name": {
                                            "S": "Sterile gloves"
                                        },
                                        "size": {
                                            "S": "Medium"
                                        },
                                        "description": {
                                            "S": "Medium sterile gloves - 1 pair"
                                        },
                                        "location": {
                                            "S": "Resus store XX"
                                        },
                                        "photo": {
                                            "S": "mediumsterilegloves.jpg"
                                        },
                                        "quantity": {
                                            "N": "2"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        }
    },

    {
        "rackId": {
            "S": "1"
        },
        "name": {
            "S": "Defibrillation Trolley"
        },
        "boxes": {
            "L": [
                {
                    "M": {
                        "name": {
                            "S": "Defib chest drain - box 1"
                        },
                        "boxId": {
                            "S": "0"
                        },
                        "items": {
                            "L": [
                                {
                                    "M": {
                                        "name": {
                                            "S": "ChloraPrep applicator"
                                        },
                                        "description": {
                                            "S": "ChloraPrep applicator for cleaning skin for sterile procedure"
                                        },
                                        "location": {
                                            "S": "Resus store XX"
                                        },
                                        "photo": {
                                            "S": "chloraprep.jpg"
                                        }
                                    }
                                },
                                {
                                    "M": {
                                        "name": {
                                            "S": "Lidocaine 1%"
                                        },
                                        "size": {
                                            "S": "5ml / 50mg"
                                        },
                                        "description": {
                                            "S": "Local anaesthetic"
                                        },
                                        "location": {
                                            "S": "Resus store XX"
                                        },
                                        "photo": {
                                            "S": "lidocaine.jpg"
                                        },
                                        "quantity": {
                                            "N": "5"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        }
    }

]

const DB_RACKS_RESPONSE = {
    Items: DYNAMO_RACKS

}



describe('api call GET /racks', () => {

    it('successful response', async () => {

        (dynamodbClient.send as jest.Mock).mockResolvedValueOnce(DB_RACKS_RESPONSE);

        const event: Partial<APIGatewayProxyEvent> = {
            resource: "/racks",
        }
        const result = await handler(event as APIGatewayProxyEvent)

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify(RACKS));


        expect(dynamodbClient.send).toHaveBeenCalledTimes(1);
        expect(dynamodbClient.send).toHaveBeenCalledWith(expect.objectContaining({
            input: {
                ReturnConsumedCapacity: "TOTAL",
                TableName: TEST_RACKS_TABLE_NAME
            },
        }));

    });

    it('successful response with empty racks table', async () => {

        (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({
            Items: [

            ]
        });

        const event: Partial<APIGatewayProxyEvent> = {
            resource: "/racks",
        }
        const result = await handler(event as APIGatewayProxyEvent)

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify([]));
    });



});


describe('api call POST /check', () => {

    let uuidSpy;
    beforeAll(() => {
        jest.useFakeTimers({ now: Date.parse(TIMESTAMP)});
    });
    
    afterAll(() => {
        jest.useRealTimers();
    });
    
    it('successful response', async () => {
        
        (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({ Item: DYNAMO_RACKS[1] });
        
        uuidSpy = jest.spyOn(uuid, "v4");  
        uuidSpy.mockReturnValue(UUID);

        const event: Partial<APIGatewayProxyEvent> = {
            resource: "/check",
            body: JSON.stringify({
                checker: "Bob Smith",
                rackId: "1",
                boxId: "0",
            })
        }
        const result = await handler(event as APIGatewayProxyEvent)

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual("");


        expect(dynamodbClient.send).toHaveBeenCalledTimes(2);
        expect(dynamodbClient.send).toHaveBeenNthCalledWith(1, expect.objectContaining({
            input: {
                Key: { rackId: { S: "1" } },
                TableName: TEST_RACKS_TABLE_NAME
            },
        }));

        expect(dynamodbClient.send).toHaveBeenNthCalledWith(2, expect.objectContaining({
            input: {
                Item: {
                    rackId: { S: "1" },
                    boxId: { S: "0" },
                    checker: { S: "Bob Smith" },
                    checkId: { S: UUID },
                    checkTime: { S: TIMESTAMP },
                },
                TableName: TEST_CHECKS_TABLE_NAME
            },
        }));
    });


    it('failure response with unknown rackId', async () => {

        (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({ Item: null });

        const event: Partial<APIGatewayProxyEvent> = {
            resource: "/check",
            body: JSON.stringify({
                checker: "Bob Smith",
                rackId: "Unknown rack",
                boxId: "0",
            })
        }

        const result = await handler(event as APIGatewayProxyEvent)

        expect(result.statusCode).toEqual(404);
        expect(result.body).toEqual(JSON.stringify({
            message: 'Rack not found: Unknown rack', request: event
        }));

        expect(dynamodbClient.send).toHaveBeenCalledTimes(1);
        expect(dynamodbClient.send).toHaveBeenNthCalledWith(1, expect.objectContaining({
            input: {
                Key: { rackId: { S: "Unknown rack" } },
                TableName: TEST_RACKS_TABLE_NAME
            },
        }));

    });



    it('failure response with unknown boxId within rack', async () => {

        (dynamodbClient.send as jest.Mock).mockResolvedValueOnce({ Item: DYNAMO_RACKS[1] });

        const event: Partial<APIGatewayProxyEvent> = {
            resource: "/check",
            body: JSON.stringify({
                checker: "Bob Smith",
                rackId: "1",
                boxId: "Unknown box",
            })
        }

        const result = await handler(event as APIGatewayProxyEvent)

        expect(result.statusCode).toEqual(404);
        expect(result.body).toEqual(JSON.stringify({
            message: 'Box not found: Unknown box', request: event
        }));

        expect(dynamodbClient.send).toHaveBeenCalledTimes(1);
        expect(dynamodbClient.send).toHaveBeenCalledWith(expect.objectContaining({
            input: {
                Key: { rackId: { S: "1" } },
                TableName: TEST_RACKS_TABLE_NAME
            },
        }));

    });





    it('failure response on missing input rackId', async () => {

        const event: Partial<APIGatewayProxyEvent> = {
            body: JSON.stringify({ checker: "Bob Smith", boxId: "1", }),
            resource: "/check",
        }
        const result = await handler(event as APIGatewayProxyEvent)

        expect(result.statusCode).toEqual(400);
        expect(result.body).toEqual(JSON.stringify({
            message: "rackId missing",
            request: {
                body: "{\"checker\":\"Bob Smith\",\"boxId\":\"1\"}",
                resource: "/check",
            }
        }));
    });



    it('failure response on missing input boxId', async () => {

        const event: Partial<APIGatewayProxyEvent> = {
            body: JSON.stringify({
                checker: "Bob Smith",
                rackId: "1",
            }),
            resource: "/check",
        }
        const result = await handler(event as APIGatewayProxyEvent)

        expect(result.statusCode).toEqual(400);
        expect(result.body).toEqual(JSON.stringify({
            message: "boxId missing",
            request: {
                body: "{\"checker\":\"Bob Smith\",\"rackId\":\"1\"}",
                resource: "/check",
            }
        }));
    });



    it('failure response on missing input checker', async () => {

        const event: Partial<APIGatewayProxyEvent> = {
            body: JSON.stringify({
                rackId: "1",
                boxId: "0",
            }),
            resource: "/check",
        }
        const result = await handler(event as APIGatewayProxyEvent)

        expect(result.statusCode).toEqual(400);
        expect(result.body).toEqual(JSON.stringify({
            message: "checker missing",
            request: {
                body: "{\"rackId\":\"1\",\"boxId\":\"0\"}",
                resource: "/check",
            }
        }));
    });

    it('failure response on null body', async () => {

        const event: Partial<APIGatewayProxyEvent> = {
            body: null,
            resource: "/check",
        }
        const result = await handler(event as APIGatewayProxyEvent)

        expect(result.statusCode).toEqual(400);
        expect(result.body).toEqual(JSON.stringify({
            message: "Invalid request body",
            request: {
                body: null,
                resource: "/check",
            }
        }));
    });

    it('failure response on empty body', async () => {

        const event: Partial<APIGatewayProxyEvent> = {
            body: "",
            resource: "/check",
        }
        const result = await handler(event as APIGatewayProxyEvent)

        expect(result.statusCode).toEqual(400);
        expect(result.body).toEqual(JSON.stringify({
            message: "Invalid request body",
            request: {
                body: "",
                resource: "/check",
            }
        }));
    });

    it('failure response on invalid body', async () => {

        const event: Partial<APIGatewayProxyEvent> = {
            body: "broken json",
            resource: "/check",
        }
        const result = await handler(event as APIGatewayProxyEvent)

        expect(result.statusCode).toEqual(400);
        expect(result.body).toEqual(JSON.stringify({
            message: "Invalid request body",
            request: {
                body: "broken json",
                resource: "/check",
            }
        }));
    });


});


describe('api catchall error response', () => {

    it('error response', async () => {

        const event: Partial<APIGatewayProxyEvent> = {
            resource: "/unknown",
        }
        const result = await handler(event as APIGatewayProxyEvent)

        expect(result.statusCode).toEqual(400);
        expect(result.body).toEqual(JSON.stringify({
            message: "Unrecognised request",
            request: {
                resource: "/unknown",
            }
        }));

    });
});