const port = process.env.PORT || 9200;
const host = process.env.HOST || 'http://45.79.110.249';
const url = `${host}:${port}`;

const env = {
  mode: 'production',
  port,
  host,
  url,
  auth0: {
    callbackUrl: `${url}/callback`,
  },
};

export default env;
