import { COOKIE_JWT_PAYLOAD, TOKEN_URL } from '@src/util/auth0/auth0.constants';

import populateState from './populate-state';
import { loadResumeByEmail } from '../db/resume';

jest.mock('../db/resume');

describe('server/rendering/populate-state', () => {
  const jwt = {
    exp: 10,
    [TOKEN_URL]: 'test data',
    user: {},
  };
  const email = 'kroy760@gmail.com';
  const resume = {
    owner: 'owner',
  };
  it('should return an state from empty context', async () => {
    // Arrange
    const req = {
      url: '/',
      cookies: {
        [COOKIE_JWT_PAYLOAD]: JSON.stringify(jwt),
      },
    };
    loadResumeByEmail.mockResolvedValueOnce(resume);
    const expected = {
      session: {
        authenticated: true,
        expiration: -1,
        isLoading: false,
      },
      user: {},
      resume: {
        activeResume: email,
        [email]: resume,
      },
    };

    // Act
    const state = await populateState(req);

    // Assert
    expect(state).toEqual(expected);
  });
  it('should not find route', async () => {
    // Arrange
    const req = {
      url: '/ourses',
      cookies: {
        [COOKIE_JWT_PAYLOAD]: JSON.stringify(jwt),
      },
    };
    loadResumeByEmail.mockResolvedValueOnce(resume);
    const expected = {
      session: {
        authenticated: true,
        expiration: -1,
        isLoading: false,
      },
      user: {},
    };

    // Act
    const state = await populateState(req);

    // Assert
    expect(state).toEqual(expected);
  });
  it('should not find payload', async () => {
    // Arrange
    const req = {
      url: '/',
      cookies: {
        nopayload: JSON.stringify(jwt),
      },
    };
    loadResumeByEmail.mockResolvedValueOnce({});
    const expected = {
      session: {
        authenticated: false,
        expiration: -1,
        isLoading: false,
      },
      user: {},
      resume: {
        activeResume: email,
        [email]: resume,
      },
    };

    // Act
    const state = await populateState(req);

    // Assert
    expect(state).toEqual(expected);
  });
});
