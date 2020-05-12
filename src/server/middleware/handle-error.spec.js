import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

import handleError from './handle-error';
import Logger from '../logger';

describe('server/middleware/handle-error', () => {
  beforeEach(() => {
    Logger.error = jest.fn();
  });
  afterEach(() => {
    Logger.error.mockRestore();
  });

  it('should return a status when called', () => {
    // Arrange
    const err = {
      message: 'Test message',
    };
    const req = jest.fn();
    const res = {
      sendStatus: jest.fn(),
    };
    const next = jest.fn();

    // Ar
    handleError(err, req, res, next);

    // Assert
    expect(res.sendStatus).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
    expect(Logger.error).toHaveBeenCalledWith('Test message');
  });
});
