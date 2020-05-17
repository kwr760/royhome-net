// @flow

export const SESSION_ACTION = {
  UPDATE_AUTHENTICATION: 'UPDATE_AUTHENTICATION',
  UPDATE_LOADING: 'UPDATE_LOADING',
};

export const defaultSessionState = {
  authenticated: false,
  expiration: 0,
  isLoading: false,
};
