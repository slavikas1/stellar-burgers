import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4000",
    setupNodeEvents(on, config) {
    },
    supportFile: "cypress/support/e2e.ts", 
  },
});
