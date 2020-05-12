// @flow

import userReducer from './user.reducer';
import USER from './constants';

describe('client/store/reducers/user/user.reducer', () => {
  xit('should return the state for UPDATE_USER action', () => {
    // Arrange
    const user = {
      name: 'Test',
      email: 'email@mail.com',
    };
    const action = {
      type: USER.UPDATE_USER,
      payload: {
        user,
      },
    };
    const state = {
    };
    const expectedState = {
      ...user,
    };

    // Act
    const result = userReducer(state, action);

    // Assert
    expect(result).toEqual(expectedState);
  });
});
