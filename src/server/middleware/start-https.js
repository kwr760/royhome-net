import fs from 'fs';
import https from 'https';
import displayMessage from './display-message';
import env from '../../config';

const startHttpsServer = (app, port) => {
  const privateKey = fs.readFileSync(env.server.key, 'utf8');
  const certificate = fs.readFileSync(env.server.cert, 'utf8');
  const ca = fs.readFileSync(env.server.ca, 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca,
  };

  const server = https.createServer(credentials, app);
  server.listen(port, displayMessage('Secure server is running'));
};

export default startHttpsServer;
