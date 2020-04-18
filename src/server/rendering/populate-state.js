// @flow

import { matchPath } from 'react-router-dom';
import type { StateType } from '../../client/store/types';
import { COOKIE_JWT_PAYLOAD } from '../../util/auth0/constants';
import routes from '../routes';
import fetchInitialData from './fetch-initial-data';

const populateState = (req: Request): StateType => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};
  // eslint-disable-next-line no-unused-vars
  const data = fetchInitialData(activeRoute.fetchData ? activeRoute.fetchData : {});
  const jwt = req.cookies[COOKIE_JWT_PAYLOAD] ? JSON.parse(req.cookies[COOKIE_JWT_PAYLOAD]) : {};
  const { exp = 0, user = {} } = jwt;
  const expiresAt = exp * 1000;

  return {
    session: {
      authenticated: (expiresAt > 0),
      expiration: -1,
      isLoading: false,
    },
    user,
  };
};

export default populateState;
