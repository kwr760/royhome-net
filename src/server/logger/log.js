import env from '../../config';

import getConsole from '../../util/logger/get-console';
import formatMessage from '../../util/logger/format-message';
import getLogFilename from './get-filename';
import writeToLog from './write-to-log';

const log = ({ level, msg }) => {
  const {
    dir: logLocation,
    level: logLevel,
    stdout: displayToScreen,
  } = env.log;

  if (level >= logLevel) {
    const logMessage = formatMessage(level, msg);
    const logFile = getLogFilename(logLocation);

    writeToLog(logFile, logMessage);

    if (displayToScreen) {
      const consoleCb = getConsole(level);
      consoleCb(logMessage);
    }
  }
};

export default log;
