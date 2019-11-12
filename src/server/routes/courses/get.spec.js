import getCoursesHandler from './get';

describe('server/routes/courses/get', () => {
  it('should return default response', () => {
    // Arrange
    const req = {};
    const res = {
      json: jest.fn(),
    };
    const expected = {
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
    };

    // Act
    getCoursesHandler(req, res);

    // Assert
    expect(res.json).toBeCalledWith(expected);
  });
});
