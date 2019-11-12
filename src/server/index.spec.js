import _ from 'lodash';
import express from 'express';

jest.mock('express');

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
    expect(mockExpress.get).toHaveBeenCalledTimes(4);
    expect(mockExpress.get).toHaveBeenCalledWith('/api/resume', expect.any(Function));
    expect(mockExpress.get).toHaveBeenCalledWith('/api/private', expect.any(Function), expect.any(Function));
    expect(mockExpress.get).toHaveBeenCalledWith('/api/courses', expect.any(Function), expect.any(Function), expect.any(Function));
    expect(mockExpress.get).toHaveBeenCalledWith('/api/admin', expect.any(Function), expect.any(Function), expect.any(Function));

    expect(mockExpress.use).toHaveBeenCalledTimes(3);
    expect(mockExpress.use).toHaveBeenCalledWith(expect.any(Function));
    expect(mockExpress.use).toHaveBeenCalledWith('/', undefined);
    expect(mockExpress.use).toHaveBeenCalledWith('/callback', undefined);

    expect(mockExpress.listen).toHaveBeenCalledTimes(1);
    expect(mockExpress.listen).toHaveBeenCalledWith(9100);
  });
});
