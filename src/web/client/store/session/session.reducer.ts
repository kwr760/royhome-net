import { SessionActionType } from '../../../types/action.types';
import { SessionStateType } from '../../../types/state.types';
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
      isLoading: action.payload.isLoading,
    };
  case SessionActions.UPDATE_DARKMODE:
    return {
      ...state,
      darkMode: action.payload.darkMode,
    };
  // no default
  }

  return state;
};
