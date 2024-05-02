const { defineConfig } = require("cypress");
const { startDevServer } = require("@cypress/webpack-dev-server");
const webpackConfig = require("./webpack.config");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig,
      setupNodeEvents(on, config) {
        on("dev-server:start", (options) =>
          startDevServer({ options, webpackConfig })
        );
        return config;
      },
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
