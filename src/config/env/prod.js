const port = process.env.PORT || 9200;
const host = process.env.HOST || 'http://localhost';
const url = `${host}:${port}`;

const env = {
  mode: 'production',
  port,
  host,
  url,
  callbackUrl: `${url}/callback`,
  audience: `${url}`,
};

export default env;
