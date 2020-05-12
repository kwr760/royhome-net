// @flow

import rootReducer from './root.reducer';
import sessionReducer from './session/session.reducer';
import userReducer from './user/user.reducer';

describe('client/store/reducers/root', () => {
  xit('should call rootReducer', () => {
    // Arrange
    // Act
    const reducerCount = Object.keys(rootReducer).length;

    // Assert
    expect(rootReducer).toEqual({
      session: sessionReducer,
      user: userReducer,
    });
    expect(reducerCount).toBe(2);
  });
});
