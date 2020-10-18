import { SessionActionType } from '../../../types/session.types';
import { sessionReducer } from './session.reducer';
import { DarkModes, SessionActions } from './session.constants';

describe('client/store/reducers/session/session.reducer', () => {
  const state = {
    authenticated: false,
    expiration: 10000,
    isLoading: false,
    darkMode: 'dark-mode',
  };

  it('should return the state for UPDATE_AUTHENTICATION action', () => {
    // Arrange
    const action = {
      type: SessionActions.UPDATE_AUTHENTICATION,
      payload: {
        authenticated: true,
        expiration: -1,
      },
    };
    const expectedState = {
      authenticated: true,
      expiration: -1,
      isLoading: false,
      darkMode: 'dark-mode',
    };

    // Act
    const result = sessionReducer(state, action);

    // Assert
    expect(result).toEqual(expectedState);
  });
  it('should return the state for UPDATE_LOADING action', () => {
    // Arrange
    const action = {
      type: SessionActions.UPDATE_LOADING,
      payload: {
        isLoading: true,
      },
    };
    const expectedState = {
      authenticated: false,
      expiration: 10000,
      isLoading: true,
      darkMode: 'dark-mode',
    };

    // Act
    const result = sessionReducer(state, action);

    // Assert
    expect(result).toEqual(expectedState);
  });
  it('should return the state for UPDATE_DARKMODE action', () => {
    // Arrange
    const action: SessionActionType = {
      type: SessionActions.UPDATE_DARKMODE,
      payload: {
        darkMode: DarkModes.DARK_MODE,
      },
    };
    const expectedState = {
      authenticated: false,
      expiration: 10000,
      isLoading: false,
      darkMode: DarkModes.DARK_MODE,
    };

    // Act
    const result = sessionReducer(state, action);

    // Assert
    expect(result).toEqual(expectedState);
  });
});
