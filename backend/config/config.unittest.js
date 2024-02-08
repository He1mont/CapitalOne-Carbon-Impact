'use strict';

module.exports = () => {
  const config = {};

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.logger = {
    level: 'ERROR',
    consoleLevel: 'ERROR',
  };

  return config;
};
