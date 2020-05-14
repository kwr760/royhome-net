// @flow

import express from 'express';

import checkJwt from '../middleware/check-jwt';
import checkRole from '../middleware/check-role';
import Logger from '../logger';
import routeHandler from '../handler/route-handler';
import type { RouteType } from './routes.types';

const generate = (routes: Array< RouteType >) => {
  const router: Object = express.Router< Request, Response>();
  let middleware;

  routes.forEach((route) => {
    const {
      method, path, authenticate = false, role = '',
    } = route;

    // Extract the construction of the middleware
    middleware = [];
    if (authenticate) {
      middleware.push(checkJwt);
    }
    if (role.length > 0) {
      middleware.push(checkRole(role));
    }

    // Extract each of the cases
    switch (method) {
    case 'get':
      Logger.log(`GET: ${JSON.stringify(route)}`);
      router.get(
        path,
        middleware,
        (req, res) => routeHandler(route, req, res),
      );
      break;
    case 'put':
      Logger.log(`PUT: ${JSON.stringify(route)}`);
      router.put(
        path,
        middleware,
        (req, res) => routeHandler(route, req, res),
      );
      break;
    case 'post':
      Logger.log(`POST: ${JSON.stringify(route)}`);
      router.post(
        path,
        middleware,
        (req, res) => routeHandler(route, req, res),
      );
      break;
    default:
      Logger.error(`Unknown route: ${JSON.stringify(route)}`);
      break;
    }
  });
  return router;
};

export default generate;
