// @flow

import type { LogType } from '@src/util/logger/logger.types';

export type LogMsgType = {|
  logType: LogType,
  msg: string,
|};
