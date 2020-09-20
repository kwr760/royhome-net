// @flow

import type { Action } from 'redux';

import { SessionActions } from './session.constants';

export const updateAuthentication = (authenticated: boolean, expiration: number): Action<string> => ({
  type: SessionActions.UPDATE_AUTHENTICATION,
  payload: {
    authenticated,
    expiration,
  },
});

export const updateLoading = (isLoading: boolean): Action<string> => ({
  type: SessionActions.UPDATE_LOADING,
  payload: {
    isLoading,
  },
});

export const updateDarkMode = (darkMode: string): Action<string> => ({
  type: SessionActions.UPDATE_DARKMODE,
  payload: {
    darkMode,
  },
});
