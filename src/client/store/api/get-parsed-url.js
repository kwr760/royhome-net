// @flow

import env from '../../../config';
import type { ActionObjectType, ApiConfigType } from './api.types';

export const getParsedUrl = (config: ApiConfigType, action: ActionObjectType) => {
  const { params = {} } = action;

  let parsedUrl = `${env.host}/api${config.url}`;
  Object.keys(params).forEach((key) => {
    parsedUrl = parsedUrl.replace(`{${key}}`, encodeURIComponent(params[key]));
  });
  return parsedUrl;
};
