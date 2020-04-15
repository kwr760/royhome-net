// @flow

import type { SessionState, UpdateAuthenticationAction } from './types';
import SESSION from './constants';

const defaultSessionState = {
  authenticated: false,
  expiration: 0,
};

const sessionReducer = (
  state: SessionState = defaultSessionState,
  action: UpdateAuthenticationAction,
): SessionState => {
  switch (action.type) {
  case SESSION.UPDATE_AUTHENTICATION:
    return {
      ...state,
      authenticated: action.meta.authenticated,
      expiration: action.meta.expiration,
    };
  default:
    return state;
  }
};

export default sessionReducer;
