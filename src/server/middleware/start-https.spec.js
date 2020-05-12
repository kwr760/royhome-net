import fs from 'fs';
import https from 'https';
import startHttpsServer from './start-https';
import displayMessage from './display-message';

jest.mock('fs');
jest.mock('https');
jest.mock('./display-message');

describe('server/middleware/start-https', () => {
  xit('should create http server and call listen', () => {
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
    https.createServer.mockImplementation(() => mockServer);
    const mockDisplay = jest.fn();
    displayMessage.mockImplementation(() => mockDisplay);

    // Act
    startHttpsServer(app, port);

    // Assert
    expect(https.createServer).toHaveBeenCalledWith(expectedCred, app);
    expect(mockServer.listen).toHaveBeenCalledWith(port, mockDisplay);
  });
});
