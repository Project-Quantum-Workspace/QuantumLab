const USE_MOCK= false;

const proxyConfig = {
  dev: {
    '/api/': {
      target: 'https://feature-admin-user-list.dev.quantumlab.cloud',
      changeOrigin: true,
    },
  },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
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

export default USE_MOCK ? {} : proxyConfig;
