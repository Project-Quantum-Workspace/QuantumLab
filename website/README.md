# QuantumLab Frontend

## 🛠️ Environment Setup

Install `node_modules`:

```bash
npm install
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

# 📁 Folder Structure Guide

## General

```bash
├── config                   # umi configuration, includes routes, build, etc.
├── jest                     # jest config
├── cypress                  # e2e test
├── mock                     # mock api for development
├── public                   # static resources
├── src
│   ├── assets               # local static resources
│   ├── components           # common components
│   ├── layouts              # common layouts
│   ├── models               # global dva models
│   ├── pages                # page entry points and commonly used templates
│   ├── services             # backend interface services
│   ├── utils                # utility library
│   ├── locales              # internationalization resources
│   ├── global.less          # global styles
│   └── global.ts            # global JS
├── cypress.config.js        # cypress config
├── README.md
└── package.json
```

## Pages

Check out the [Page Code Structure](https://pro.ant.design/docs/folder#page-code-structure-recommendation) documentation.

Example:

```bash
src
├── components         // Common components
└── pages
    ├── Welcome        // Routed Page Component
    |   ├── components // components only used in this page
    |   ├── Form.tsx
    |   ├── index.tsx  // Code of page component
    |   └── index.less // Page style
    ├── Workspace
    |   ├── components // Workspace page group components
    |   ├── Create      // 'Create' page component under Workspace page group
    |   └── util.ts    // Workspace page group common utility functions
    └── *              // Others
```

## Running Tests with Cypress

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed.
- Install Cypress via npm:
  ```sh
  npm install cypress --save-dev
  ```

### Running Cypress Tests

Before running any tests, make sure you are in the directory of `/website`.

1. **Open Cypress Test Runner:**

   - You can open the Cypress Test Runner with the following command:
     ```sh
     npx cypress open
     ```
   - This will open the Cypress GUI where you can select and run individual test files.

2. **Run Cypress Tests Headlessly:**

   - To run Cypress tests in headless mode (without opening the GUI), use the following command:
     ```sh
     npx cypress run
     ```
   - This will execute all the test suites in the background and provide a summary of the results in your terminal.

3. **Running Specific Test Files:**
   - If you want to run a specific test file, use the following command format:
     ```sh
     npx cypress run --spec "website/cypress/e2e/testfile.specs.js"
     ```
   - Replace `testfile.spec.js` with the actual path to your Cypress test file.

## 🔗 Related Links

- [Ant Design](https://ant.design)
- [Ant Design Pro](https://pro.ant.design)
- [UmiJS](https://umijs.org/)
- [Pro Components](https://procomponents.ant.design/)
