// @flow

import type { UserStateType, UserActionType } from './user.types';
import USER from './user.constants';

const defaultUserState = {};

const userReducer = (
  state: UserStateType = defaultUserState,
  action: UserActionType,
): UserStateType => {
  switch (action.type) {
  case USER.UPDATE_USER:
    return {
      ...state,
      ...action.payload.user,
    };
  default:
    return state;
  }
};

export default userReducer;
