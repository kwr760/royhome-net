import express from 'express';

import generate from './generate';
import Logger from '../logger';
import handleRoute from '../handler/handle-route';

jest.mock('../handler/handle-route');
describe('server/routes/generate', () => {
  beforeEach(() => {
    Logger.log = jest.fn();
    Logger.error = jest.fn();
  });
  afterEach(() => {
    Logger.log.mockRestore();
    Logger.error.mockRestore();
  });

  describe('generate routes', () => {
    it('should generate routes', () => {
      // Arrange
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };
      const mockRouter = {
        get: jest.fn((path, middleware, handler) => { handler({}, res); }),
        post: jest.fn((path, middleware, handler) => { handler({}, res); }),
        put: jest.fn((path, middleware, handler) => { handler({}, res); }),
      };
      const mockHandler = jest.fn();
      handleRoute.mockImplementation((route) => { route.handler(); });
      express.Router = jest.fn(() => mockRouter);
      const getRoute = {
        method: 'get',
        path: '/admin',
        handler: () => mockHandler(),
        authenticate: true,
        role: 'admin',
      };
      const putRoute = {
        method: 'put',
        path: '/private',
        handler: () => mockHandler(),
      };
      const postRoute = {
        method: 'post',
        path: '/resume',
        handler: () => mockHandler(),
      };
      const routes = [
        getRoute,
        postRoute,
        putRoute,
        {
          method: 'bad',
        },
      ];

      // Act
      const generatedRoutes = generate(routes);

      // Assert
      expect(generatedRoutes.get).toHaveBeenCalledWith('/admin', [expect.any(Function), expect.any(Function)], expect.any(Function));
      expect(generatedRoutes.post).toHaveBeenCalledWith('/resume', [], expect.any(Function));
      expect(generatedRoutes.put).toHaveBeenCalledWith('/private', [], expect.any(Function));
      expect(Logger.error).toHaveBeenCalledWith('Unknown route: {"method":"bad"}');
      expect(handleRoute).toHaveBeenCalledWith(getRoute, {}, res);
      expect(handleRoute).toHaveBeenCalledWith(postRoute, {}, res);
      expect(handleRoute).toHaveBeenCalledWith(putRoute, {}, res);
      expect(mockHandler).toHaveBeenCalledTimes(3);
    });
  });
});
