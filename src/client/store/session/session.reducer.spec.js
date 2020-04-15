// @flow

import sessionReducer from './session.reducer';
import SESSION from './constants';

describe('client/store/reducers/session/index', () => {
  const state = {
    authenticated: false,
    expiration: 10000,
  };

  it('should return the default state', () => {
    // Arrange
    const action = {
      type: 'default',
      meta: {
        authenticated: true,
        expiration: -1,
      },
    };

    // Act
    const result = sessionReducer(state, action);

    // Assert
    expect(result).toEqual(state);
  });
  it('should return the state for EMPTY action', () => {
    // Arrange
    const action = {
      type: SESSION.UPDATE_AUTHENTICATION,
      meta: {
        authenticated: true,
        expiration: -1,
      },
    };
    const expectedState = {
      authenticated: true,
      expiration: -1,
    };

    // Act
    const result = sessionReducer(state, action);

    // Assert
    expect(result).toEqual(expectedState);
  });
});
