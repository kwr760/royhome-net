/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';

import handleError from '../../common/server/middleware/handle-error';
import notFound from '../../common/server/middleware/not-found';
import renderReact from './rendering/render-react';
import startHttpsServer from '../../common/server/middleware/start-https';

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
jest.mock('../../common/server/middleware/start-https');

describe('server/index', () => {
  const mockExpress = {
    get: jest.fn(),
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

  beforeEach(() => {
    (express as unknown as jest.Mock).mockReturnValue(mockExpress);
    cors.mockReturnValue(corsCb);
    (helmet as unknown as jest.Mock).mockReturnValue(helmetCb);
    (compression as unknown as jest.Mock).mockReturnValue(compressionCb);
    (bodyParser.json as jest.Mock).mockReturnValue(bodyParserJsonCb);
    (bodyParser.urlencoded as jest.Mock).mockReturnValue(bodyParserUrlencodedCb);
    (cookieParser as unknown as jest.Mock).mockReturnValue(cookieParserCb);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start setup a basic server', () => {
    jest.isolateModules(() => {
      // Arrange/Act
      require('./index');

      // Assert
      expect(mockExpress.set).toHaveBeenCalledWith('json spaces', 2);

      expect(mockExpress.enable).toHaveBeenCalledWith('etag');
      expect(mockExpress.enable).toHaveBeenCalledWith('query parser');

      expect(mockExpress.use).toHaveBeenCalledTimes(10);
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
      expect(mockExpress.use).toHaveBeenCalledWith('/', undefined);
      expect(mockExpress.use).toHaveBeenCalledWith(handleError);
      expect(mockExpress.use).toHaveBeenCalledWith(notFound);

      expect(mockExpress.get).toHaveBeenCalledTimes(1);
      expect(mockExpress.get).toHaveBeenCalledWith('/*', renderReact);
    });
  });

  it('should start dev server', () => {
    // Arrange
    jest.isolateModules(() => {
      const { default: env } = require('../../config');
      const { default: dev } = require('../../config/env/dev');
      env.mode = dev.mode;
      env.server = dev.server;

      // Act
      const { default: app } = require('./index');

      // Assert
      expect(startHttpsServer).toHaveBeenCalledWith(app, 3000);
    });
  });

  it('should start prod server', () => {
    // Arrange
    jest.isolateModules(() => {
      const { default: env } = require('../../config');
      const { default: prod } = require('../../config/env/prod');
      env.mode = prod.mode;
      env.server = prod.server;

      // Act
      const { default: app } = require('./index');

      // Assert
      expect(mockExpress.use).toHaveBeenCalledTimes(10);
      expect(startHttpsServer).toHaveBeenCalledWith(app, 3000);
    });
  });
});
