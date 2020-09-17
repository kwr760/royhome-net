// @flow

import type {
  ActionRequestType, ActionSuccessType, ActionFailureType,
} from './api.types';

export const ApiStatuses = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export const ApiConfigs = {
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
  status: ApiStatuses.REQUEST,
});

export const apiSucessActionCreator = (action: ActionSuccessType) => ({
  ...action,
  status: ApiStatuses.SUCCESS,
});

export const apiFailureActionCreator = (action: ActionFailureType) => ({
  ...action,
  status: ApiStatuses.FAILURE,
});
