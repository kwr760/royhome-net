// @flow

import type {
  ActionRequestType, ActionSuccessType, ActionFailureType,
} from './api.types';

export const API_STATUS = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
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
    url: '/resume/{email}',
    authenticated: true,
  },
};

export const apiRequestActionCreator = (action: ActionRequestType) => ({
  ...action,
  status: API_STATUS.REQUEST,
});

export const apiSucessActionCreator = (action: ActionSuccessType) => ({
  ...action,
  status: API_STATUS.SUCCESS,
});

export const apiFailureActionCreator = (action: ActionFailureType) => ({
  ...action,
  status: API_STATUS.FAILURE,
});
