import express, { Router, Request, Response } from 'express';

import checkJwt from '../../../common/server/middleware/check-jwt';
import checkRole from '../../../common/server/middleware/check-role';
import Logger from '../../../common/server/logger';
import routeHandler from '../handler/route-handler';
import { RouteType } from '../../types/routes.types';

const generate = (routes: RouteType[]): Router => {
  const router = express.Router();
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
        (req: Request, res:  Response) => routeHandler(route, req, res),
      );
      break;
    case 'put':
      Logger.log(`PUT: ${JSON.stringify(route)}`);
      router.put(
        path,
        middleware,
        (req: Request, res: Response) => routeHandler(route, req, res),
      );
      break;
    case 'post':
      Logger.log(`POST: ${JSON.stringify(route)}`);
      router.post(
        path,
        middleware,
        (req: Request, res: Response) => routeHandler(route, req, res),
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
