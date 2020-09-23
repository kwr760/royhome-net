// @flow

import getCurrentDatetime from '../datetime/get-current-datetime';
import type { LogType } from './logger.types';

const formatMessage = (logType: LogType, msg: string) => {
  const datetime = getCurrentDatetime();
  const { pid } = process;
  const logMsg = JSON.stringify(msg);
  return `${datetime}:${pid}:${logType.name}:${logMsg}`;
};

export default formatMessage;
