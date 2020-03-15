// @flow

import type { LogType } from '../../util/logger/types';

export type LogMsg = {|
  logType: LogType,
  msg: string,
|};
