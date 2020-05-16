// @flow

import type { SessionActionType, SessionStateType } from './session.types';
import { defaultSessionState, SESSION_ACTION } from './session.constants';

export const sessionReducer = (
  state: SessionStateType = defaultSessionState,
  action: SessionActionType,
): SessionStateType => {
  switch (action.type) {
  case SESSION_ACTION.UPDATE_AUTHENTICATION:
    return {
      ...state,
      authenticated: action.payload.authenticated,
      expiration: action.payload.expiration,
    };
  case SESSION_ACTION.UPDATE_LOADING:
    return {
      ...state,
      isLoading: (action.payload.isLoading: boolean),
    };
  // no default
  }

  return state;
};
