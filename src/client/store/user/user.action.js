// @flow

import type { Action } from 'redux';

import USER from './constants';
import type { UserStateType } from './types';

export const updateUser = (user: UserStateType): Action<string> => ({
  type: USER.UPDATE_USER,
  payload: {
    user,
  },
});
