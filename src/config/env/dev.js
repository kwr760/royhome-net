const currentHost = process.env.HOST || 'http://localhost:3000';

const env = (host) => ({
  mode: 'development',
  host,
  auth0: {
    callbackUrl: `${host}/callback`,
  },
  server: {
    https: false,
  },
});

export default env(currentHost);
