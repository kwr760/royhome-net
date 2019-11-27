import { OK } from 'http-status-codes';
import getPrivateHandler from './get';

describe('server/routes/private/get', () => {
  it('should return default response', () => {
    // Arrange
    const req = {};
    const res = {};
    const expected = {
      status: OK,
      body: {
        message: 'Hello from a private API!',
      },
    };

    // Act
    const response = getPrivateHandler(req, res);

    // Assert
    expect(response).toEqual(expected);
  });
});
