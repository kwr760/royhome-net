// @flow

import type { ActionObjectType, ApiConfigType } from './api.types';

export const getParsedUrl = (config: ApiConfigType, action: ActionObjectType) => {
  const { params = {} } = action;
  const { host, protocol } = global.location;
  const domain = host.substring(host.lastIndexOf('.', host.lastIndexOf('.') - 1) + 1);

  let parsedUrl = `${protocol}//api.${domain}${config.url}`;
  Object.keys(params).forEach((key) => {
    parsedUrl = parsedUrl.replace(`{${key}}`, encodeURIComponent(params[key]));
  });
  return parsedUrl;
};
