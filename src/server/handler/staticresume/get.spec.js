import { OK } from 'http-status-codes';
import getStaticResumeHandler from './get';

describe('server/routes/staticresume/get', () => {
  xit('should return default response', () => {
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
    const response = getStaticResumeHandler(req, res);

    // Assert
    expect(response).toEqual(expected);
  });
});
