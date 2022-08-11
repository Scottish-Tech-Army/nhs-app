# CDK Deployment stack for NHS emergency supplies application

This project handles the CDK creation of backend resources of the NHS emergency supplies application.

## Building and deploying

To build the components of the application and deploy to AWS, follow these instructions after cloning the repo. The instructions are environment specific. In the instructions below, the environment being created is `dev`. Other options are `test` and `live`.

### Prerequisites

The following tools are needed in the build and deploy process, install them first

- Register or use an existing AWS account with [CLI access keys](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html).
- Install [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
- Install the [AWS CDK](https://docs.aws.amazon.com/cdk/index.html), described here: https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting_started_install

### Build and deploy the backend components

In the following, `PROJECT_ROOT` is the directory where you have cloned the repo.

#### Install dependencies for node projects

```
cd PROJECT_ROOT/cdk; npm install
cd resources/inventoryLambda; npm install
```

#### Deploy backend

If it's the first time CDK use in an environment, the environment needs to be [prepared](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html) for the deployment. Run the following first

```
cd PROJECT_ROOT/cdk; cdk bootstrap aws://AWS_ACCOUNT_NUMBER/REGION [--profile AWS_PROFILE] --context env=dev
```
Here `aws://AWS_ACCOUNT_NUMBER/REGION` is the AWS account and region to use for the deployment, e.g. `aws://1234567890/eu-west-2`.
Use `--profile AWS_PROFILE` if necessary to choose the correct [AWS CLI access keys](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html).

Once that's done, the rest of the deploy should go smoothly

```
cd PROJECT_ROOT/cdk; cdk deploy [--profile AWS_PROFILE] --context env=dev STA-NHS-Inventory-Backend-dev
```

The CDK will create and deploy a CloudFormation stack of the backend AWS components. If it completes successfully, it will return output like:

```
 ✅  STA-NHS-Inventory-Backend-dev

Outputs:
STA-NHS-Inventory-Backend-dev.Containerstable = STA-NHS-Inventory-dev-Containers
STA-NHS-Inventory-Backend-dev.EmergencyInventoryclientAPIendpoint = https://XXXXXXXXXX.execute-api.eu-west-2.amazonaws.com/dev/
STA-NHS-Inventory-Backend-dev.InventoryClientApiEndpoint99B6C40C = https://XXXXXXXXXX.execute-api.eu-west-2.amazonaws.com/dev/
STA-NHS-Inventory-Backend-dev.NhsInventoryAppuserpoolid = eu-west-2_XXXXXXXXX
STA-NHS-Inventory-Backend-dev.NhsInventoryAppuserpoolwebclientid = XXXXXXXXXXXXXXXXXXXXXXXXX

Stack ARN:
arn:aws:cloudformation:eu-west-2:XXXXXXXXXXXXX:stack/STA-NHS-Inventory-Backend-dev/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
```

These outputs are also shown in the outputs section of the CloudformationStack in the AWS Console. They are used to populate the environment specific parameters in the build of the frontend client.

### Build the frontend components

#### Configure environment specific settings

Copy `PROJECT_ROOT/.env` to `PROJECT_ROOT/.env.local` and fill in the AWS backend parameters (from the outputs above):

```
# Inventory API Gateway
REACT_APP_INVENTORY_API_ENDPOINT=https://XXXXXXXXXX.execute-api.eu-west-2.amazonaws.com/dev/

# Authentication
REACT_APP_AWS_REGION=eu-west-2
REACT_APP_AWS_USER_POOL_ID=eu-west-2_XXXXXXXXX
REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXX
```

#### Build the web clients

Create a production build web client

```
cd PROJECT_ROOT
npm install
npm run build
```

### Deploy the frontend - hosted with AWS

As the web clients is a static site, you can either deploy to AWS and direct incoming traffic to the CloudFront distribution, or just host it on your own website. To deploy to AWS:

```
cd PROJECT_ROOT/cdk; cdk deploy [--profile AWS_PROFILE] --context env=dev STA-NHS-Inventory-Frontend-dev
```

Use the same environment as for the backend above. The CDK will create and deploy a CloudFormation stack of the frontend AWS components. If it completes successfully, it will return output like:

```
✅  STA-NHS-Inventory-Frontend-dev

Outputs:
STA-NHS-Inventory-Frontend-dev.STANHSInventoryFrontenddevURL = https://0000000000000.cloudfront.net
Stack ARN:
arn:aws:cloudformation:eu-west-2:ACCOUNT_NUMBER:stack/STA-NHS-Inventory-Frontend-dev/00000000-0000-0000-0000-000000000000
```

The web client URL is the endpoint of the web client in cloudfront. This can then be set up with DNS, Route53, etc.

### or deploy the frontend components - hosted elsewhere

To host on your own website, build the web client as described above and the copy the contents of the web client build at `build` to the appropriate location on your website.

## Building and deploying on other environments

The process is basically the same:

- Create an environment specific backend with the CDK backend stack
- Use the output to populate environment specific configuration for the web clients
- Build and deploy the frontend stack.

Multiple `.env.CONFIG` files can be maintained in the web client folders. The `package.json` of each of the web clients can be set to look for particular config files for particular builds:

```
"scripts": {
  ...
  "build:test": "env-cmd -f .env.test.local npm run build",
  "build:live": "env-cmd -f .env.live.local npm run build",
},
```

For example, `npm run build:test` will create a build using the configuration in `.env.test.local`.

## AWS Deployment architecture

The Emergency Inventory backend consists of:

- A DynamoDB table of container checks 
- Lambda function processing the client API requests.
- API Gateway wrapper for this lambda function.
- A Cognito user pool for API authorisation.

The DynamoDB table is set to retain on delete, with fixed resource names to avoid a CloudFormation update replacing it (as their contents are not easily replaced).

The Emergency Inventory frontend consists of:

- An S3 bucket containing the static website 
- A CloudFront distribution to make the website accessible online.
