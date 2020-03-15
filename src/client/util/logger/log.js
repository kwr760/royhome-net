// @flow

import env from '../../../config';

import getConsole from '../../../util/logger/get-console';
import writeToServer from './write-to-server';
import type { LogMsg } from '../../../server/logger/types';

const log = ({ logType, msg }: LogMsg) => {
  const {
    level: logLevel,
    stdout: displayToScreen,
  } = env.log;

  if (logType.level >= logLevel) {
    writeToServer({ logType, msg });

    if (displayToScreen) {
      const consoleCb = getConsole(logType);
      consoleCb(msg);
    }
  }
};

export default log;
