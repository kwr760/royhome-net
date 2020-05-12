import { NOT_FOUND } from 'http-status-codes';

import notFound from './not-found';
import Logger from '../logger';

describe('server/middleware/not-found', () => {
  beforeEach(() => {
    Logger.error = jest.fn();
  });
  afterEach(() => {
    Logger.error.mockRestore();
  });

  xit('should return a status when called', () => {
    // Arrange
    const req = jest.fn();
    const res = {
      sendStatus: jest.fn(),
    };

    // Ar
    notFound(req, res);

    // Assert
    expect(res.sendStatus).toHaveBeenCalledWith(NOT_FOUND);
    expect(Logger.error).toHaveBeenCalledWith('Endpoint was not found');
  });
});
