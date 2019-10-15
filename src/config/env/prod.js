const webPort = process.env.WEB_PORT || 9200;
const webHost = process.env.WEB_HOST || 'http://localhost';
const webUrl = `${webHost}:${webPort}`;
const apiPort = process.env.API_PORT || 9201;
const apiHost = process.env.API_HOST || 'http://localhost';
const apiUrl = `${apiHost}:${apiPort}`;

const env = {
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
    callbackUrl: `${webUrl}/callback`,
    audience: `${apiUrl}`,
  },
};

export default env;
