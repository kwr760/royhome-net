import express from 'express';
import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from 'http-status-codes';

import routeHandler from './route-handler';
import Logger from '../logger';

describe('server/routes/handler/route-handler', () => {
  beforeEach(() => {
    Logger.error = jest.fn();
  });
  afterEach(() => {
    Logger.error.mockRestore();
  });

  it('successful handler', async () => {
    // Arrange
    const req = {};
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    const expectedBody = { test: 'TEST' };
    const body = { body: expectedBody };
    const route = {
      handler: jest.fn(() => body),
    };

    // Act
    await routeHandler(route, req, res);

    // Assert
    expect(route.handler).toHaveBeenCalledWith(req, res);
    expect(res.status).toBeCalledWith(OK);
    expect(res.send).toBeCalledWith(expectedBody);
  });
  it('partial success route', async () => {
    // Arrange
    const req = {};
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    const expectedBody = { test: 'TEST' };
    const body = { status: INTERNAL_SERVER_ERROR, body: expectedBody };
    const route = { handler: jest.fn(() => body) };

    // Act
    await routeHandler(route, req, res);

    // Assert
    expect(route.handler).toHaveBeenCalledWith(req, res);
    expect(res.status).toBeCalledWith(INTERNAL_SERVER_ERROR);
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
    express.Router = jest.fn(() => mockRouter);
    const errMsg = 'Error message';
    const error = {
      msg: errMsg,
      status: UNAUTHORIZED,
    };
    const route = { handler: () => { throw error; } };
    Logger.error = jest.fn();

    // Act
    await routeHandler(route, req, res);

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
    const route = { handler: () => { throw error; } };
    Logger.error = jest.fn();

    // Act
    await routeHandler(route, req, res);

    // Assert
    expect(Logger.error).toBeCalledWith('Server Error: ');
    expect(res.status).toBeCalledWith(INTERNAL_SERVER_ERROR);
    expect(res.send).not.toBeCalled();
    expect(res.json).toBeCalledWith('Server Error: ');
  });
});
