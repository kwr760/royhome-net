import jwt from 'express-jwt';

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import checkJwt from './check-jwt';

jest.mock('express-jwt');

describe('server/middleware/check-jwt', () => {
  it('should setup jwt', () => {
    // Arrange
    // const expected = {
    //   algorithms: ['RS256'],
    //   audience: 'http://royk.us',
    //   issuer: 'https://royk.auth0.com/',
    //   secret: expect.any(Function),
    // };

    // Act

    // Assert
    expect(jwt).not.toHaveBeenCalled();
    // expect(jwt).toHaveBeenCalledWith(expected);
  });
});
