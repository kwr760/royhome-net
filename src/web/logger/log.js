import env from '../../config';

import getConsole from '../../util/logger/get-console';
import writeToServer from './write-to-server';

const log = ({ level, msg }) => {
  const { level: logLevel, stdout: displayToScreen } = env.log;

  if (level >= logLevel) {
    writeToServer({ level, msg });

    if (displayToScreen) {
      const consoleCb = getConsole(level);
      consoleCb(msg);
    }
  }
};

export default log;
