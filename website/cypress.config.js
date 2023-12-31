const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '556oje',
  e2e: {
    baseUrl: 'http://localhost:8000',
    supportFile: 'cypress/support/index.js',
    specPattern: 'cypress/e2e/*.specs.js',
  },
  env: {
    QUANTUMLAB_WEB: 'http://localhost:8000',
  },
  defaultCommandTimeout: 60000,
});
