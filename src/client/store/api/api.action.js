// @flow

import axios from 'axios';

import { isEmpty } from 'lodash';
import type { Action, Dispatch } from 'redux';

import { apiFailureActionCreator, apiRequestActionCreator, apiSucessActionCreator } from './api.contants';
import { ERROR_CODE } from '../../../util/error-codes';
import { getParsedUrl } from './get-parsed-url';

import type { ActionObjectType, ApiConfigType } from './api.types';

export const apiActionCreator = async (
  dispatch: Dispatch<Action<string>>,
  config: ApiConfigType,
  action: ActionObjectType,
) => {
  const { method, headers = {}, authenticated = false } = config;
  const {
    type, payload = {}, token,
  } = action;
  const url = getParsedUrl(config, action);

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
