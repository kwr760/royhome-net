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
    params = {}, data = {}, token,
  } = action;
  const url = getParsedUrl(config, action);

  if (authenticated) {
    if (isEmpty(token)) {
      throw ERROR_CODE.API_UNAUTHENTICATED;
    }
    headers.Authorization = `Bearer ${token}`;
  }

  dispatch(apiRequestActionCreator(action));
  axios(
    {
      method,
      url,
      headers,
      params,
      data,
    },
  )
    .then((response) => {
      dispatch(apiSucessActionCreator({
        ...action,
        response: response.data,
      }));
    })
    .catch((error) => {
      dispatch(apiFailureActionCreator({
        ...action,
        error,
      }));
    });
};
