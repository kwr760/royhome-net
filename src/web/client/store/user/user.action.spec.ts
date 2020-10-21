import { updateUser } from './user.action';
import { UserActions } from './user.constants';

describe('client/store/user/user.action', () => {
  it('should create an action to update user', () => {
    // Arrange
    const expectedUser = {
      name: 'Test',
      email: 'email@mail.com',
    };
    const expectedAction = {
      type: UserActions.UPDATE_USER,
      payload: {
        user: expectedUser,
      },
    };

    // Act
    const action = updateUser(expectedUser);

    // Assert
    expect(action).toEqual(expectedAction);
  });
});
