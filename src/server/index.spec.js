import express from 'express';

import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';

import handleError from './middleware/handle-error';
import notFound from './middleware/not-found';

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

describe('server/index', () => {
  const mockExpress = {
    set: jest.fn(),
    use: jest.fn(),
    listen: jest.fn(),
    enable: jest.fn(),
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
    const corsCb = jest.fn();
    cors.mockReturnValue(corsCb);
    const helmetCb = jest.fn();
    helmet.mockReturnValue(helmetCb);
    const compressionCb = jest.fn();
    compression.mockReturnValue(compressionCb);
    const bodyParserJsonCb = jest.fn();
    bodyParser.json.mockReturnValue(bodyParserJsonCb);
    const bodyParserUrlencodedCb = jest.fn();
    bodyParser.urlencoded.mockReturnValue(bodyParserUrlencodedCb);
    const cookieParserCb = jest.fn();
    cookieParser.mockReturnValue(cookieParserCb);

    // Act
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

    // expect(mockExpress.listen).toHaveBeenCalledTimes(1);
    // expect(mockExpress.listen).toHaveBeenCalledWith(3000);
  });
});
