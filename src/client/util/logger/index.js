// @flow

import LOG_LEVELS from '../../../util/logger/logger-levels';
import log from './log';
import type { LogMsgType } from '../../../server/logger/logger.types';

class Logger {
  writeLog = (msg: LogMsgType) => {
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
