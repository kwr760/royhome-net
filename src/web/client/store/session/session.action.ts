import { SessionActions } from './session.constants';
import { SessionActionType } from '../../../types/session.types';

export const updateAuthentication = (authenticated: boolean, expiration: number): SessionActionType => ({
  type: SessionActions.UPDATE_AUTHENTICATION,
  payload: {
    authenticated,
    expiration,
  },
});

export const updateLoading = (isLoading: boolean): SessionActionType => ({
  type: SessionActions.UPDATE_LOADING,
  payload: {
    isLoading,
  },
});

export const updateDarkMode = (darkMode: string): SessionActionType => ({
  type: SessionActions.UPDATE_DARKMODE,
  payload: {
    darkMode,
  },
});