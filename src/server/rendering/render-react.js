import path from 'path';
import fs from 'fs';

import { ChunkExtractor } from '@loadable/server';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath } from 'react-router-dom';
import serialize from 'serialize-javascript';

import env from '../../config';
import routes from '../routes';
import { TOKEN_URL } from '../../util/auth0/constants';

function populateContext(req, res, context) {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};
  const data = activeRoute.fetchData ? activeRoute.fetchData : { };
  const jwt = req.cookies.jwtPayload ? JSON.parse(req.cookies.jwtPayload) : {};
  Object.assign(context, {
    jwt: {
      expiresAt: jwt.exp * 1000,
      data: jwt[TOKEN_URL],
    },
    data,
  });
}

const renderReact = (req, res, next) => {
  const nodeStats = path.resolve(env.root, './dist/node/loadable-stats.json');
  const webStats = path.resolve(env.root, './dist/web/loadable-stats.json');

  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: Main } = nodeExtractor.requireEntrypoint();
  const context = {};
  if (populateContext(req, res, context)) {
    next();
    return;
  }

  const webExtractor = new ChunkExtractor({ statsFile: webStats });
  const jsx = webExtractor.collectChunks(<Main url={req.url} context={context} />);

  const markup = renderToString(jsx);

  const indexFile = path.resolve('./src/client/index.html');
  const contents = fs.readFileSync(indexFile, 'utf8');

  const responseHtml = contents
    .replace('{markup}', markup)
    .replace('{linkTags}', webExtractor.getLinkTags())
    .replace('{styleTags}', webExtractor.getStyleTags())
    .replace('{scriptTags}', webExtractor.getScriptTags())
    .replace('{initialData}', serialize(context));
  res.send(responseHtml);
};

export default renderReact;
