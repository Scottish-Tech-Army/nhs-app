import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 768,
  viewportWidth: 375,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    cognito_username: process.env.AWS_COGNITO_TEST_USERNAME,
    cognito_password: process.env.AWS_COGNITO_TEST_PASSWORD,
    // awsConfig: awsConfig.default
  }
});
