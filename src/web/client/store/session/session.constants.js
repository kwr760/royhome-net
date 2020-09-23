// @flow

export const DarkModes = {
  CLEAR_MODE: 'clear-mode',
  DARK_MODE: 'dark-mode',
  LIGHT_MODE: 'light-mode',
};

export const SessionActions = {
  UPDATE_AUTHENTICATION: 'UPDATE_AUTHENTICATION',
  UPDATE_LOADING: 'UPDATE_LOADING',
  UPDATE_DARKMODE: 'UPDATE_DARKMODE',
};

export const defaultSessionState = {
  authenticated: false,
  expiration: 0,
  isLoading: false,
  darkMode: DarkModes.CLEAR_MODE,
};
