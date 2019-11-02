const port = process.env.PORT || 9100;
const host = process.env.HOST || 'http://localhost';
const url = `${host}:${port}`;

const env = {
  mode: 'development',
  port,
  host,
  url,
  auth0: {
    callbackUrl: `${url}/callback`,
  },
};

export default env;
