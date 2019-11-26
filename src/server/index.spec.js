/* eslint-disable global-require */
import express from 'express';
import http from 'http';
import https from 'https';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';

import env from '../config';

import handleError from './middleware/handle-error';
import notFound from './middleware/not-found';
import redirectInsecure from './middleware/redirect-insecure';

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));
jest.mock('express');
jest.mock('cors');
jest.mock('helmet');
jest.mock('compression');
jest.mock('body-parser', () => ({
  json: jest.fn(),
  urlencoded: jest.fn(),
}));
jest.mock('cookie-parser');
jest.mock('express-http-context');
jest.mock('./routes');
jest.mock('../config');

describe('server/index', () => {
  const mockExpress = {
    set: jest.fn(),
    use: jest.fn(),
    listen: jest.fn(),
    enable: jest.fn(),
  };
  const corsCb = jest.fn();
  const helmetCb = jest.fn();
  const compressionCb = jest.fn();
  const bodyParserJsonCb = jest.fn();
  const bodyParserUrlencodedCb = jest.fn();
  const cookieParserCb = jest.fn();
  const httpListen = jest.fn();
  const httpsListen = jest.fn();

  function setupMockModules(callback) {
    jest.isolateModules(() => {
      callback();
    });
  }

  beforeEach(() => {
    express.mockReturnValue(mockExpress);
    cors.mockReturnValue(corsCb);
    helmet.mockReturnValue(helmetCb);
    compression.mockReturnValue(compressionCb);
    bodyParser.json.mockReturnValue(bodyParserJsonCb);
    bodyParser.urlencoded.mockReturnValue(bodyParserUrlencodedCb);
    cookieParser.mockReturnValue(cookieParserCb);
    http.createServer = jest.fn(() => ({ listen: httpListen }));
    https.createServer = jest.fn(() => ({ listen: httpsListen }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start http server', () => {
    // Arrange/Act
    setupMockModules(() => {
      require('./index');
    });

    // Assert
    expect(mockExpress.set).toHaveBeenCalledWith('json spaces', 2);

    expect(mockExpress.enable).toHaveBeenCalledWith('etag');
    expect(mockExpress.enable).toHaveBeenCalledWith('query parser');

    expect(mockExpress.use).toHaveBeenCalledTimes(12);
    expect(mockExpress.use).toHaveBeenCalledWith('/', undefined);
    expect(mockExpress.use).toHaveBeenCalledWith('/callback', undefined);
    expect(cors).toHaveBeenCalledWith();
    expect(mockExpress.use).toHaveBeenCalledWith(corsCb);
    expect(helmet).toHaveBeenCalledWith();
    expect(mockExpress.use).toHaveBeenCalledWith(helmetCb);
    expect(compression).toHaveBeenCalledWith();
    expect(mockExpress.use).toHaveBeenCalledWith(compressionCb);
    expect(bodyParser.json).toHaveBeenCalledWith();
    expect(mockExpress.use).toHaveBeenCalledWith(bodyParserJsonCb);
    expect(bodyParser.urlencoded).toHaveBeenCalledWith({ extended: false });
    expect(mockExpress.use).toHaveBeenCalledWith(bodyParserUrlencodedCb);
    expect(cookieParser).toHaveBeenCalledWith();
    expect(mockExpress.use).toHaveBeenCalledWith(cookieParserCb);
    expect(mockExpress.use).toHaveBeenCalledWith(httpContext.middleware);
    expect(mockExpress.use).toHaveBeenCalledWith(handleError);
    expect(mockExpress.use).toHaveBeenCalledWith(notFound);

    expect(http.createServer).toHaveBeenCalled();
    expect(httpListen).toHaveBeenCalledWith(3000, expect.any(Function));
  });

  it('should start https server', () => {
    // Arrange/Act
    setupMockModules(() => {
      const prod = require('../config/env/prod').default;
      env.server = prod.server;
      require('./index');
    });

    // Assert
    expect(mockExpress.use).toHaveBeenCalledTimes(13);
    expect(mockExpress.use).toHaveBeenCalledWith(redirectInsecure);
    expect(https.createServer).toHaveBeenCalled();
    expect(httpsListen).toHaveBeenCalledWith(443, expect.any(Function));
    expect(http.createServer).toHaveBeenCalled();
    expect(httpListen).toHaveBeenCalledWith(80, expect.any(Function));
  });
});
