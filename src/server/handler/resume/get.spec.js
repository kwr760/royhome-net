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
        resume: [
          {
            id: 1,
            title: 'Building Apps with React and Redux',
          },
          {
            id: 2,
            title: 'Creating Reusable React Components',
          },
        ],
      },
    };

    // Act
    const response = getResumeHandler(req, res);

    // Assert
    expect(response).toEqual(expected);
  });
});
