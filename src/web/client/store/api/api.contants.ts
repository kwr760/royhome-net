import {
  ActionFailureType,
  ActionRequestType,
  ActionSuccessType,
  ApiResponseType,
} from '../../../types/api.types';

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

export const apiRequestActionCreator = (action: ActionRequestType): ApiResponseType => ({
  ...action,
  status: ApiStatuses.REQUEST,
});

export const apiSucessActionCreator = (action: ActionSuccessType): ApiResponseType => ({
  ...action,
  status: ApiStatuses.SUCCESS,
});

export const apiFailureActionCreator = (action: ActionFailureType): ApiResponseType => ({
  ...action,
  status: ApiStatuses.FAILURE,
});
