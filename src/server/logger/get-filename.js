import path from 'path';
import getCurrentDate from '../../util/datetime/get-current-date';

const getLogFilename = (location) => {
  const date = getCurrentDate();
  const { pid } = process;
  return path.resolve(`${location}/server-${date}-${pid}.log`);
};

export default getLogFilename;
