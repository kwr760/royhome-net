// @flow

import type { UserActionType, UserStateType } from './user.types';
import { defaultUserState, USER_ACTION } from './user.constants';

export const userReducer = (
  state: UserStateType = defaultUserState,
  action: UserActionType,
): UserStateType => {
  switch (action.type) {
  case USER_ACTION.UPDATE_USER:
    return {
      ...state,
      ...action.payload.user,
    };
  // no default
  }

  return state;
};
