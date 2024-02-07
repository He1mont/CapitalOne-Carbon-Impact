module.exports = appInfo => {
  const config = exports = {};

  config.keys = appInfo.name + '_1701638477270_4148';
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: 'http://localhost:3000',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };

  const userConfig = {

  };

  return {
    ...config,
    ...userConfig,
  };
};
