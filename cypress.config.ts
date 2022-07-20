import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 768,
  viewportWidth: 375,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
