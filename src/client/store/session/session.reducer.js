// @flow

import type { SessionStateType, UpdateAuthenticationActionType } from './types';
import SESSION from './constants';

const defaultSessionState = {
  authenticated: false,
  expiration: 0,
};

const sessionReducer = (
  state: SessionStateType = defaultSessionState,
  action: UpdateAuthenticationActionType,
): SessionStateType => {
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
