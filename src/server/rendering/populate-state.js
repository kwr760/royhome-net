// @flow

import { matchPath } from 'react-router-dom';
import { COOKIE_JWT_PAYLOAD } from '../../util/auth0/auth0.constants';
import { fetchRoutes } from './fetch-routes';

const populateState = async (req: Request): any => {
  const activeRoute = fetchRoutes.find((route) => matchPath(req.url, route)) || {};
  const data = activeRoute.fetchData ? await activeRoute.fetchData() : {};
  const jwt = req.cookies[COOKIE_JWT_PAYLOAD] ? JSON.parse(req.cookies[COOKIE_JWT_PAYLOAD]) : {};
  const { exp = 0, user = {} } = jwt;
  const expiresAt = exp * 1000;
  const session = {
    authenticated: (expiresAt > 0),
    expiration: -1,
    isLoading: false,
  };

  return {
    session,
    user,
    ...data,
  };
};

export default populateState;
