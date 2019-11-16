import fs from 'fs';
import path from 'path';
import express from 'express';
import http from 'http';
import https from 'https';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';

import redirectInsecure from './middleware/redirect-insecure';
import displayMessage from './middleware/display-message';
import handleError from './middleware/handle-error';
import notFound from './middleware/not-found';

import routes from './routes';
import generate from './routes/generate';

import env from '../config';

const publicDir = path.resolve(env.root, './dist/public');

const app = express();

app.set('json spaces', 2);
app.enable('etag');
app.enable('query parser');

if (env.server.https) {
  app.use(redirectInsecure);
}

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(httpContext.middleware);

app.use('/', express.static(publicDir));
app.use('/callback', express.static(publicDir));
app.use('/api', generate(routes));

app.use(handleError);
app.use(notFound);

if (env.server.https) {
  // Assume that the ports are available on real server.
  const privateKey = fs.readFileSync(env.server.key, 'utf8');
  const certificate = fs.readFileSync(env.server.cert, 'utf8');
  const ca = fs.readFileSync(env.server.ca, 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca,
  };

  const server = https.createServer(credentials, app);
  server.listen(443, displayMessage('Secure server is running'));

  const httpServer = http.createServer(app);
  httpServer.listen(80, displayMessage('Insecure server is being redirected'));
} else {
  // On dev server the ports are locked to root, so use high port
  const httpServer = http.createServer(app);
  httpServer.listen(3000, displayMessage('Server is running'));
}
