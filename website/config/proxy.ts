/**
 * @name Proxy configuration
 * @see Proxy cannot take effect in the production environment, hence there is no configuration for production environment here.
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  // Uncomment the following and adjust as needed if you need to customize the local development server.
  dev: {
    '/api/': {
      // target:'http://localhost:8080',
      //target: 'https://feature-template-api-integration.dev.quantumlab.cloud',
      target: 'https://quantumlab.cloud',
      // Configuring this allows proxying from http to https
      // Features dependent on origin may need this, e.g. cookies
      changeOrigin: true,
    },
  },

  /**
   * @name Detailed proxy configuration
   * @doc https://github.com/chimurai/http-proxy-middleware
   */
  test: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
