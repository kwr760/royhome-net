// @flow

import type { Action, Dispatch } from 'redux';

import { ResumeActions } from './resume.constants';
import { apiActionCreator } from '../api/api.action';
import { ApiConfigs } from '../api/api.contants';
import type { ActionObjectType } from '../api/api.types';

export const getResumeAction = (
  dispatch: Dispatch<Action<string>>,
  email: string,
  token: string,
) => {
  const action: ActionObjectType = {
    type: ResumeActions.GET_RESUME,
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
    ApiConfigs.GET_RESUME,
    action,
  );
};
