// @flow

import type { ResumeStateType, ResumeActionType } from './resume.types';
import { RESUME_ACTION, defaultResumeState } from './resume.constants';
import { API_STATUS } from '../api/api.contants';

export const resumeReducer = (
  state: ResumeStateType = defaultResumeState,
  action: ResumeActionType,
): ResumeStateType => {
  switch (action.type) {
  case RESUME_ACTION.GET_RESUME:
    switch (action.status) {
    case API_STATUS.REQUEST:
      return state;
    case API_STATUS.SUCCESS:
      return {
        ...state,
      };
    case API_STATUS.FAILURE:
      return state;
    // no default
    }
  // no default
  }

  return state;
};
