// @flow

import sessionReducer from './index';

describe('client/store/reducers/session/index', () => {
  const state = {
    session: {
      type: 'name',
    },
  };

  it('should return the default state', () => {
    // Arrange
    const action = {
      type: 'default',
    };

    // Act
    const result = sessionReducer(state, action);

    // Assert
    expect(result).toEqual(state);
  });
  it('should return the state for EMPTY action', () => {
    // Arrange
    const action = {
      type: 'EMPTY',
    };

    // Act
    const result = sessionReducer(state, action);

    // Assert
    expect(result).toEqual(state);
  });
});
