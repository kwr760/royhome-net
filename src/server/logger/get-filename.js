// @flow

import path from 'path';

import env from '@src/config';
import getCurrentDate from '@src/util/datetime/get-current-date';

const getLogFilename = (location: string) => {
  const date = getCurrentDate();
  let filename = `${location}/server-${date}`;
  if (env.log.includePidFilename) {
    filename += `-${process.pid}`;
  }

  return path.resolve(`${filename}.log`);
};

export default getLogFilename;
