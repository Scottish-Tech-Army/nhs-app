#!/usr/bin/env node

const cdk = require("aws-cdk-lib");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigateway = require("aws-cdk-lib/aws-apigateway");

const app = new cdk.App();
const envStageName = app.node.tryGetContext("env");

if (!envStageName) {
  throw new Error(
    `run with parameters:
      --context env=ENVIRONMENT_NAME (i.e. dev, test, live, etc.)`
  );
}

const stackId = "EmergencyInventory-Backend-" + envStageName;
const resourcePrefix = "EmergencyInventory-" + envStageName;

class CdkBackendStack extends cdk.Stack {

  constructor(scope) {
    super(scope, stackId);

    // Common resources
    const stack = cdk.Stack.of(this);
    const region = stack.region;

    const RACKS_TABLE_NAME = resourcePrefix + "-Racks";
    const CHECKS_TABLE_NAME = resourcePrefix + "-Checks";

    // Database tables for locations and units

    const racksTable = new dynamodb.Table(this, "Racks", {
      tableName: RACKS_TABLE_NAME,
      partitionKey: { name: "rackId", type: dynamodb.AttributeType.STRING },
    });
    new cdk.CfnOutput(this, "Racks table", {
      value: racksTable.tableName,
      description: "DynamoDB table containing rack contents",
    });

    const checksTable = new dynamodb.Table(this, "Checks", {
      tableName: CHECKS_TABLE_NAME,
      partitionKey: { name: "checkId", type: dynamodb.AttributeType.STRING },
    });
    new cdk.CfnOutput(this, "Checks table", {
      value: checksTable.tableName,
      description: "DynamoDB table containing box checks",
    });

    // Lambda to process user API requests

    const inventoryLambda = new NodejsFunction(this, "InventoryLambda", {
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: "resources/inventoryLambda/index.ts",
      handler: "handler",
      environment: {
        REGION: region,
        RACKS_TABLE_NAME,
        CHECKS_TABLE_NAME
      },
      timeout: cdk.Duration.seconds(30),
      commandHooks: {
        beforeBundling(inputDir) {
          return [`cd ${inputDir} && npm install`];
        },
      },
    });

    racksTable.grant(inventoryLambda, "dynamodb:GetItem", "dynamodb:Scan");
    checksTable.grant(inventoryLambda, "dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:Scan");

    // API gateway

    const restApi = new apigateway.LambdaRestApi(this, "InventoryClientApi", {
      handler: inventoryLambda,
      proxy: false,
      restApiName: "Emergency Inventory Client Service (" + envStageName + ")",
      description: "This service provides the Emergency Inventory app functions.",
      defaultCorsPreflightOptions: {
        allowHeaders: ['Content-Type'],
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
      deployOptions: {
        stageName: envStageName
      }
    });
    new cdk.CfnOutput(this, "Emergency Inventory client API endpoint", {
      value: restApi.urlForPath(),
      description: "API Gateway endpoint for Emergency Inventory API",
    });

    // API GET /racks
    const racksApiResource = restApi.root.addResource("racks");
    racksApiResource.addMethod("GET");

    // API POST /check
    const checkApiResource = restApi.root.addResource("check");
    checkApiResource.addMethod("POST");
  }
}

const backendStack = new CdkBackendStack(app);
cdk.Tags.of(backendStack).add("DeployEnvironment", envStageName);
