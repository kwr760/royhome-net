import { Application } from 'express';
import fs from 'fs';
import spdy from 'spdy';
import startHttpsServer from './start-https';
import displayMessage from './display-message';

jest.mock('fs');
jest.mock('spdy');
jest.mock('./display-message');

describe('server/middleware/start-https', () => {
  it('should create http server and call listen', () => {
    // Arrange
    const app = {};
    const port = 3000;
    (fs.readFileSync as jest.Mock)
      .mockReturnValueOnce('key')
      .mockReturnValueOnce('cert')
      .mockReturnValueOnce('ca');
    const expectedCred = {
      key: 'key',
      cert: 'cert',
      ca: 'ca',
    };
    const mockServer = { listen: (_, cb) => { cb(); } };
    (spdy.createServer as jest.Mock).mockImplementation(() => mockServer);
    (displayMessage as jest.Mock).mockImplementation(() => jest.fn());

    // Act
    startHttpsServer(app as Application, port);

    // Assert
    expect(spdy.createServer).toHaveBeenCalledWith(expectedCred, app);
    expect(displayMessage).toHaveBeenCalled();
  });
});
