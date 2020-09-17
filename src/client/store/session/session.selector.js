// @flow

import { createSelector } from 'reselect';
import type { StateType } from '../store.types';
import type { SessionStateType } from './session.types';

export const isAuthenticated = createSelector<StateType, null, boolean, SessionStateType>(
  (state: StateType) => state.session,
  (session: SessionStateType): boolean => session.authenticated,
);

export const isLoading = createSelector<StateType, mixed, boolean, SessionStateType>(
  (state: StateType) => state.session,
  (session: SessionStateType): boolean => session.isLoading,
);

export const getDarkMode = createSelector<StateType, mixed, string, SessionStateType>(
  (state: StateType) => state.session,
  (session: SessionStateType): string => session.darkMode,
);
