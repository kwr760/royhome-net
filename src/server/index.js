// @flow

import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';

import env from '@src/config';

import redirectInsecure from './middleware/redirect-insecure';
import handleError from './middleware/handle-error';
import notFound from './middleware/not-found';
import renderReact from './rendering/render-react';
import startHttpServer from './middleware/start-http';
import startHttpsServer from './middleware/start-https';

import generate from './routes/generate';
import routes from './routes';

const publicDir = path.resolve(env.root);

const app = express<Request, Response>();

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
app.use('/api', generate(routes));
app.get('/*', renderReact);

app.use(handleError);
app.use(notFound);

if (env.server.https) {
  startHttpsServer(app, 443);
  startHttpServer(app, 80);
} else {
  startHttpServer(app, 3000);
}

export default app;
