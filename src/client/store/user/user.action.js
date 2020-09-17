// @flow

import type { Action } from 'redux';

import { UserActions } from './user.constants';
import type { UserStateType } from './user.types';

export const updateUser = (user: UserStateType): Action<string> => ({
  type: UserActions.UPDATE_USER,
  payload: {
    user,
  },
});
