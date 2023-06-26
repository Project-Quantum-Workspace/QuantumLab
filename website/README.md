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
``` bash
├── config                   # umi configuration, includes routes, build, etc.
├── mock                     # mock api for development
├── public                   # static resources
├── src
│   ├── assets               # local static resources
│   ├── components           # common components
│   ├── e2e                  # e2e test
│   ├── layouts              # common layouts
│   ├── models               # global dva models
│   ├── pages                # page entry points and commonly used templates
│   ├── services             # backend interface services
│   ├── utils                # utility library
│   ├── locales              # internationalization resources
│   ├── global.less          # global styles
│   └── global.ts            # global JS
├── tests                    # testing tools
├── README.md
└── package.json
```
## Pages
Check out the [Page Code Structure](https://pro.ant.design/docs/folder#page-code-structure-recommendation) documentation.

Example:
``` bash
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

## 🔗 Related Links
- [Ant Design](https://ant.design)
- [Ant Design Pro](https://pro.ant.design)
- [UmiJS](https://umijs.org/)
- [Pro Components](https://procomponents.ant.design/)

