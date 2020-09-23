import http from 'http';
import startHttpServer from './start-http';
import displayMessage from './display-message';

jest.mock('http');
jest.mock('./display-message');

describe('server/middleware/start-http', () => {
  it('should create http server and call listen', () => {
    // Arrange
    const app = {};
    const port = 3000;
    const mockServer = { listen: jest.fn() };
    http.createServer.mockImplementation(() => mockServer);
    const mockDisplay = jest.fn();
    displayMessage.mockImplementation(() => mockDisplay);

    // Act
    startHttpServer(app, port);

    // Assert
    expect(mockServer.listen).toHaveBeenCalledWith(port, mockDisplay);
  });
});
