import { matchPath } from 'react-router-dom';

import routes from '../routes';
import { COOKIE_JWT_PAYLOAD } from '../../util/auth0/constants';
import fetchInitialData from './fetch-initial-data';

const populateContext = (req) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};
  const data = fetchInitialData(activeRoute.fetchData ? activeRoute.fetchData : {});
  const jwt = req.cookies[COOKIE_JWT_PAYLOAD] ? JSON.parse(req.cookies[COOKIE_JWT_PAYLOAD]) : {};

  return {
    jwt: {
      expiresAt: jwt.exp * 1000,
      data: jwt.data,
      user: jwt.user,
    },
    data,
  };
};

export default populateContext;
