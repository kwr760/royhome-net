import axios, { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';

import { ERROR_CODE } from '../../../util/error-codes';
import { getParsedUrl } from './get-parsed-url';
import { getApiUrl } from './get-api-url';
import { ApiDetailsType, ApiConfigType } from '../../../types/api.types';

export const callApi = async (
  api: ApiConfigType,
  details: ApiDetailsType,
): Promise<AxiosResponse> => {
  const { method, path, headers = {}, authenticated = false } = api;
  const { payload, token, params } = details;
  const apiUrl = getApiUrl();
  const url = getParsedUrl(apiUrl, path, params);

  if (authenticated) {
    if (isEmpty(token)) {
      throw ERROR_CODE.API_UNAUTHENTICATED;
    }
    headers.Authorization = `Bearer ${token}`;
  }

  return axios(
    {
      method,
      url,
      headers,
      data: payload,
    },
  );
};
