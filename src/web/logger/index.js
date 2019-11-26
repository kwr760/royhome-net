import LOG_LEVELS from '../../util/logger/levels';
import log from './log';

class Logger {
  writeLog = (msg) => {
    log(msg);
  };

  debug = (msg) => {
    this.writeLog({
      level: LOG_LEVELS.DEBUG,
      msg,
    });
  };

  log = (msg) => {
    this.writeLog({
      level: LOG_LEVELS.INFO,
      msg,
    });
  };

  warning = (msg) => {
    this.writeLog({
      level: LOG_LEVELS.WARN,
      msg,
    });
  };

  error = (msg) => {
    this.writeLog({
      level: LOG_LEVELS.ERROR,
      msg,
    });
  };

  fatal = (msg) => {
    this.writeLog({
      level: LOG_LEVELS.FATAL,
      msg,
    });
  };
}

export default new Logger();
