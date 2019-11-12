import getPrivateHandler from './get';

describe('server/routes/private/get', () => {
  it('should return default response', () => {
    // Arrange
    const req = {};
    const res = {
      json: jest.fn(),
    };
    const expected = {
      message: 'Hello from a private API!',
    };

    // Act
    getPrivateHandler(req, res);

    // Assert
    expect(res.json).toBeCalledWith(expected);
  });
});
