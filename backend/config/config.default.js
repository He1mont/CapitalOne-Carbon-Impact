/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1701638477270_4148';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

exports.security = {
  csrf: {
    enable: false,
  },
};

// config/config.default.js
exports.cors = {
  origin: 'http://localhost:3000/Transactions',  // where react frontend runs
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  credentials: true,
};


exports.mysql = {
  client: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'hello-world',
    database: 'BackendTest',
  },
  app: true,
  agent: false,
};
