// @flow

import path from 'path';

const rootPath = path.normalize(`${__dirname}/../../..`);

const currentHost = global.origin || 'https://royk.us';

const env = (host) => ({
  appName: 'roy-home',
  host,
  root: rootPath,
  port: {
    web: 3000,
    api: 5000,
  },
  api: {
    url: 'https://api.royk.us',
  },
  cert: {
    key: '/var/cert/royk.us/privkey.pem',
    cert: '/var/cert/royk.us/cert.pem',
    ca: '/var/cert/royk.us/chain.pem',
  },
  auth0: {
    domain: 'royk.auth0.com',
    clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
    audience: 'http://royk.us',
    callbackUrl: `${host}`,
  },
});

export default env(currentHost);
