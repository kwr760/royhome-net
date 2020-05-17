// @flow

import type { Action } from 'redux';

import { SESSION_ACTION } from './session.constants';

export const updateAuthentication = (authenticated: boolean, expiration: number): Action<string> => ({
  type: SESSION_ACTION.UPDATE_AUTHENTICATION,
  payload: {
    authenticated,
    expiration,
  },
});

export const updateLoading = (isLoading: boolean): Action<string> => ({
  type: SESSION_ACTION.UPDATE_LOADING,
  payload: {
    isLoading,
  },
});
