// @flow

import env from '@src/config';

import getConsole from '@src/util/logger/get-console';
import writeToServer from './write-to-server';
import type { LogMsgType } from '../../../server/logger/logger.types';

const log = ({ logType, msg }: LogMsgType) => {
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
