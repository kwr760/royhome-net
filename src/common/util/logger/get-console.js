// @flow

import LOG_LEVELS from '@common/util/logger/logger-levels';
import type { LogType } from './logger.types';

const getConsole = (logType: LogType) => {
  switch (logType) {
  case LOG_LEVELS.DEBUG:
  case LOG_LEVELS.INFO:
    return console.log;
  case LOG_LEVELS.WARN:
    return console.warn;
  case LOG_LEVELS.ERROR:
  case LOG_LEVELS.FATAL:
    return console.error;
  default:
    return console.log;
  }
};

export default getConsole;
