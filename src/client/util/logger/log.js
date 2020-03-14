// @flow

import env from '../../../config';

import getConsole from '../../../util/logger/get-console';
import writeToServer from './write-to-server';
import type { LogType } from '../../../util/logger/types';

const log = ({ logType, msg }: { logType: LogType, msg: string }) => {
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
