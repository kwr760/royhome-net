// @flow

import LOG_TYPE from '../../util/logger/levels';

import log from './log';
import type { LogMsg } from './types';

class Logger {
  writeLog = (msg: LogMsg) => {
    log(msg);
  };

  debug = (msg: string) => {
    this.writeLog({
      logType: LOG_TYPE.DEBUG,
      msg,
    });
  };

  log = (msg: string) => {
    this.writeLog({
      logType: LOG_TYPE.INFO,
      msg,
    });
  };

  warning = (msg: string) => {
    this.writeLog({
      logType: LOG_TYPE.WARN,
      msg,
    });
  };

  error = (msg: string) => {
    this.writeLog({
      logType: LOG_TYPE.ERROR,
      msg,
    });
  };

  fatal = (msg: string) => {
    this.writeLog({
      logType: LOG_TYPE.FATAL,
      msg,
    });
  };
}

export default new Logger();
