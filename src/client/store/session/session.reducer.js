// @flow

import type { SessionStateType, SessionActionType } from './types';
import SESSION from './constants';

const defaultSessionState = {
  authenticated: false,
  expiration: 0,
  isLoading: false,
};

const sessionReducer = (
  state: SessionStateType = defaultSessionState,
  action: SessionActionType,
): SessionStateType => {
  switch (action.type) {
  case SESSION.UPDATE_AUTHENTICATION:
    return {
      ...state,
      authenticated: action.payload.authenticated,
      expiration: action.payload.expiration,
    };
  case SESSION.UPDATE_LOADING:
    return {
      ...state,
      isLoading: (action.payload.isLoading: boolean),
    };
  default:
    return state;
  }
};

export default sessionReducer;
