// @flow

import { createSelector } from 'reselect';
import type { StateType } from '../types';
import type { UserStateType } from './types';

export const getUser = createSelector<StateType, null, UserStateType, UserStateType>(
  (state) => state.user,
  (user) => user,
);
