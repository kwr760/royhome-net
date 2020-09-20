// @flow

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';

import env from '@config';

import handleError from '@common/server/middleware/handle-error';
import notFound from '@common/server/middleware/not-found';
import startHttpsServer from '@common/server/middleware/start-https';

import generate from './routes/generate';
import routes from './routes';

const app = express<Request, Response>();

app.set('json spaces', 2);
app.enable('etag');
app.enable('query parser');

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(httpContext.middleware);

app.use('/api', generate(routes));

app.use(handleError);
app.use(notFound);

startHttpsServer(app, env.server.apiPort);

export default app;
