// @flow

import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';

import env from '@config';

import redirectInsecure from '../../common/server/middleware/redirect-insecure';
import handleError from '../../common/server/middleware/handle-error';
import notFound from '../../common/server/middleware/not-found';
import renderReact from './rendering/render-react';
import startHttpServer from '../../common/server/middleware/start-http';
import startHttpsServer from '../../common/server/middleware/start-https';

const publicDir = path.resolve(env.root);

const app = express<Request, Response>();

app.set('json spaces', 2);
app.enable('etag');
app.enable('query parser');

if (env.server.startHttp) {
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
app.get('/*', renderReact);

app.use(handleError);
app.use(notFound);

startHttpsServer(app, env.server.port);

if (env.server.startHttp) {
  startHttpServer(app, 80);
}

export default app;
