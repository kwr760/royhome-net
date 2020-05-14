// @flow

import type { Action } from 'redux';

import SESSION from './session.constants';

export const updateAuthentication = (authenticated: boolean, expiration: number): Action<string> => ({
  type: SESSION.UPDATE_AUTHENTICATION,
  payload: {
    authenticated,
    expiration,
  },
});

export const updateLoading = (isLoading: boolean): Action<string> => ({
  type: SESSION.UPDATE_LOADING,
  payload: {
    isLoading,
  },
});
