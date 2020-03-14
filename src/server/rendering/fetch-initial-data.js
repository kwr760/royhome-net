// @flow

const fetchInitialData = (endpoints: Object) => {
  const data = {};
  Object.keys(endpoints)
    .map((name) => {
      data[name] = endpoints[name]();
      return name;
    });
  return data;
};

export default fetchInitialData;
