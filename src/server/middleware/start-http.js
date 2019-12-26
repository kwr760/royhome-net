import http from 'http';
import displayMessage from './display-message';

const startHttpServer = (app, port) => {
  const httpServer = http.createServer(app);
  httpServer.listen(port, displayMessage('Server is running'));
};

export default startHttpServer;
