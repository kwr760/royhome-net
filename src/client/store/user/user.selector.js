// @flow

import { createSelector } from 'reselect';
import type { StateType } from '../store.types';
import type { UserStateType } from './user.types';

export const getUser = createSelector<StateType, null, UserStateType, UserStateType>(
  (state) => state.user,
  (user) => user,
);
