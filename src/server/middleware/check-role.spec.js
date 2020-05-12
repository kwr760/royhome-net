import { UNAUTHORIZED } from 'http-status-codes';

import checkRole from './check-role';
import { TOKEN_URL } from '../../util/auth0/constants';

describe('server/middleware/check-role', () => {
  xit('should return error if no role', () => {
    // Arrange
    const req = {};
    const res = {
      sendStatus: jest.fn(),
    };
    const next = jest.fn();

    // Act
    checkRole('bogus')(req, res, next);

    // Assert
    expect(res.sendStatus).toHaveBeenCalledWith(UNAUTHORIZED);
  });
  xit('should continue if owner', () => {
    // Arrange
    const req = {
      user: {
        [TOKEN_URL]: {
          role: 'owner',
        },
      },
    };
    const res = {
      sendStatus: jest.fn(),
    };
    const next = jest.fn();

    // Act
    checkRole('engineer')(req, res, next);

    // Assert
    expect(next).toHaveBeenCalled();
    expect(res.sendStatus).not.toHaveBeenCalled();
  });
});
