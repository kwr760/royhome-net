import { UNAUTHORIZED } from 'http-status-codes';

import checkRole from './check-role';

describe('server/middleware/check-role', () => {
  it('should set status on response if no role', () => {
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
        'http://royhome.net': {
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
  it('should continue if in list', () => {
    // Arrange
    const req = {
      user: {
        'http://royhome.net': {
          role: 'admin engineer',
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
