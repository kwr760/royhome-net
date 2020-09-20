// @flow

import http from 'http';
import displayMessage from './display-message';

const startHttpServer = (app: Object, port: number) => {
  const httpServer = http.createServer(app);
  httpServer.listen(port, displayMessage('Server is running'));
};

export default startHttpServer;
