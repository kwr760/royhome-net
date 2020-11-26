import LOG_LEVELS from '../../common/util/logger/logger-levels';

const env = {
  mode: 'dev',
  log: {
    dir: './log',
    level: LOG_LEVELS.DEBUG,
    stdout: true,
    includePidFilename: false,
  },
};

export default env;
