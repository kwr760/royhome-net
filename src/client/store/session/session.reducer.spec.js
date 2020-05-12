// @flow

import sessionReducer from './session.reducer';
import SESSION from './constants';

describe('client/store/reducers/session/session.reducer', () => {
  const state = {
    authenticated: false,
    expiration: 10000,
    isLoading: false,
  };

  xit('should return the state for UPDATE_AUTHENTICATION action', () => {
    // Arrange
    const action = {
      type: SESSION.UPDATE_AUTHENTICATION,
      payload: {
        authenticated: true,
        expiration: -1,
      },
    };
    const expectedState = {
      authenticated: true,
      expiration: -1,
      isLoading: false,
    };

    // Act
    const result = sessionReducer(state, action);

    // Assert
    expect(result).toEqual(expectedState);
  });
  xit('should return the state for UPDATE_LOADING action', () => {
    // Arrange
    const action = {
      type: SESSION.UPDATE_LOADING,
      payload: {
        isLoading: true,
      },
    };
    const expectedState = {
      authenticated: false,
      expiration: 10000,
      isLoading: true,
    };

    // Act
    const result = sessionReducer(state, action);

    // Assert
    expect(result).toEqual(expectedState);
  });
});
