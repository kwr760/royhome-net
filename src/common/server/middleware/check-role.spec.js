import { UNAUTHORIZED } from 'http-status-codes';

import { TOKEN_URL } from '../../util/auth0/role.constants';
import checkRole from './check-role';

describe('server/middleware/check-role', () => {
  it('should return error if no role', () => {
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
  it('should continue if owner', () => {
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
