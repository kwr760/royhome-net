import { NOT_FOUND } from 'http-status-codes';

import notFound from './not-found';

describe('server/middleware/not-found', () => {
  beforeEach(() => {
    global.console.error = jest.fn();
  });
  afterEach(() => {
    global.console.error.mockRestore();
  });

  it('should return a status when called', () => {
    // Arrange
    const req = jest.fn();
    const res = {
      sendStatus: jest.fn(),
    };

    // Ar
    notFound(req, res);

    // Assert
    expect(res.sendStatus).toHaveBeenCalledWith(NOT_FOUND);
    expect(console.error).toHaveBeenCalledWith('Endpoint was not found');
  });
});
