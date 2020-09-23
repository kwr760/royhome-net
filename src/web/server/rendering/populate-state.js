// @flow

import { matchPath } from 'react-router-dom';

import { COOKIE_JWT_PAYLOAD } from '@web/util/auth0/auth0.constants';
import { fetchRoutes } from './fetch-routes';
import { DarkModes } from '../../client/store/session/session.constants';

const populateState = async (path: string, cookies: Object): any => {
  const activeRoute = fetchRoutes.find((route) => matchPath(path, route)) || {};
  const data = activeRoute.fetchData ? await activeRoute.fetchData() : {};
  const jwt = cookies[COOKIE_JWT_PAYLOAD] ? JSON.parse(cookies[COOKIE_JWT_PAYLOAD]) : {};
  const { exp = 0, user = {} } = jwt;
  const expiresAt = exp * 1000;
  const session = {
    authenticated: (expiresAt > 0),
    expiration: -1,
    isLoading: false,
    darkMode: DarkModes.CLEAR_MODE,
  };

  return {
    session,
    user,
    ...data,
  };
};

export default populateState;
