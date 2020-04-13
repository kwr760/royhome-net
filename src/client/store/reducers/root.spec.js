// @flow

import rootReducer from './root';
import sessionReducer from './session';

describe('client/store/reducers/root', () => {
  it('should call rootReducer', () => {
    // Arrange
    // Act
    const reducerCount = Object.keys(rootReducer).length;

    // Assert
    expect(rootReducer).toEqual({
      session: sessionReducer,
    });
    expect(reducerCount).toBe(1);
  });
});
