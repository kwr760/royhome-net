// @flow

import LOG_LEVELS from '../../util/logger/logger-levels';

const currentHost = global.origin || 'https://royk.us';

const env = (host) => ({
  mode: 'production',
  host,
  auth0: {
    callbackUrl: `${host}`,
  },
  server: {
    rendering: true,
    https: true,
    key: '/etc/letsencrypt/live/royk.us/privkey.pem',
    cert: '/etc/letsencrypt/live/royk.us/cert.pem',
    ca: '/etc/letsencrypt/live/royk.us/chain.pem',
  },
  log: {
    dir: '/var/log/royhome.net',
    level: LOG_LEVELS.WARN,
    stdout: false,
    includePidFilename: true,
  },
});

export default env(currentHost);
