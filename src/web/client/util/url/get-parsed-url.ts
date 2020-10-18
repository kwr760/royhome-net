export interface ConfigType {
  url: string;
}
export interface ActionType {
  params: {
    [key: string]: string;
  };
}
import { ActionObjectType } from '../../../types/api.types';

export const getParsedUrl = (config: ConfigType, action: ActionObjectType, apiUrl: string): string => {
  const { params = {} } = action;

  let parsedUrl = `${apiUrl}${config.url}`;
  Object.keys(params).forEach((key) => {
    parsedUrl = parsedUrl.replace(`{${key}}`, encodeURIComponent(params[key]));
  });
  return parsedUrl;
};
