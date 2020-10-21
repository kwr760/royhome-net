import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

import handleError from './handle-error';
import Logger from '../logger';

describe('server/middleware/handle-error', () => {
  beforeEach(() => {
    Logger.error = jest.fn();
  });
  afterEach(() => {
    (Logger.error as jest.Mock).mockRestore();
  });

  it('should return a status when called', () => {
    // Arrange
    const err = {
      message: 'Test message',
    } as Error;
    const req = {} as Request;
    const res = {
      sendStatus: jest.fn(),
    } as unknown as Response;

    // Ar
    handleError(err, req, res);

    // Assert
    expect(res.sendStatus).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
    expect(Logger.error).toHaveBeenCalledWith('Test message');
  });
});
