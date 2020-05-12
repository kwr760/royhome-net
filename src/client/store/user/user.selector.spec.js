import { useSelector } from 'react-redux';

import { getUser } from './user.selector';

jest.mock('react-redux');

describe('client/store/user/user.selector', () => {
  xit('should return user', () => {
    // Arrange
    const expectedUser = {
      name: 'Test',
      email: 'email@mail.com',
    };
    const mockState = {
      user: expectedUser,
    };
    useSelector.mockImplementation((callback) => callback(mockState));

    // Act
    const user = useSelector((state) => getUser(state, null));

    // Assert
    expect(user).toEqual(expectedUser);
  });
});
