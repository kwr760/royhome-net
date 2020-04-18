// @flow

import type { UserStateType, UserActionType } from './types';
import USER from './constants';

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
