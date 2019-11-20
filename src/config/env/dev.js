import LOG_LEVELS from '../../util/logger/levels';

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
  log: {
    dir: './log',
    level: LOG_LEVELS.DEBUG,
    stdout: true,
  },
});

export default env(currentHost);
