import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';

import handleError from './middleware/handle-error';
import notFound from './middleware/not-found';

import routes from './routes';
import generate from './routes/generate';

import env from '../config';

const publicDir = path.resolve(env.root, './dist/public');

const app = express();

app.set('port', env.port);
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

app.use('/', express.static(publicDir));
app.use('/callback', express.static(publicDir));
app.use('/api', generate(routes));

app.use(handleError);
app.use(notFound);

app.listen(env.port);

console.log(`Server listening on ${env.port}`);
