import LOG_LEVELS from '../../../../common/util/logger/logger-levels';
import log from './log';

class Logger {
  writeLog = (msg) => {
    log(msg);
  };

  debug = (msg: string) => {
    this.writeLog({
      logType: LOG_LEVELS.DEBUG,
      msg,
    });
  };

  log = (msg: string) => {
    this.writeLog({
      logType: LOG_LEVELS.INFO,
      msg,
    });
  };

  warning = (msg: string) => {
    this.writeLog({
      logType: LOG_LEVELS.WARN,
      msg,
    });
  };

  error = (msg: string) => {
    this.writeLog({
      logType: LOG_LEVELS.ERROR,
      msg,
    });
  };

  fatal = (msg: string) => {
    this.writeLog({
      logType: LOG_LEVELS.FATAL,
      msg,
    });
  };
}

export default new Logger();
