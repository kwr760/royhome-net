// @flow

import util from 'util';

const getCurrentDate = () => {
  const current = new Date(Date.now());
  const year = current.getFullYear();
  const month = `0${current.getMonth() + 1}`.slice(-2);
  const date = `0${current.getDate()}`.slice(-2);
  return util.format('%s%s%s', year, month, date);
};

export default getCurrentDate;
