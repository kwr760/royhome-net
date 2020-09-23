// @flow

export const getApiUrl = () => {
  const { host, protocol } = global.location;
  const domain = host.substring(host.lastIndexOf('.', host.lastIndexOf('.') - 1) + 1);
  return `${protocol}//api.${domain}`;
};
