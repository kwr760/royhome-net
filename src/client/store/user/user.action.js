// @flow

import type { Action } from 'redux';

import USER from './user.constants';
import type { UserStateType } from './user.types';

export const updateUser = (user: UserStateType): Action<string> => ({
  type: USER.UPDATE_USER,
  payload: {
    user,
  },
});
