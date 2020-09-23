// @flow

import type { ActionObjectType, ApiConfigType } from '../../store/api/api.types';

export const getParsedUrl = (config: ApiConfigType, action: ActionObjectType, apiUrl: string) => {
  const { params = {} } = action;

  let parsedUrl = `${apiUrl}${config.url}`;
  Object.keys(params).forEach((key) => {
    parsedUrl = parsedUrl.replace(`{${key}}`, encodeURIComponent(params[key]));
  });
  return parsedUrl;
};
