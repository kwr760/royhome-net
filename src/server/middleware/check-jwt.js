import jwt from 'express-jwt';
import jwtRsa from 'jwks-rsa';

import env from '../../config';

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

export default checkJwt;
