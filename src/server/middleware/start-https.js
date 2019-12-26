import fs from 'fs';
import https from 'https';
import displayMessage from './display-message';
import env from '../../config';

<<<<<<< HEAD
const startHttpServer = (app, port) => {
=======
const startHttpsServer = (app, port) => {
>>>>>>> 73f56fd7a23017333e4111d7da0ba7827de3b4e9
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

<<<<<<< HEAD
export default startHttpServer;
=======
export default startHttpsServer;
>>>>>>> 73f56fd7a23017333e4111d7da0ba7827de3b4e9
