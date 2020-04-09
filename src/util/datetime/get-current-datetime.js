// @flow

import util from 'util';

const getCurrentDatetime = () => {
  const current = new Date(Date.now());
  const year = current.getFullYear();
  const month = `0${current.getMonth() + 1}`.slice(-2);
  const date = `00${current.getDate()}`.slice(-2);
  const hour = `00${current.getHours()}`.slice(-2);
  const minute = `00${current.getMinutes()}`.slice(-2);
  const second = `00${current.getSeconds()}`.slice(-2);
  const milli = `000${current.getMilliseconds()}`.slice(-3);
  return util.format('%s-%s-%s_%s:%s:%s.%s', year, month, date, hour, minute, second, milli);
};

export default getCurrentDatetime;
