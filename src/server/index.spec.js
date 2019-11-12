import express from 'express';
import allowCrossDomain from './middleware/allow-cross-domain';

jest.mock('express');
jest.mock('./routes');

describe('server/index', () => {
  const mockExpress = {
    set: jest.fn(),
    use: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    listen: jest.fn(),
  };

  function setupMockModules(callback) {
    jest.isolateModules(() => {
      callback();
    });
  }

  beforeEach(() => {
    express.mockReturnValue(mockExpress);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start server', () => {
    // Arrange

    // Act
    setupMockModules(() => {
      require('./index');
    });

    // Assert
    expect(mockExpress.use).toHaveBeenCalledTimes(4);
    expect(mockExpress.use).toHaveBeenCalledWith(allowCrossDomain);
    expect(mockExpress.use).toHaveBeenCalledWith('/', undefined);
    expect(mockExpress.use).toHaveBeenCalledWith('/callback', undefined);

    expect(mockExpress.listen).toHaveBeenCalledTimes(1);
    expect(mockExpress.listen).toHaveBeenCalledWith(9100);
  });
});
