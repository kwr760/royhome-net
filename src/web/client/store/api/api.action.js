// @flow

import axios from 'axios';

import { isEmpty } from 'lodash';
import type { Action, Dispatch } from 'redux';

import { ERROR_CODE } from '@web/util/error-codes';
import { apiFailureActionCreator, apiRequestActionCreator, apiSucessActionCreator } from './api.contants';
import { getParsedUrl } from '../../util/url/get-parsed-url';

import type { ActionObjectType, ApiConfigType } from './api.types';
import { getApiUrl } from '../../util/url/get-api-url';

export const apiActionCreator = async (
  dispatch: Dispatch<Action<string>>,
  config: ApiConfigType,
  action: ActionObjectType,
) => {
  const { method, headers = {}, authenticated = false } = config;
  const {
    type, payload = {}, token,
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
      dispatch(apiSucessActionCreator({
        type,
        payload,
        data: response.data,
      }));
    })
    .catch((error) => {
      dispatch(apiFailureActionCreator({
        type,
        payload,
        error: error.message,
      }));
    });
};
