import { createSelector } from 'reselect';
import { StateType } from '../../../types/state.types';
import { DarkModes } from './session.constants';

export const isAuthenticated = createSelector(
  (state: StateType) => state.session,
  (session): boolean => session.authenticated || false,
);

export const isLoading = createSelector(
  (state: StateType) => state.session,
  (session): boolean => session.isLoading || false,
);

export const getDarkMode = createSelector(
  (state: StateType) => state.session,
  (session): string => session.darkMode || DarkModes.CLEAR_MODE,
);
