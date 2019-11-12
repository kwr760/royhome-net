import getResumeHandler from './get';

describe('server/routes/resume/get', () => {
  it('should return default response', () => {
    // Arrange
    const req = {};
    const res = {
      json: jest.fn(),
    };
    const expected = {
      message: 'Return to my resume!',
    };

    // Act
    getResumeHandler(req, res);

    // Assert
    expect(res.json).toBeCalledWith(expected);
  });
});
