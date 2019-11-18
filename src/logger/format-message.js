import dateFormat from 'dateformat';
import { LEVEL_NAMES } from './levels';

const formatMessage = (level, msg) => {
  const timestamp = Date.now();
  const datetime = dateFormat(timestamp, 'yyyy-mm-dd_hh-MM-ss');
  const { pid } = process;
  return `${datetime}:${pid}:${LEVEL_NAMES[level]}:${msg}`;
};

export default formatMessage;
