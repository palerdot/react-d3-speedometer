import { defineConfig } from "cypress";

export default defineConfig({
  video: false,

  component: {
    setupNodeEvents(on, config) {},
    specPattern: "src/__tests__/**/*.spec.{js,jsx}",
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
