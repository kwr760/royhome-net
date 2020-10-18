import { Dispatch } from 'react';
import { ApiConfigType } from '../../../types/api.types';
import { ResumeActions } from './resume.constants';
import { apiActionCreator } from '../api/api.action';
import { ApiConfigs } from '../api/api.contants';

export const getResumeAction = (
  dispatch: Dispatch<unknown>,
  email: string,
  token: string,
): Promise<void> => {
  const action = {
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
    ApiConfigs.GET_RESUME as ApiConfigType,
    action,
  );
};
