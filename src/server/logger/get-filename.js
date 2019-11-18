import dateFormat from 'dateformat';
import path from 'path';

const getLogFilename = (location) => {
  const timestamp = Date.now();
  const date = dateFormat(timestamp, 'yyyymmdd');
  const { pid } = process;
  return path.resolve(`${location}/server-${date}-${pid}.log`);
};

export default getLogFilename;
