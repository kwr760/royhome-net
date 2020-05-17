// @flow

import type { Action, Dispatch } from 'redux';

import { RESUME_ACTION } from './resume.constants';
import { apiActionCreator } from '../api/api.action';
import { API_CONFIG } from '../api/api.contants';
import type { ActionObjectType } from '../api/api.types';

export const getResumeAction = (
  dispatch: Dispatch<Action<string>>,
  email: string,
  token: string,
) => {
  const action: ActionObjectType = {
    type: RESUME_ACTION.GET_RESUME,
    payload: {
      email,
    },
    params: {
      email,
    },
    token,
  };
  return apiActionCreator(
    dispatch,
    API_CONFIG.GET_RESUME,
    action,
  );
};
