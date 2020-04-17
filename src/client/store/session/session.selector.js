// @flow

import { createSelector } from 'reselect';
import type { StateType } from '../types';
import type { SessionStateType } from './types';

export const isAuthenticated = createSelector<StateType, null, boolean, SessionStateType>(
  (state: StateType) => state.session,
  (session: SessionStateType) => session.authenticated,
);

export const isLoading = createSelector<StateType, null, boolean, SessionStateType>(
  (state: StateType) => state.session,
  (session: SessionStateType): boolean => session.isLoading,
);
