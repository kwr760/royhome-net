import axios from 'axios';

import { isEmpty } from 'lodash';
import { Dispatch } from 'react';

import { ERROR_CODE } from '../../../util/error-codes';
import { apiFailureActionCreator, apiRequestActionCreator, apiSucessActionCreator } from './api.contants';
import { getParsedUrl } from '../../util/url/get-parsed-url';

import { getApiUrl } from '../../util/url/get-api-url';
import { ActionObjectType, ApiConfigType } from '../../../types/api.types';

export const apiActionCreator = async (
  dispatch: Dispatch<unknown>,
  config: ApiConfigType,
  action: ActionObjectType,
): Promise<void> => {
  const { method, headers = {}, authenticated = false } = config;
  const {
    type, payload, token,
  } = action;
  const apiUrl = getApiUrl();
  const url = getParsedUrl(config, action, apiUrl);

  if (authenticated) {
    if (isEmpty(token)) {
      throw ERROR_CODE.API_UNAUTHENTICATED;
    }
    headers.Authorization = `Bearer ${token}`;
  }

  dispatch(apiRequestActionCreator({
    type,
    payload,
  }));
  axios(
    {
      method,
      url,
      headers,
      data: payload,
    },
  )
    .then((response) => {
      const successAction = apiSucessActionCreator({
        type,
        payload,
        data: response.data,
      });
      dispatch(successAction);
    })
    .catch((error) => {
      const failureAction = apiFailureActionCreator({
        type,
        payload,
        error: error.message,
      });
      dispatch(failureAction);
    });
};
