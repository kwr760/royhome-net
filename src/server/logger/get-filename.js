// @flow

import path from 'path';
import getCurrentDate from '../../util/datetime/get-current-date';
import env from '../../config';

const getLogFilename = (location: string) => {
  const date = getCurrentDate();
  let filename = `${location}/server-${date}`;
  if (env.log.includePidFilename) {
    filename += `-${process.pid}`;
  }

  return path.resolve(`${filename}.log`);
};

export default getLogFilename;
