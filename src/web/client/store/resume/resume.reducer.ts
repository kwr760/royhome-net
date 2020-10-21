import { ResumeActionType } from '../../../types/action.types';
import { ResumeStateType } from '../../../types/state.types';
import { ResumeActions, defaultResumeState } from './resume.constants';
import { ApiStatuses } from '../api/api.contants';

export const resumeReducer = (
  state: ResumeStateType = defaultResumeState,
  action: ResumeActionType,
): ResumeStateType => {
  switch (action.type) {
  case ResumeActions.GET_RESUME: {
    const { payload } = action;
    switch (action.status) {
    case ApiStatuses.REQUEST:
      return state;
    case ApiStatuses.SUCCESS: {
      const { data = {} } = action;
      const { email } = payload;
      const { resume } = data;
      return {
        ...state,
        [email]: resume,
      };
    }
    case ApiStatuses.FAILURE: {
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
