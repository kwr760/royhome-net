import path from 'path';
import express from 'express';

import allowCrossDomain from './middleware/allow-cross-domain';

import routes from './routes';
import generate from './routes/generate';

import env from '../config';

const publicDir = path.resolve(env.root, './dist/public');

const app = express();

app.use(allowCrossDomain);

app.use('/', express.static(publicDir));
app.use('/callback', express.static(publicDir));
app.use('/api', generate(routes));

app.listen(env.port);

console.log(`Server listening on ${env.port}`);
