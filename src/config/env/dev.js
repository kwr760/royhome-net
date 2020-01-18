import LOG_LEVELS from '../../util/logger/levels';

const currentHost = 'http://localhost:3000';

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
    level: LOG_LEVELS.DEBUG,
    stdout: true,
    includePidFilename: false,
  },
});

export default env(currentHost);
