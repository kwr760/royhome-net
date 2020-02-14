import { matchPath } from 'react-router-dom';

import routes from '../routes';
import { COOKIE_JWT_PAYLOAD } from '../../util/auth0/constants';

const fetch = (endpoints) => {
  const data = {};
  Object.keys(endpoints)
    .map((name) => {
      data[name] = endpoints[name]();
      return name;
    });
  return data;
};

const populateContext = (req) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};
  const data = fetch(activeRoute.fetchData ? activeRoute.fetchData : {});
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
