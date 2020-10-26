import userReducer, { updateUser } from './user.slice';

describe('client/store/user/user.slice', () => {
  it('should create reducer with initial state', () => {
    // Arrange
    const expected = {};

    // Act
    const result = userReducer(undefined, updateUser);

    // Assert
    expect(result).toEqual(expected);
  });
});
