import getAdminHandler from './get';

describe('server/routes/admin/get', () => {
  it('should return default response', () => {
    // Arrange
    const req = {};
    const res = {
      json: jest.fn(),
    };
    const expected = {
      message: 'Hello to an admin!',
    };

    // Act
    getAdminHandler(req, res);

    // Assert
    expect(res.json).toBeCalledWith(expected);
  });
});
