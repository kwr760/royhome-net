import LOG_LEVELS from './logger-levels';

import { LogType } from '../../types/logger.types';

const getConsole = (logType: LogType): (...data: string[]) => void => {
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
