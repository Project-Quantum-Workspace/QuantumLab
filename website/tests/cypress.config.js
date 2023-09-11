const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "556oje",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  "env":{
    "API_LINK":"https://quantumlab.cloud",
    "QUANTUMLAB_WEB":"http://localhost:8000",
    "mock":true
  },

});
