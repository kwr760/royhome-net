import { matchPath } from 'react-router-dom';

import routes from '../routes';
import { COOKIE_JWT_PAYLOAD, TOKEN_URL } from '../../util/auth0/constants';

const populateContext = (req) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};
  const data = activeRoute.fetchData ? activeRoute.fetchData : {};
  const jwt = req.cookies[COOKIE_JWT_PAYLOAD] ? JSON.parse(req.cookies[COOKIE_JWT_PAYLOAD]) : {};

  return {
    jwt: {
      expiresAt: jwt.exp * 1000,
      data: jwt[TOKEN_URL],
    },
    data,
  };
};

export default populateContext;
