import { Params } from '../../../types/api.types';

export const getParsedUrl = (baseUrl: string, path: string, params: Params = {}): string => {
  let parsedUrl = `${baseUrl}${path}`;
  Object.keys(params).forEach((key) => {
    parsedUrl = parsedUrl.replace(`{${key}}`, encodeURIComponent(params[key]));
  });
  return parsedUrl;
};
