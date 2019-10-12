import path from 'path';

const rootPath = path.normalize(`${__dirname}/../..`);

const webPort = process.env.WEB_PORT || 7000;
const webHost = process.env.WEB_HOST || 'http://localhost';
const webUrl = `${webHost}:${webPort}`;
const apiPort = process.env.API_PORT || 7001;
const apiHost = process.env.API_HOST || 'http://localhost';
const apiUrl = `${apiHost}:${apiPort}`;

const env = {
  appName: 'roy-home',
  root: rootPath,
  mode: 'production',
  web: {
    port: webPort,
    host: webHost,
    url: webUrl,
  },
  api: {
    port: apiPort,
    host: apiHost,
    url: apiUrl,
  },
  auth0: {
    domain: 'royk.auth0.com',
    clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
    callbackUrl: `${webUrl}/callback`,
    audience: `${apiUrl}`,
  },
};

export default env;
