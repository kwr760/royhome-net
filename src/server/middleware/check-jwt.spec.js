import jwt from 'express-jwt';

// eslint-disable-next-line no-unused-vars
import checkJwt from './check-jwt';

jest.mock('express-jwt');

describe('server/middleware/check-jwt', () => {
  xit('should setup jwt', () => {
    // Arrange
    const expected = {
      algorithms: ['RS256'],
      audience: 'http://royk.us',
      issuer: 'https://royk.auth0.com/',
      secret: expect.any(Function),
    };

    // Act

    // Assert
    expect(jwt).toHaveBeenCalled();
    expect(jwt).toHaveBeenCalledWith(expected);
  });
});
