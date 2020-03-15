// @flow

import env from '../../config';

import getConsole from '../../util/logger/get-console';
import formatMessage from '../../util/logger/format-message';
import getLogFilename from './get-filename';
import writeToLog from './write-to-log';
import type { LogMsg } from './types';

const log = ({ logType, msg } : LogMsg) => {
  const {
    dir: logLocation,
    level: logLevel,
    stdout: displayToScreen,
  } = env.log;

  if (logType.level >= logLevel) {
    const logMessage = formatMessage(logType, msg);
    const logFile = getLogFilename(logLocation);

    writeToLog(logFile, logMessage);

    if (displayToScreen) {
      const consoleCb = getConsole(logType);
      consoleCb(logMessage);
    }
  }
};

export default log;
