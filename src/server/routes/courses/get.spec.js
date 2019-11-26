import { OK } from 'http-status-codes';
import getCoursesHandler from './get';

describe('server/routes/courses/get', () => {
  it('should return default response', () => {
    // Arrange
    const req = {};
    const res = {};
    const expected = {
      status: OK,
      body: {
        courses: [
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
    const response = getCoursesHandler(req, res);

    // Assert
    expect(response).toEqual(expected);
  });
});
