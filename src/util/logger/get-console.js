// @flow

import LOG_TYPE from './levels';
import type { LogType } from './types';

const getConsole = (logType: LogType) => {
  switch (logType) {
  case LOG_TYPE.DEBUG:
  case LOG_TYPE.INFO:
    return console.log;
  case LOG_TYPE.WARN:
    return console.warn;
  case LOG_TYPE.ERROR:
  case LOG_TYPE.FATAL:
    return console.error;
  default:
    return console.log;
  }
};

export default getConsole;
