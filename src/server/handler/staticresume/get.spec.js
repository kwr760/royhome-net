import { OK } from 'http-status-codes';
import getResumeHandler from './get';

describe('server/routes/staticresume/get', () => {
  it('should return default response', () => {
    // Arrange
    const req = {};
    const res = {};
    const expected = {
      status: OK,
      body: {
        message: 'Return to my staticresume!',
      },
    };

    // Act
    const response = getResumeHandler(req, res);

    // Assert
    expect(response).toEqual(expected);
  });
});
