import LOG_LEVELS from '../../util/logger/logger-levels';
import log from './log';

class Logger {
  writeLog = (msg) => {
    log(msg);
  };

  debug = (msg) => {
    this.writeLog({
      logType: LOG_LEVELS.DEBUG,
      msg,
    });
  };

  log = (msg) => {
    this.writeLog({
      logType: LOG_LEVELS.INFO,
      msg,
    });
  };

  warning = (msg) => {
    this.writeLog({
      logType: LOG_LEVELS.WARN,
      msg,
    });
  };

  error = (msg) => {
    this.writeLog({
      logType: LOG_LEVELS.ERROR,
      msg,
    });
  };

  fatal = (msg) => {
    this.writeLog({
      logType: LOG_LEVELS.FATAL,
      msg,
    });
  };
}

export default new Logger();
