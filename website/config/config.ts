// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  /**
   * @name Enable hash mode
   * @description Add a hash suffix to the build artifacts. Usually used for incremental release and cache avoidance.
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,
  mock: false,
  esbuildMinifyIIFE: true,


  /**
   * @name Compatibility settings
   * @description Setting ie11 doesn't guarantee perfect compatibility, you need to check all your dependencies.
   * @doc https://umijs.org/docs/api/config#targets
   */
  // targets: {
  //   ie: 11,
  // },
  /**
   * @name Configuration of routes, files not imported in the routes will not be compiled
   * @description Only supports the configuration of path, component, routes, redirect, wrappers, title
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @name Theme configuration
   * @description Although it is called theme, it is actually just a setting for Less variables
   * @doc antd theme customization https://ant.design/docs/react/customize-theme-cn
   * @doc umi theme configuration https://umijs.org/docs/api/config#theme
   */
  theme: {
    // Set this to default if you don't want configProvide to dynamically set the theme
    // Only by setting it to variable, can you use configProvide to dynamically set the primary color
    'root-entry-name': 'variable',
  },
  /**
   * @name moment Internationalization configuration
   * @description If you have no requirement for internationalization, enabling this will reduce the size of the JS bundle
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  /**
   * @name Proxy configuration
   * @description Allows your local server to be proxied to your actual server, so you can access the server data
   * @see Note that the proxy can only be used during local development; it cannot be used after the build.
   * @doc Introduction to proxy https://umijs.org/docs/guides/proxy
   * @doc Proxy configuration https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  /**
   * @name Fast hot update configuration
   * @description A good hot update component, can preserve state during updates
   */
  fastRefresh: true,
  //============== Below are max plugin configurations ===============
  /**
   * @name Data flow plugin
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * A global initial data flow, can be used to share data between plugins
   * @description Can be used to store some global data, such as user information, or some global states.
   * Global initial state is created at the very beginning of the Umi project.
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},
  /**
   * @name layout plugin
   * @doc https://umijs.org/docs/max/layout-menu
   */
  title: 'QuantumLab',
  layout: {
    locale: true,
    ...defaultSettings,
  },
  /**
   * @name moment2dayjs plugin
   * @description Replaces moment in the project with dayjs
   * @doc https://umijs.org/docs/max/moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  /**
   * @name Internationalization plugin
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: false,
  },
  /**
   * @name antd plugin
   * @description Comes with the babel import plugin
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},
  /**
   * @name Network request configuration
   * @description It is based on axios and ahooks' useRequest to provide a unified network request and error handling solution.
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  /**
   * @name Permission plugin
   * @description A permission plugin based on initialState, initialState must be enabled first.
   * @doc https://umijs.org/docs/max/access
   */
  access: {},
  /**
   * @name <head> Additional Script
   * @description Configures additional scripts in the <head>
   */
  headScripts: [
    // Solves the issue of white screen on initial load
    { src: '../public/scripts/loading.js', async: true },
  ],
  //================ pro plugin configurations =================
  presets: ['umi-presets-pro'],
  /**
   * @name openAPI plugin Configuration
   * @description Generates serve and mock based on the openAPI specification, reduces a lot of template code
   * @doc https://pro.ant.design/zh-cn/docs/openapi/
   */
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      // schemaPath: join(__dirname, '../../docs/swagger.json'),
      schemaPath:
        'https://raw.githubusercontent.com/Project-Quantum-Workspace/QuantumLab/main/docs/swagger.json',
      mock: false,
    },
  ],
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},

  publicPath: process.env.NODE_ENV === 'production' ? '/public/' : '/',

  favicons: ['/public/favicon.ico'],
  // manifest: {
  //   basePath: '/',
  // }
  // Pack static file into static directory
});
