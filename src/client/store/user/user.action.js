// @flow

import type { Action } from 'redux';

import { USER_ACTION } from './user.constants';
import type { UserStateType } from './user.types';

export const updateUser = (user: UserStateType): Action<string> => ({
  type: USER_ACTION.UPDATE_USER,
  payload: {
    user,
  },
});
