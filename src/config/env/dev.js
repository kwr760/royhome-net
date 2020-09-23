// @flow

import LOG_LEVELS from '@common/util/logger/logger-levels';

const currentHost = global.origin || 'https://royk.us:3000';

const env = (host) => ({
  mode: 'development',
  host,
  auth0: {
    callbackUrl: `${host}`,
  },
  cert: {
    key: '/etc/letsencrypt/royhome/privkey.pem',
    cert: '/etc/letsencrypt/royhome/cert.pem',
    ca: '/etc/letsencrypt/royhome/chain.pem',
  },
  log: {
    dir: './log',
    level: LOG_LEVELS.DEBUG,
    stdout: true,
    includePidFilename: false,
  },
});

export default env(currentHost);
