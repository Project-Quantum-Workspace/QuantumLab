const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8000',
    "supportFile": "support/index.js",
    "specPattern": "e2e/*.specs.js"
  },
  "env":{
    // "API_LINK":"https://quantumlab.cloud",
    "QUANTUMLAB_WEB":"http://localhost:8000",
  },
});
