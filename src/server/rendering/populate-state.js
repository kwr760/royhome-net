// @flow

import { matchPath } from 'react-router-dom';

import { COOKIE_JWT_PAYLOAD } from '@src/util/auth0/auth0.constants';
import { fetchRoutes } from './fetch-routes';

const populateState = async (url: string, cookies: Object): any => {
  const activeRoute = fetchRoutes.find((route) => matchPath(url, route)) || {};
  const data = activeRoute.fetchData ? await activeRoute.fetchData() : {};
  const jwt = cookies[COOKIE_JWT_PAYLOAD] ? JSON.parse(cookies[COOKIE_JWT_PAYLOAD]) : {};
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
