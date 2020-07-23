// @flow

import spdy from 'spdy';
import fs from 'fs';

import env from '@src/config';
import displayMessage from './display-message';

const startHttpsServer = (app: Object, port: number) => {
  const privateKey = fs.readFileSync(env.server.key, 'utf8');
  const certificate = fs.readFileSync(env.server.cert, 'utf8');
  const ca = fs.readFileSync(env.server.ca, 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca,
  };

  spdy.createServer(credentials, app).listen(port, displayMessage('Secure server is running'));
};

export default startHttpsServer;
