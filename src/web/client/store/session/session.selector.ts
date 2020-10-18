import { createSelector } from 'reselect';
import { StateType } from '../../../types/store.types';

export const isAuthenticated = createSelector(
  (state: StateType) => state.session,
  (session): boolean => session.authenticated,
);

export const isLoading = createSelector(
  (state: StateType) => state.session,
  (session): boolean => session.isLoading,
);

export const getDarkMode = createSelector(
  (state: StateType) => state.session,
  (session): string => session.darkMode,
);
