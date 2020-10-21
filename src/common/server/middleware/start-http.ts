import { Application } from 'express';
import http from 'http';
import displayMessage from './display-message';

const startHttpServer = (app: Application, port: number): void => {
  const httpServer = http.createServer(app);
  httpServer.listen(port, () => displayMessage('Server is running'));
};

export default startHttpServer;
