import {
  COOKIE_JWT_PAYLOAD,
} from './auth0.constants';

describe('util/auth0/constants', () => {
  it('should provide constants', () => {
    // Arrange/Act
    const expectedCookieJwtPayload = 'jwtPayload';

    // Assert
    expect(COOKIE_JWT_PAYLOAD).toEqual(expectedCookieJwtPayload);
  });
});
