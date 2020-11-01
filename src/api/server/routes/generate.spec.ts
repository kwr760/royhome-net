import express, { Response } from 'express';

import Logger from '../../../common/server/logger';
import generate from './generate';
import routeHandler from '../handler/route-handler';

jest.mock('../handler/route-handler');
jest.mock('express');

describe('server/routes/generate', () => {
  beforeEach(() => {
    Logger.log = jest.fn();
    Logger.error = jest.fn();
  });
  afterEach(() => {
    (Logger.log as jest.Mock).mockRestore();
    (Logger.error as jest.Mock).mockRestore();
  });

  describe('generate routes', () => {
    it('should generate routes', () => {
      // Arrange
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      } as unknown as Response;
      const mockRouter = {
        get: jest.fn((_path, _middleware, handler) => { handler({}, res); }),
        post: jest.fn((_path, _middleware, handler) => { handler({}, res); }),
        put: jest.fn((_path, _middleware, handler) => { handler({}, res); }),
      };
      const mockHandler = jest.fn();
      (routeHandler as jest.Mock).mockImplementation((route) => { route.handler(); });
      (express.Router as jest.Mock).mockImplementation(() => mockRouter);
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
        path: '/staticresume',
        handler: () => mockHandler(),
      };
      const routes = [
        getRoute,
        postRoute,
        putRoute,
        {
          method: 'bad',
          path: '/wrong/url',
          handler: () => mockHandler(),
        },
      ];

      // Act
      const generatedRoutes = generate(routes);

      // Assert
      expect(generatedRoutes.get).toHaveBeenCalledWith(
        '/admin',
        [expect.any(Function), expect.any(Function)],
        expect.any(Function),
      );
      expect(generatedRoutes.post).toHaveBeenCalledWith('/staticresume', [], expect.any(Function));
      expect(generatedRoutes.put).toHaveBeenCalledWith('/private', [], expect.any(Function));
      expect(Logger.error).toHaveBeenCalledWith('Unknown route: {"method":"bad","path":"/wrong/url"}');
      expect(routeHandler).toHaveBeenCalledWith(getRoute, {}, res);
      expect(routeHandler).toHaveBeenCalledWith(postRoute, {}, res);
      expect(routeHandler).toHaveBeenCalledWith(putRoute, {}, res);
      expect(mockHandler).toHaveBeenCalledTimes(3);
    });
  });
});
