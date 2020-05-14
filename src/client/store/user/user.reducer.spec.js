// @flow

import userReducer from './user.reducer';
import USER from './user.constants';

describe('client/store/reducers/user/user.reducer', () => {
  it('should return the state for UPDATE_USER action', () => {
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
