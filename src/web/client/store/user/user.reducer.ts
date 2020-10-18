import { defaultUserState, UserActions } from './user.constants';
import { UserActionType, UserStateType } from '../../../types/user.types';

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
