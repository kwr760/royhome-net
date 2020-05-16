// @flow

import type { ActionObjectType } from './api.types';

export const API_STATUS = {
  REQUEST: 'request',
  SUCCESS: 'success',
  FAILURE: 'failure',
};

export const API_CONFIG = {
  PUT_LOG: {
    method: 'put',
    url: '/log',
    headers: {
      'Content-Type': 'application/json',
    },
    authenticated: false,
  },
  GET_RESUME: {
    method: 'get',
    url: '/resume',
    authenticated: true,
  },
};

export const apiRequestActionCreator = (action: ActionObjectType) => ({
  ...action,
  status: API_STATUS.REQUEST,
});

export const apiSucessActionCreator = (action: ActionObjectType) => ({
  ...action,
  status: API_STATUS.SUCCESS,
});

export const apiFailureActionCreator = (action: ActionObjectType) => ({
  ...action,
  status: API_STATUS.FAILURE,
});
