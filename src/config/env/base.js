import path from 'path';

const rootPath = path.normalize(`${__dirname}/../../..`);

const env = {
  appName: 'roy-home',
  root: rootPath,
  mode: 'production',
  auth0: {
    domain: 'royk.auth0.com',
    clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
  },
};

export default env;