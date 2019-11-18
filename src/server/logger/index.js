import LOG_LEVELS from '../../logger/levels';
import log from './log';

class Logger {
  debug = (msg) => {
    log({
      level: LOG_LEVELS.DEBUG,
      msg,
    });
  };

  log = (msg) => {
    log({
      level: LOG_LEVELS.INFO,
      msg,
    });
  };

  warning = (msg) => {
    log({
      level: LOG_LEVELS.WARN,
      msg,
    });
  };

  error = (msg) => {
    log({
      level: LOG_LEVELS.ERROR,
      msg,
    });
  };

  fatal = (msg) => {
    log({
      level: LOG_LEVELS.FATAL,
      msg,
    });
  };
}

export default new Logger();
