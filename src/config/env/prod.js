const currentHost = global.origin || 'https://royk.us';

// if (global.origin) {
//   currentHost = global.origin;
// }

const env = (host) => ({
  mode: 'production',
  host,
  auth0: {
    callbackUrl: `${host}/callback`,
  },
  server: {
    https: true,
    key: '/etc/letsencrypt/live/royk.us/privkey.pem',
    cert: '/etc/letsencrypt/live/royk.us/cert.pem',
    ca: '/etc/letsencrypt/live/royk.us/chain.pem',
  },
});

export default env(currentHost);
