import { LEVEL_NAMES } from './levels';
import getCurrentDatetime from '../datetime/get-current-datetime';

const formatMessage = (level, msg) => {
  const datetime = getCurrentDatetime();
  const { pid } = process;
  const logMsg = JSON.stringify(msg);
  return `${datetime}:${pid}:${LEVEL_NAMES[level]}:${logMsg}`;
};

export default formatMessage;
