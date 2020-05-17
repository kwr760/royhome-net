// @flow

import type { ResumeStateType, ResumeActionType } from './resume.types';
import { RESUME_ACTION, defaultResumeState } from './resume.constants';
import { API_STATUS } from '../api/api.contants';

export const resumeReducer = (
  state: ResumeStateType = defaultResumeState,
  action: ResumeActionType,
): ResumeStateType => {
  switch (action.type) {
  case RESUME_ACTION.GET_RESUME: {
    const { payload } = action;
    switch (action.status) {
    case API_STATUS.REQUEST:
      return state;
    case API_STATUS.SUCCESS: {
      const { data = {} } = action;
      const { email } = payload;
      const { resume = {} } = data;
      return {
        ...state,
        [email]: resume,
      };
    }
    case API_STATUS.FAILURE: {
      const { error } = action;
      return {
        ...state,
        error,
      };
    }
      // no default
    }
  }
  // no default
  }

  return state;
};
