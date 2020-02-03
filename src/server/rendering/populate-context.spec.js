import populateContext from './populate-context';
import { COOKIE_JWT_PAYLOAD, TOKEN_URL } from '../../util/auth0/constants';

describe('server/rendering/populate-context', () => {
  it('should return an context', () => {
    // Arrange
    const jwt = {
      exp: 10,
      [TOKEN_URL]: 'test data',
    };
    const req = {
      url: '/private',
      cookies: {
        [COOKIE_JWT_PAYLOAD]: JSON.stringify(jwt),
      },
    };
    const expected = {
      data: {
        field: 'test value',
      },
      jwt: {
        expiresAt: 10000,
        data: 'test data',
      },
    };

    // Act
    const context = populateContext(req);

    // Assert
    expect(context).toEqual(expected);
  });

  it('should not find route', () => {
    // Arrange
    const req = {
      url: '/privte',
      cookies: {},
    };
    const expected = {
      data: {},
      jwt: {
        expiresAt: NaN,
        data: undefined,
      },
    };

    // Act
    const context = populateContext(req);

    // Assert
    expect(context).toEqual(expected);
  });
});