import path from 'path';
import express from 'express';
import jwt from 'express-jwt';
import jwtRsa from 'jwks-rsa';

import env from '../config';

const checkJwt = jwt({
  secret: jwtRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${
      env.auth0.domain
    }/.well-known/jwks.json`,
  }),

  audience: env.auth0.audience,
  issuer: `https://${env.auth0.domain}/`,
  algorithms: ['RS256'],
});

const app = express();

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
};
app.use(allowCrossDomain);

const publicDir = path.resolve(env.root, './dist/public');
app.use('/', express.static(publicDir));

app.get('/api/public', (req, res) => {
  res.json({
    message: 'Hello from a public API!',
  });
});

app.get('/api/resume', (req, res) => {
  res.json({
    message: 'Return to my resume!',
  });
});

app.get('/api/private', checkJwt, (req, res) => {
  res.json({
    message: 'Hello from a private API!',
  });
});

app.use('/callback', express.static(publicDir));

app.get('/*', (req, res) => {
  console.log('Running the catch all');
  const indexFile = path.resolve(publicDir, './index.html');
  res.sendFile(indexFile, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200);
  });
});

function checkRole(role) {
  return (req, res, next) => {
    const userData = req.user['http://royhome.net'];

    const grantedRoles = (userData.role || '').split(' ');
    if (userData.role === 'owner') {
      grantedRoles.push('friend', 'engineer', 'family', 'company');
    }
    if (grantedRoles.includes(role)) {
      return next();
    }

    return res.status(401).send('Insufficient role');
  };
}

app.get('/courses', checkJwt, checkRole('engineer'), (req, res) => {
  res.json({
    courses: [
      { id: 1, title: 'Building Apps with React and Redux' },
      { id: 2, title: 'Creating Reusable React Components' },
    ],
  });
});

app.get('/admin', checkJwt, checkRole('admin'), (req, res) => {
  res.json({
    message: 'Hello to an admin!',
  });
});

app.listen(env.port);
console.log(`Server listening on ${env.port}`);
