import express from 'express';
import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from 'http-status-codes';

import generate from './generate';
import getResumeHandler from './resume/get';
import getPrivateHandler from './private/get';
import getAdminHandler from './admin/get';
import Logger from '../logger';

describe('server/routes/generate', () => {
  describe('generate routes', () => {
    beforeEach(() => {
      Logger.log = jest.fn();
      Logger.error = jest.fn();
    });
    afterEach(() => {
      Logger.log.mockRestore();
      Logger.error.mockRestore();
    });

    it('should generate routes', () => {
      // Arrange
      const mockRouter = {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
      };
      express.Router = jest.fn(() => mockRouter);
      const routes = [
        {
          method: 'get',
          path: '/admin',
          handler: getAdminHandler,
          authenticate: true,
          role: 'admin',
        },
        {
          method: 'post',
          path: '/resume',
          handler: getResumeHandler,
        },
        {
          method: 'put',
          path: '/private',
          handler: getPrivateHandler,
        },
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
    });
  });
  describe('execute route', () => {
    it('get success route', async () => {
      // Arrange
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };
      const mockRouter = {
        get: jest.fn((path, middleware, handler) => { handler({}, res); }),
      };
      express.Router = jest.fn(() => mockRouter);
      const result = { test: 'TEST' };
      const body = { body: result };
      const routes = [
        {
          method: 'get',
          path: '/test',
          handler: () => body,
        },
      ];

      // Act
      const generatedRoutes = await generate(routes);

      // Assert
      expect(generatedRoutes.get).toHaveBeenCalledWith('/test', [], expect.any(Function));
      expect(res.status).toBeCalledWith(OK);
      expect(res.send).toBeCalledWith(result);
    });
    it('post partial success route', async () => {
      // Arrange
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };
      const mockRouter = {
        post: jest.fn((path, middleware, handler) => { handler({}, res); }),
      };
      express.Router = jest.fn(() => mockRouter);
      const result = { test: 'TEST' };
      const body = { status: INTERNAL_SERVER_ERROR, body: result };
      const routes = [
        {
          method: 'post',
          path: '/test',
          handler: () => body,
        },
      ];

      // Act
      const generatedRoutes = await generate(routes);

      // Assert
      expect(generatedRoutes.post).toHaveBeenCalledWith('/test', [], expect.any(Function));
      expect(res.status).toBeCalledWith(INTERNAL_SERVER_ERROR);
      expect(res.send).toBeCalledWith(result);
    });
    it('put throw error', async () => {
      // Arrange
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
        json: jest.fn(),
      };
      const mockRouter = {
        put: jest.fn((path, middleware, handler) => { handler({}, res); }),
      };
      express.Router = jest.fn(() => mockRouter);
      const errMsg = 'Error message';
      const error = {
        msg: errMsg,
        status: UNAUTHORIZED,
      };
      const routes = [
        {
          method: 'put',
          path: '/test',
          handler: () => { throw error; },
        },
      ];
      Logger.error = jest.fn();

      // Act
      const generatedRoutes = await generate(routes);

      // Assert
      expect(generatedRoutes.put).toHaveBeenCalledWith('/test', [], expect.any(Function));
      expect(Logger.error).toBeCalledWith('Unauthorized: Error message');
      expect(res.status).toBeCalledWith(UNAUTHORIZED);
      expect(res.send).not.toBeCalled();
      expect(res.json).toBeCalledWith('Unauthorized: Error message');
    });
    it('put throw error - no status', async () => {
      // Arrange
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
        json: jest.fn(),
      };
      const mockRouter = {
        put: jest.fn((path, middleware, handler) => { handler({}, res); }),
      };
      express.Router = jest.fn(() => mockRouter);
      const error = { };
      const routes = [
        {
          method: 'put',
          path: '/test',
          handler: () => { throw error; },
        },
      ];
      Logger.error = jest.fn();

      // Act
      const generatedRoutes = await generate(routes);

      // Assert
      expect(generatedRoutes.put).toHaveBeenCalledWith('/test', [], expect.any(Function));
      expect(Logger.error).toBeCalledWith('Server Error: ');
      expect(res.status).toBeCalledWith(INTERNAL_SERVER_ERROR);
      expect(res.send).not.toBeCalled();
      expect(res.json).toBeCalledWith('Server Error: ');
    });
  });
});
