import LOG_LEVELS from '../../common/util/logger/logger-levels';

const env = {
  mode: 'production',
  log: {
    dir: '/var/log/royhome.net',
    level: LOG_LEVELS.WARN,
    stdout: false,
    includePidFilename: true,
  },
};

export default env;
