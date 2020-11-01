import { useSelector } from 'react-redux';

import { getUser } from './user.selector';

jest.mock('react-redux');

describe('client/store/user/user.selector', () => {
  it('should return user', () => {
    // Arrange
    const expectedUser = {
      name: 'Test',
      email: 'email@mail.com',
    };
    const mockState = {
      user: expectedUser,
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const user = useSelector(getUser);

    // Assert
    expect(user).toEqual(expectedUser);
  });
});
