import LOG_TYPE from '../../util/logger/levels';

const currentHost = global.origin || 'http://localhost:3000';

const env = (host) => ({
  mode: 'development',
  host,
  auth0: {
    callbackUrl: `${host}`,
  },
  server: {
    rendering: true,
    https: false,
  },
  log: {
    dir: './log',
    level: LOG_TYPE.DEBUG,
    stdout: true,
    includePidFilename: false,
  },
});

export default env(currentHost);
