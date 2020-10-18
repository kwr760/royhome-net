import express, { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from 'http-status-codes';

import Logger from '../../../common/server/logger';
import { RouteType } from '../../types/routes.types';
import routeHandler from './route-handler';

jest.mock('express');

describe('server/routes/handler/route-handler', () => {
  beforeEach(() => {
    Logger.error = jest.fn();
  });
  afterEach(() => {
    (Logger.error as jest.Mock).mockRestore();
  });

  it('successful handler', async () => {
    // Arrange
    const req = {};
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    const expectedBody = { test: 'TEST' };
    const apiResponse = {
      status: OK,
      data: expectedBody,
    };
    const mockHandler = jest.fn(() => apiResponse);
    const route: RouteType = {
      method: 'GET',
      path: 'path',
      handler: mockHandler,
    };

    // Act
    await routeHandler(route, req as Request, res as Response);

    // Assert
    expect(route.handler).toHaveBeenCalledWith(req, res);
    expect(res.status).toBeCalledWith(OK);
    expect(res.send).toBeCalledWith(expectedBody);
  });
  it('throw error', async () => {
    // Arrange
    const req = {};
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
      json: jest.fn(),
    };
    const mockRouter = {
      put: jest.fn((path, middleware, handler) => { handler({}, res); }),
    };
    (express.Router as jest.Mock).mockImplementation(() => mockRouter);
    const errMsg = 'Error message';
    const error = {
      msg: errMsg,
      status: UNAUTHORIZED,
    };
    const route = {
      method: 'GET',
      path: 'path',
      handler: () => { throw error; },
    };
    Logger.error = jest.fn();

    // Act
    await routeHandler(route, req as Request, res as Response);

    // Assert
    expect(Logger.error).toBeCalledWith('Unauthorized: Error message');
    expect(res.status).toBeCalledWith(UNAUTHORIZED);
    expect(res.send).not.toBeCalled();
    expect(res.json).toBeCalledWith('Unauthorized: Error message');
  });
  it('throw error - no status', async () => {
    // Arrange
    const req = {};
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
      json: jest.fn(),
    };
    const error = {};
    const route = {
      method: 'GET',
      path: 'path',
      handler: () => { throw error; },
    };
    Logger.error = jest.fn();

    // Act
    await routeHandler(route, req as Request, res as Response);

    // Assert
    expect(Logger.error).toBeCalledWith('Server Error: ');
    expect(res.status).toBeCalledWith(INTERNAL_SERVER_ERROR);
    expect(res.send).not.toBeCalled();
    expect(res.json).toBeCalledWith('Server Error: ');
  });
});
