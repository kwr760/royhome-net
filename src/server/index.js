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
      process.env.AUTH0_DOMAIN
    }/.well-known/jwks.json`,
  }),

  audience: env.auth0.audience,
  issuer: `https://${env.auth0.domain}/`,
  algorithms: ['RS256'],
});

const app = express();

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};
app.use(allowCrossDomain);

const publicDir = path.resolve(env.root, './dist/public');
console.log(publicDir);
app.use('/', express.static(publicDir));

app.get('/public', (req, res) => {
  res.json({
    message: 'Hello from a public API!',
  });
});

app.get('/resume', (req, res) => {
  res.json({
    message: 'Return to my resume!',
  });
});

app.get('/private', checkJwt, (req, res) => {
  res.json({
    message: 'Hello from a private API!',
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
