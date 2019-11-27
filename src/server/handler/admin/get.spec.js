import { OK } from 'http-status-codes';
import getAdminHandler from './get';

describe('server/routes/admin/get', () => {
  it('should return default response', () => {
    // Arrange
    const req = {};
    const res = {};
    const expected = {
      status: OK,
      body: {
        message: 'Hello to an admin!',
      },
    };

    // Act
    const response = getAdminHandler(req, res);

    // Assert
    expect(response).toEqual(expected);
  });
});
