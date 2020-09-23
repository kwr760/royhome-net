// @flow

import type { SessionActionType, SessionStateType } from './session.types';
import { defaultSessionState, SessionActions } from './session.constants';

export const sessionReducer = (
  state: SessionStateType = defaultSessionState,
  action: SessionActionType,
): SessionStateType => {
  switch (action.type) {
  case SessionActions.UPDATE_AUTHENTICATION:
    return {
      ...state,
      authenticated: action.payload.authenticated,
      expiration: action.payload.expiration,
    };
  case SessionActions.UPDATE_LOADING:
    return {
      ...state,
      isLoading: (action.payload.isLoading: boolean),
    };
  case SessionActions.UPDATE_DARKMODE:
    return {
      ...state,
      darkMode: (action.payload.darkMode: string),
    };
  // no default
  }

  return state;
};
