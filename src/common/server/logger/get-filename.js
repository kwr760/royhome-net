// @flow

import path from 'path';

import env from '@config';
import getCurrentDate from '@common/util/datetime/get-current-date';

const getLogFilename = (location: string) => {
  const date = getCurrentDate();
  let filename = `${location}/server-${date}`;
  if (env.log.includePidFilename) {
    filename += `-${process.pid}`;
  }

  return path.resolve(`${filename}.log`);
};

export default getLogFilename;
