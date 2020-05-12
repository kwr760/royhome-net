import populateState from './populate-state';

import { COOKIE_JWT_PAYLOAD, TOKEN_URL } from '../../util/auth0/constants';

describe('server/rendering/populate-state', () => {
  xit('should return an state from empty context', () => {
    // Arrange
    const jwt = {
      exp: 10,
      [TOKEN_URL]: 'test data',
      user: {},
    };
    const req = {
      url: '/resume',
      cookies: {
        [COOKIE_JWT_PAYLOAD]: JSON.stringify(jwt),
      },
    };
    const expected = {
      session: {
        authenticated: true,
        expiration: -1,
        isLoading: false,
      },
      user: {},
    };

    // Act
    const state = populateState(req);

    // Assert
    expect(state).toEqual(expected);
  });
  xit('should not find route', () => {
    // Arrange
    const jwt = {
      exp: 10,
      [TOKEN_URL]: 'test data',
      user: {},
    };
    const req = {
      url: '/ourses',
      cookies: {
        [COOKIE_JWT_PAYLOAD]: JSON.stringify(jwt),
      },
    };
    const expected = {
      session: {
        authenticated: true,
        expiration: -1,
        isLoading: false,
      },
      user: {},
    };

    // Act
    const state = populateState(req);

    // Assert
    expect(state).toEqual(expected);
  });
  xit('should not find payload', () => {
    // Arrange
    const jwt = {
      exp: 10,
      [TOKEN_URL]: 'test data',
      user: {},
    };
    const req = {
      url: '/ourses',
      cookies: {
        nopayload: JSON.stringify(jwt),
      },
    };
    const expected = {
      session: {
        authenticated: false,
        expiration: -1,
        isLoading: false,
      },
      user: {},
    };

    // Act
    const state = populateState(req);

    // Assert
    expect(state).toEqual(expected);
  });
});
