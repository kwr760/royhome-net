import { Request, Response } from 'express';
import { NOT_FOUND } from 'http-status-codes';

import notFound from './not-found';
import Logger from '../logger';

describe('server/middleware/not-found', () => {
  beforeEach(() => {
    Logger.error = jest.fn();
  });
  afterEach(() => {
    (Logger.error as jest.Mock).mockRestore();
  });

  it('should return a status when called', () => {
    // Arrange
    const req = {} as Request;
    const res = {
      sendStatus: jest.fn(),
    } as unknown as Response;

    // Ar
    notFound(req, res);

    // Assert
    expect(res.sendStatus).toHaveBeenCalledWith(NOT_FOUND);
    expect(Logger.error).toHaveBeenCalledWith('Endpoint was not found');
  });
});
