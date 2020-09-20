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
    const port = 443;
    fs.readFileSync
      .mockReturnValueOnce('key')
      .mockReturnValueOnce('cert')
      .mockReturnValueOnce('ca');
    const expectedCred = {
      key: 'key',
      cert: 'cert',
      ca: 'ca',
    };
    const mockServer = { listen: jest.fn() };
    spdy.createServer.mockImplementation(() => mockServer);
    const mockDisplay = jest.fn();
    displayMessage.mockImplementation(() => mockDisplay);

    // Act
    startHttpsServer(app, port);

    // Assert
    expect(spdy.createServer).toHaveBeenCalledWith(expectedCred, app);
    expect(mockServer.listen).toHaveBeenCalledWith(port, mockDisplay);
  });
});
