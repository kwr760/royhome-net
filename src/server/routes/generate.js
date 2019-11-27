import express from 'express';

import checkJwt from '../middleware/check-jwt';
import checkRole from '../middleware/check-role';
import Logger from '../logger';
import handleRoute from '../handler/handle-route';

const generate = (routes) => {
  const router = express.Router();
  let middleware;

  routes.forEach((route) => {
    const {
      method, path, authenticate, role,
    } = route;
    middleware = [];
    if (authenticate) {
      middleware.push(checkJwt);
    }
    if (role) {
      middleware.push(checkRole(role));
    }

    switch (method) {
      case 'get':
        Logger.log(`GET: ${JSON.stringify(route)}`);
        router.get(
          path,
          middleware,
          (req, res) => handleRoute(route, req, res),
        );
        break;
      case 'put':
        Logger.log(`PUT: ${JSON.stringify(route)}`);
        router.put(
          path,
          middleware,
          (req, res) => handleRoute(route, req, res),
        );
        break;
      case 'post':
        Logger.log(`POST: ${JSON.stringify(route)}`);
        router.post(
          path,
          middleware,
          (req, res) => handleRoute(route, req, res),
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
