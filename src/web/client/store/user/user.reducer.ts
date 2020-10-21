import { UserActionType } from '../../../types/action.types';
import { UserStateType } from '../../../types/state.types';
import { defaultUserState, UserActions } from './user.constants';

export const userReducer = (
  state: UserStateType = defaultUserState,
  action: UserActionType,
): UserStateType => {
  switch (action.type) {
  case UserActions.UPDATE_USER:
    return {
      ...state,
      ...action.payload.user,
    };
  // no default
  }

  return state;
};
