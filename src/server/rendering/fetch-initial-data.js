// @flow

import type { DataType } from './types';

const fetchInitialData = (endpoints: Object): DataType => {
  const data = {};
  Object.keys(endpoints)
    .map((name) => {
      data[name] = endpoints[name]();
      return name;
    });
  return data;
};

export default fetchInitialData;
