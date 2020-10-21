import { Application } from 'express';
import http from 'http';
import startHttpServer from './start-http';

jest.mock('http');

describe('server/middleware/start-http', () => {
  it('should create http server and call listen', () => {
    // Arrange
    const app = {};
    const port = 3000;
    const mockServer = { listen: jest.fn((_, cb) => cb()) };
    (http.createServer as jest.Mock).mockImplementation(() => mockServer);

    // Act
    startHttpServer(app as Application, port);

    // Assert
    expect(mockServer.listen).toHaveBeenCalledWith(port, expect.any(Function));
  });
});
