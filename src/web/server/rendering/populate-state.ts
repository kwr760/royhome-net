import { matchPath } from 'react-router-dom';

import { COOKIE_JWT_PAYLOAD } from '../../util/auth0/auth0.constants';
import { fetchRoutes } from './fetch-routes';
import { DarkModes } from '../../client/store/session/session.constants';

export interface ServerState {
  session: {
    authenticated: boolean;
    expiration: number;
    isLoading: boolean;
    darkMode: string;
  };
  user: unknown;
  resume?: {
    email: string;
    [email: string]: unknown;
  };
}
const populateState = async (path: string, cookies: unknown): Promise<ServerState> => {
  const activeRoute = fetchRoutes.find((route) => matchPath(path, route));
  const data = (activeRoute && activeRoute.fetchData) ? await activeRoute.fetchData() : {};
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
