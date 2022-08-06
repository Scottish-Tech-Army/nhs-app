#!/usr/bin/env node

const cdk = require("aws-cdk-lib");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const { Bucket } = require("aws-cdk-lib/aws-s3");
const cloudfront = require("aws-cdk-lib/aws-cloudfront");
const origins = require("aws-cdk-lib/aws-cloudfront-origins");
const s3deploy = require("aws-cdk-lib/aws-s3-deployment");
const cognito = require("aws-cdk-lib/aws-cognito");

const app = new cdk.App();
const envStageName = app.node.tryGetContext("env");

if (!envStageName) {
  throw new Error(
    `run with parameters:
      --context env=ENVIRONMENT_NAME (i.e. dev, test, live, etc.)`
  );
}

const frontendStackId = "STA-NHS-Inventory-Frontend-" + envStageName;

// S3 has a global name restriction per region.
// If someone grabs the default bucket name, change it here.
const FRONTEND_BUCKET_NAME = frontendStackId;
const FRONTEND_DISTRIBUTION_NAME = frontendStackId + "-Distribution";
const FRONTEND_DEPLOY_NAME = frontendStackId + "-DeployWithInvalidation";

class CdkFrontendStack extends cdk.Stack {
  constructor(scope) {
    super(scope, frontendStackId);

    // S3 bucket to host web client files

    const bucket = new Bucket(this, FRONTEND_BUCKET_NAME, {});

    // CloudFront distribution for website

    const distribution = new cloudfront.Distribution(
      this,
      FRONTEND_DISTRIBUTION_NAME,
      {
        defaultBehavior: {
          origin: new origins.S3Origin(bucket),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: "index.html",
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
          }
        ]
      }
    );

    new s3deploy.BucketDeployment(this, FRONTEND_DEPLOY_NAME, {
      sources: [s3deploy.Source.asset("../build")],
      destinationBucket: bucket,
      distribution,
    });

    new cdk.CfnOutput(this, frontendStackId + " URL", {
      value: "https://" + distribution.domainName,
      description: "External URL for " + frontendStackId + " website",
    });
  }
}

const backendStackId = "STA-NHS-Inventory-Backend-" + envStageName;
const resourcePrefix = "STA-NHS-Inventory-" + envStageName;

class CdkBackendStack extends cdk.Stack {
  constructor(scope) {
    super(scope, backendStackId);

    // Common resources
    const stack = cdk.Stack.of(this);
    const region = stack.region;

    const CONTAINERS_TABLE_NAME = resourcePrefix + "-Containers";
    const USERPOOL_ID = resourcePrefix + "-UserPool";

    // Database table for containers

    const containersTable = new dynamodb.Table(this, "Containers", {
      tableName: CONTAINERS_TABLE_NAME,
      partitionKey: {
        name: "containerTemplateId",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: { name: "containerNumber", type: dynamodb.AttributeType.NUMBER },
    });
    new cdk.CfnOutput(this, "Containers table", {
      value: containersTable.tableName,
      description: "DynamoDB table containing container contents",
    });

    // Lambda to process user API requests

    const inventoryLambda = new NodejsFunction(this, "InventoryLambda", {
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: "resources/inventoryLambda/index.ts",
      handler: "handler",
      environment: {
        REGION: region,
        CONTAINERS_TABLE_NAME,
      },
      timeout: cdk.Duration.seconds(30),
      commandHooks: {
        beforeBundling(inputDir) {
          return [`cd ${inputDir} && npm install`];
        },
      },
    });

    containersTable.grant(
      inventoryLambda,
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:Scan"
    );

    // API gateway

    const restApi = new apigateway.LambdaRestApi(this, "InventoryClientApi", {
      handler: inventoryLambda,
      proxy: false,
      restApiName: "Emergency Inventory Client Service (" + envStageName + ")",
      description:
        "This service provides the Emergency Inventory app functions.",
      defaultCorsPreflightOptions: {
        allowHeaders: ["Content-Type", "Authorization"],
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
      deployOptions: {
        stageName: envStageName,
      },
    });
    new cdk.CfnOutput(this, "Emergency Inventory client API endpoint", {
      value: restApi.urlForPath(),
      description: "API Gateway endpoint for Emergency Inventory API",
    });

    const clientUserPool = new cognito.UserPool(
      this,
      "NhsInventoryAppUserPool",
      {
        userPoolName: USERPOOL_ID,
        selfSignUpEnabled: false,
        passwordPolicy: {
          minLength: 6,
          requireLowercase: false,
          requireUppercase: false,
          requireDigits: false,
          requireSymbols: false,
        },
      }
    );
    clientUserPool.node.defaultChild.applyRemovalPolicy(
      cdk.RemovalPolicy.RETAIN
    );
    new cdk.CfnOutput(this, "NhsInventoryApp user pool id", {
      value: clientUserPool.userPoolId,
      description: "User pool id for NHS Inventory app users",
    });

    const clientUserPoolAppClient = clientUserPool.addClient(
      "NhsInventoryAppUserPoolAppClient",
      {
        accessTokenValidity: cdk.Duration.minutes(60),
        idTokenValidity: cdk.Duration.minutes(60),
        refreshTokenValidity: cdk.Duration.days(30),
      }
    );
    new cdk.CfnOutput(this, "NhsInventoryApp user pool web client id", {
      value: clientUserPoolAppClient.userPoolClientId,
      description: "User pool web client id for survey users",
    });

    const apiAuthoriser = new apigateway.CfnAuthorizer(
      this,
      "NhsInventoryAppApiAuth",
      {
        restApiId: restApi.restApiId,
        type: "COGNITO_USER_POOLS",
        identitySource: "method.request.header.Authorization",
        providerArns: [clientUserPool.userPoolArn],
        name: "NhsInventoryAppApiAuth",
      }
    );

    // API GET /containers
    const containersApiResource = restApi.root.addResource("containers");
    let method = containersApiResource.addMethod("GET");
    let methodResource = method.node.findChild("Resource");
    methodResource.addPropertyOverride(
      "AuthorizationType",
      "COGNITO_USER_POOLS"
    );
    methodResource.addPropertyOverride("AuthorizerId", {
      Ref: apiAuthoriser.logicalId,
    });

    // API POST /check
    const checkApiResource = restApi.root.addResource("check");
    method = checkApiResource.addMethod("POST");
    methodResource = method.node.findChild("Resource");
    methodResource.addPropertyOverride(
      "AuthorizationType",
      "COGNITO_USER_POOLS"
    );
    methodResource.addPropertyOverride("AuthorizerId", {
      Ref: apiAuthoriser.logicalId,
    });
  }
}

const frontendStack = new CdkFrontendStack(app);
const backendStack = new CdkBackendStack(app);
cdk.Tags.of(frontendStack).add("DeployEnvironment", envStageName);
cdk.Tags.of(backendStack).add("DeployEnvironment", envStageName);
