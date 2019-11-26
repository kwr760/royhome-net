import { OK } from 'http-status-codes';
import getResumeHandler from './get';

describe('server/routes/resume/get', () => {
  it('should return default response', () => {
    // Arrange
    const req = {};
    const res = {};
    const expected = {
      status: OK,
      body: {
        message: 'Return to my resume!',
      },
    };

    // Act
    const response = getResumeHandler(req, res);

    // Assert
    expect(response).toEqual(expected);
  });
});
